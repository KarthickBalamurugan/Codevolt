from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
import asyncio
import random
from datetime import datetime

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def generate_data():
    while True:
        # Generate some sample data
        data = {
            "timestamp": datetime.now().isoformat(),
            "value": random.randint(1, 100),
            "message": f"Random value: {random.randint(1, 100)}"
        }
        yield data
        await asyncio.sleep(1)  # Send data every second

@app.get("/stream")
async def stream():
    return EventSourceResponse(generate_data())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

