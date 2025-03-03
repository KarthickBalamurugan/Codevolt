from fastapi import FastAPI, WebSocket
import asyncio
import uvicorn

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    counter = 0
    try:
        while True:
            counter += 1
            await websocket.send_json({"message": f"Update {counter}"})
            await asyncio.sleep(1)
    except Exception as e:
        print(f"WebSocket disconnected: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
