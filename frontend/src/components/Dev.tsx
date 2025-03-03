import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Listen for CSV updates
    socket.on("csv_update", (newData) => {
      setData((prevData) => [...prevData, ...newData]);
    });

    // Request the backend to start streaming
    socket.emit("start_stream");

    return () => {
      socket.off("csv_update");
    };
  }, []);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Live CSV Data</h1>
      <pre className="bg-gray-800 p-4 rounded-lg">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
