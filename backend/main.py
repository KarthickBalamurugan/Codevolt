from flask import Flask
from flask_socketio import SocketIO
import pandas as pd
import time
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")

# CSV File Path
CSV_FILE_PATH = "data.csv"

# Features to Stream
selected_features = [
    'Ambient_C_Temp', 'Motor_Temp', 'Pack_Avg_C_Temp',
    'SOC', 'SOH', 'HV_Bat_Current_2', 'Instant_kW', 'kWh_Remaining',
    'Torque', 'Speed', 'Brake', 'Acc_Pedal', 'ECO', 'ePedal',
    'HV_Bat_Voltage'
]

def stream_csv():
    """Stream selected CSV columns row by row in a background thread"""
    df = pd.read_csv(CSV_FILE_PATH, chunksize=1)  # Read one row at a time

    for chunk in df:
        # Ensure all selected columns exist in the chunk
        available_columns = [col for col in selected_features if col in chunk.columns]

        if not available_columns:
            print("⚠️ Error: None of the selected columns are available in the CSV.")
            return

        data = chunk[available_columns].to_dict(orient="records")  # Convert row to dictionary
        socketio.emit("csv_update", data)  # Send data to frontend
        time.sleep(1)  # Simulate real-time streaming

@socketio.on("start_stream")
def handle_start_stream():
    """Start streaming when frontend requests (runs in a background thread)"""
    thread = threading.Thread(target=stream_csv)
    thread.daemon = True  # Ensures the thread closes when the main program stops
    thread.start()

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
