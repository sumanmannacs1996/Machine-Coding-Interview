import { useState } from "react";
import "./App.css";

const TENURE_OPTIONS = [12, 24, 36, 48, 60];

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(TENURE_OPTIONS[0]);
  const [emi, setEmi] = useState(0);

  const updateEMI = (e) => {
    if (!cost) return;
    const em = Number(e.target.value);
    setEmi(em.toFixed(0));
  };
  const updateDownPayment = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
  };
  const calculateEMI = () => {};

  return (
    <div className="App">
      <span className="title" style={{ fontSize: "30px" }}>
        EMI Calculator
      </span>

      <span className="title">Total Cost Of The Asset</span>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(parseInt(e.target.value))}
        placeholder="Total Cost Of The Asset"
      />

      <span className="title">Interest Rate (in %)</span>
      <input
        type="number"
        value={interest}
        onChange={(e) => setInterest(parseInt(e.target.value))}
        placeholder="Interest Rate (in%)"
      />

      <span className="title">Processing Fee (in %)</span>
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(parseInt(e.target.value))}
        placeholder="Processing Fee (in %)"
      />

      <span className="title">Down Payment</span>
      <div>
        <input
          type="range"
          min={0}
          max={cost}
          value={downPayment}
          onChange={updateDownPayment}
          className="slider"
        />
        <div className="labels">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>

      <span className="title">Loan per Month</span>
      <div>
        <input
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          value={emi}
          onChange={updateEMI}
          className="slider"
        />
        <div className="labels">
          <label>{calculateEMI(emi)}</label>
          <b>{emi}</b>
          <label>{calculateEMI(0)}</label>
        </div>
      </div>

      <span className="title">Tenure</span>
      <div className="tenure-container">
        {TENURE_OPTIONS.map((t) => (
          <button
            key={t}
            className={`tenure ${t === tenure ? "selected-tenure" : ""}`}
            onClick={() => setTenure(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
