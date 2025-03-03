from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import pandas as pd
import joblib
import time
import threading
import numpy as np
import requests
from dotenv import load_dotenv 
import os

load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")

# Load the trained model
model = joblib.load("xgboost_voltage_predictor.pkl")

# Weather API Config
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"

# CSV File Path
CSV_FILE_PATH = "data.csv"

# Features used for prediction
selected_features = [
    "Ambient_C_Temp", "Motor_Temp", "Pack_Avg_C_Temp",
    "SOC", "SOH", "HV_Bat_Current_2", "Instant_kW", "kWh_Remaining",
    "Torque", "Speed", "Brake", "Acc_Pedal", "ECO", "ePedal"
]

# Variable to store the latest streamed data
latest_data = None


# **Fetch Real-Time Temperature from City Name**
def get_real_time_temperature(city_name):
    """Fetch real-time ambient temperature based on city name"""
    try:
        params = {"q": city_name, "appid": WEATHER_API_KEY, "units": "metric"}
        response = requests.get(WEATHER_API_URL, params=params)
        data = response.json()

        if "main" in data and "temp" in data["main"]:
            return data["main"]["temp"]
        else:
            return None
    except Exception as e:
        print(f" Error fetching weather data: {e}")
        return None


# **CSV Streaming Function**
def stream_csv():
    """Stream selected CSV columns row by row in a background thread"""
    global latest_data
    df = pd.read_csv(CSV_FILE_PATH, chunksize=1)  # Read one row at a time

    for chunk in df:
        # Ensure selected columns exist in the chunk
        available_columns = [col for col in selected_features if col in chunk.columns]

        if not available_columns:
            print(" Error: None of the selected columns are available in the CSV.")
            return

        latest_data = chunk[available_columns].iloc[0].to_dict()  # Store latest row
        socketio.emit("csv_update", [latest_data])  # Send data to frontend
        time.sleep(1)  # Simulate real-time streaming


# **Voltage Prediction API**
@app.route("/predict_voltage", methods=["POST"])
def predict_voltage():
    """Predict voltage using real-time weather data and latest streamed CSV data"""
    global latest_data

    if latest_data is None:
        return jsonify({"error": "No real-time data available yet. Please wait for streaming to start."}), 500

    try:
        request_data = request.json

        # Ensure location name is provided
        if "location" not in request_data:
            return jsonify({"error": "Missing location name"}), 400
        
        location_name = request_data["location"]
        ambient_temp = get_real_time_temperature(location_name)

        if ambient_temp is None:
            return jsonify({"error": "Could not fetch real-time temperature"}), 500

        # Use latest streamed data, replacing ambient temperature
        feature_values = np.array([[ambient_temp] + [latest_data[feature] for feature in selected_features if feature != "Ambient_C_Temp"]])

        # Predict voltage
        predicted_voltage = model.predict(feature_values)[0]
        predicted_voltage = float(predicted_voltage)  # Convert NumPy float32 to Python float

        print(f"Predicted Voltage: {predicted_voltage}V")
        print(f"Actual Data Used: {latest_data}")

        return jsonify({
            "predicted_voltage": predicted_voltage,
            "ambient_temperature": ambient_temp,
            "used_data": latest_data
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Start streaming automatically in a background thread
    thread = threading.Thread(target=stream_csv)
    thread.daemon = True  # Ensures the thread stops when the main program exits
    thread.start()

    # Run the Flask-SocketIO app
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
