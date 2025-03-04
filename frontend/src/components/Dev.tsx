/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';
import './Dev.css';

const Dev: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentData, setCurrentData] = useState<any>(null);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('csv_update', (newData) => {
      setData((prevData) => {
        const updatedData = [...prevData, ...newData].map(item => ({
          ...item,
          Instant_kW: Math.abs(item.Instant_kW) // Convert negative values to positive
        })).slice(-10);
        setCurrentData(updatedData[updatedData.length - 1]);
        return updatedData;
      });
    });

    socket.emit('start_stream');

    return () => {
      socket.disconnect();
    };
  }, []);

  const calculateEfficiency = () => {
    if (!currentData) return 0;
    return ((currentData.kWh_Remaining / 40) * 100).toFixed(1); // Assuming 40kWh battery
  };

  const getRange = () => {
    if (!currentData) return 0;
    return (currentData.kWh_Remaining * 4).toFixed(0); // Rough estimate: 4km per kWh
  };

  const getDrivingMode = () => {
    if (!currentData) return 'Normal';
    return currentData.ECO ? 'ECO' : 'Normal';
  };

  const getPedalStatus = () => {
    if (!currentData) return { brake: 0, accelerator: 0 };
    return {
      brake: currentData.Brake,
      accelerator: currentData.Acc_Pedal
    };
  };

  return (
    <div className="dashboard">
      <div className="bento-grid">
        <div className="grid-item header">
          <h1>EV Performance Dashboard</h1>
          <p className="subtitle">Real-time monitoring and analytics</p>
        </div>

        <div className="grid-item primary-stats">
          <div className="stat-container">
            <h3>Battery Status</h3>
            <div className="big-number">{currentData?.SOC?.toFixed(1)}%</div>
            <p>Current Charge</p>
          </div>
          <div className="stat-container">
            <h3>Est. Range</h3>
            <div className="big-number">{getRange()}</div>
            <p>kilometers</p>
          </div>
        </div>

        <div className="grid-item power-chart">
          <h3>Power Consumption</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="index" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333' }} />
              <Area type="monotone" dataKey="Instant_kW" stroke="#8884d8" fill="url(#powerGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid-item voltage-current">
          <h3>Battery Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="index" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333' }} />
              <Line type="monotone" dataKey="Voltage" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Current" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid-item temp-metrics">
          <h3>Temperature Metrics</h3>
          <div className="temp-grid">
            <div className="temp-item">
              <span>Motor</span>
              <div className="temp-value">{currentData?.Motor_Temp}°C</div>
            </div>
            <div className="temp-item">
              <span>Battery</span>
              <div className="temp-value">{currentData?.Pack_Avg_C_Temp}°C</div>
            </div>
            <div className="temp-item">
              <span>Ambient</span>
              <div className="temp-value">{currentData?.Ambient_C_Temp}°C</div>
            </div>
          </div>
        </div>

        <div className="grid-item efficiency">
          <h3>System Efficiency</h3>
          <div className="big-number">{calculateEfficiency()}%</div>
          <p>Overall System Efficiency</p>
        </div>

        <div className="grid-item speed-torque">
          <h3>Performance</h3>
          <div className="performance-metrics">
            <div className="metric">
              <span>Speed</span>
              <div className="value">{currentData?.Speed} km/h</div>
            </div>
            <div className="metric">
              <span>Torque</span>
              <div className="value">{currentData?.Torque} Nm</div>
            </div>
          </div>
        </div>

        <div className="grid-item driving-mode">
          <h3>Driving Mode</h3>
          <div className="big-number">{getDrivingMode()}</div>
          <p>Current Mode</p>
        </div>

        <div className="grid-item pedal-status">
          <h3>Pedal Status</h3>
          <div className="pedal-metrics">
            <div className="metric">
              <span>Brake</span>
              <div className="value">{getPedalStatus().brake}%</div>
            </div>
            <div className="metric">
              <span>Accelerator</span>
              <div className="value">{getPedalStatus().accelerator}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dev;