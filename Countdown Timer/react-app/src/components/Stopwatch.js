import React, { useEffect, useRef, useState } from "react";
import "./stpwatchStyle.css";

const STATUS = ["OFF", "RUNNING", "PAUSE"];

const TIMER_INITIAL_STATE = { hour: "00", min: "00", sec: "00" };

function Stopwatch() {
  const [time, setTime] = useState({ ...TIMER_INITIAL_STATE });
  const [status, setStatus] = useState(STATUS[0]);

  const timerRef = useRef(null);

  const handleInputChange = (e) => {
    setTime((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (status === STATUS[1]) {
      timerRef.current = setTimeout(() => {
        stratTimer();
      }, 1000);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [time, status]);

  const handleStart = () => {
    setStatus(STATUS[1]);
  };

  const handlePause = () => {
    clearTimeout(timerRef.current);
    setStatus(STATUS[2]);
  };

  const handleReset = () => {
    setStatus(STATUS[0]);
    setTime({ ...TIMER_INITIAL_STATE });
    clearTimeout(timerRef.current?.value);
  };

  const stratTimer = () => {
    if (parseInt(time.sec) > 60) {
      setTime((prev) => ({
        ...prev,
        min: parseInt(prev.min) + 1,
        sec: parseInt(prev.sec) - 60,
      }));
    }
    if (parseInt(time.min) > 60) {
      setTime((prev) => ({
        ...prev,
        hour: parseInt(prev.hour) + 1,
        min: parseInt(prev.min) - 60,
      }));
    }
    if (time.hour === "00" && time.min === "00" && time.sec === "00") {
      handleReset();
      return;
    }
    if (time.sec !== "00") {
      setTime((prev) => ({
        ...prev,
        sec: String(parseInt(prev.sec) - 1).padStart(2, "0"),
      }));
    } else if (time.min !== "00" && time.sec === "00") {
      setTime((prev) => ({
        ...prev,
        min: String(parseInt(prev.min) - 1).padStart(2, "0"),
        sec: "59",
      }));
    } else if (time.hour !== "00" && time.min === "00") {
      setTime((prev) => ({
        ...prev,
        hour: String(parseInt(prev.hour) - 1).padStart(2, "0"),
        min: "59",
      }));
    }
  };

  return (
    <div className="container">
      <span className="container__title">Countdown Timer</span>

      <div className="container__labels">
        <span className="container__labels--label">Hours</span>
        <span className="container__labels--label">Minutes</span>
        <span className="container__labels--label">Seconds</span>
      </div>

      <div className="container__inputs">
        <input
          type="text"
          name="hour"
          className="container__inputs--input hour"
          placeholder="00"
          maxLength={2}
          value={time.hour}
          onChange={handleInputChange}
        />
        <span className="container__inputs--colon">:</span>
        <input
          type="text"
          name="min"
          className="container__inputs--input min"
          placeholder="00"
          maxLength={2}
          value={time.min}
          onChange={handleInputChange}
        />
        <span className="container__inputs--colon">:</span>
        <input
          type="text"
          name="sec"
          className="container__inputs--input sec"
          placeholder="00"
          maxLength={2}
          value={time.sec}
          onChange={handleInputChange}
        />
      </div>

      <div className="container__buttons">
        {status !== STATUS[1] && (
          <button
            className="container__buttons--button start"
            onClick={handleStart}
          >
            START
          </button>
        )}
        {status === STATUS[1] && (
          <button
            className="container__buttons--button pause"
            onClick={handlePause}
          >
            PAUSE
          </button>
        )}
        <button
          className="container__buttons--button reset"
          onClick={handleReset}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
