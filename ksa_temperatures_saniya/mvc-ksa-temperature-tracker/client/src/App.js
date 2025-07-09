import React, {useEffect, useState} from 'react';
import axios from "axios";

function App() {
  const [temps, setTemps] = useState([]);
  const [form, setForm] = useState({
    region: '',
    date: '',
    value:''
  });

  // Load data (GET)
  useEffect(() => {
    fetchData();
}, []);

const fetchData = () => {
  axios.get('http://localhost:5000/api/temperatures')
  .then(res => setTemps(res.data))
  .catch(err => console.log(err));
};

// Submit form (POST)
const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:5000/api/temperatures', form)
    .then(() => {
    setForm({ region: '', date: '', value:'' }); // reset form
    fetchData(); // reload data
   })
    .catch(err => console.log(err));
};

  return (
    <div style={{ padding: '20px' }}>
    <h1>Temperatures Across KSA</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Region"
        value={form.region}
        onChange={(e) => setForm({ ...form, region: e.target.value })}
        required
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Temperature (°C)"
        value={form.value}
        onChange={(e) => setForm({ ...form, value: e.target.value })}
        required
      />
      <button type="submit">Submit</button>
    </form>
    
    <ul style={{ marginTop: '20px' }}>
      {temps.map((t, index) => (
        <li key={index}>
        | {t.region} - {t.date} - {t.value}°C
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;