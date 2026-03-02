import React, { useState } from 'react';
import axios from 'axios';
import { Sprout, Droplets, Thermometer, FlaskConical, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './App.css';

const sensorData = [
  { time: '01:00', moisture: 30 }, { time: '04:00', moisture: 35 },
  { time: '08:00', moisture: 50 }, { time: '12:00', moisture: 45 },
  { time: '16:00', moisture: 60 }, { time: '20:00', moisture: 55 },
];

function App() {
  const [inputs, setInputs] = useState({ n: '', p: '', k: '', ph: '' });
  const [result, setResult] = useState('');

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', inputs);
      setResult(response.data.recommended_crop);
    } catch (error) {
      alert("Error: Make sure the Python Backend is running on port 5000!");
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo"><Sprout size={32} /> <span>AgriSmart AI</span></div>
        <nav>
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Soil Analysis</div>
          <div className="nav-item">Weather</div>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Field Monitoring Dashboard</h1>
          <div className="status"><span className="dot"></span> Live Sensors</div>
        </header>

        <section className="stats-grid">
          <div className="card"><Thermometer color="#ff4d4d" /> <h3>24°C</h3><p>Temperature</p></div>
          <div className="card"><Droplets color="#3399ff" /> <h3>62%</h3><p>Humidity</p></div>
          <div className="card"><FlaskConical color="#9933ff" /> <h3>6.8</h3><p>Soil pH</p></div>
        </section>

        <div className="dashboard-grid">
          <div className="ai-section">
            <h2><BarChart3 /> AI Crop Recommendation</h2>
            <div className="form">
              <input type="number" placeholder="Nitrogen (N)" onChange={(e) => setInputs({...inputs, n: e.target.value})} />
              <input type="number" placeholder="Phosphorus (P)" onChange={(e) => setInputs({...inputs, p: e.target.value})} />
              <input type="number" placeholder="Potassium (K)" onChange={(e) => setInputs({...inputs, k: e.target.value})} />
              <input type="number" placeholder="pH Level" onChange={(e) => setInputs({...inputs, ph: e.target.value})} />
              <button onClick={handlePredict}>Ask AI Best Crop</button>
            </div>
            {result && <div className="result-box">Recommended Crop: <strong>{result}</strong></div>}
          </div>

          <div className="chart-section">
            <h2>Soil Moisture Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="moisture" stroke="#2ecc71" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;