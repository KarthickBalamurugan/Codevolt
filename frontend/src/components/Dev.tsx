import React, { useEffect, useState } from 'react'

interface StreamData {
  timestamp: string;
  value: number;
  message: string;
}

const Dev = () => {
  const [data, setData] = useState<StreamData | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/stream');

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Streaming Data</h1>
      {data ? (
        <div className="space-y-2">
          <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
          <p>Value: {data.value}</p>
          <p>Message: {data.message}</p>
        </div>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  )
}

export default Dev
