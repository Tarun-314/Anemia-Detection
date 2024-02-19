import React, { useRef, useState } from "react";
import Conjunctiva from "./Conjunctiva";
import FingerNail from "./FingerNail";
import Palm from "./Palm";
import "./predict.css";
import Result from "./Result";
const Predict = () => {
  const fbcontRef = useRef(null); // Create a ref

  const [Cj, setCj] = useState(false);
  const [Fn, setFn] = useState(false);
  const [Pm, setPm] = useState(false);
  const [Final, setFinal] = useState(false);
  const [Data, setData] = useState(null);
  const [Features, setFeatures] = useState(Array(9).fill("0"));
  const finalprediction = () => {
    document.removeEventListener("mouseup", handleMouseUp);
    fetch(" http://127.0.0.1:5000/final", {
      method: "POST",
      body: JSON.stringify({ features: Features }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from server
        setData(data);
        setFinal(true);
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };
  const newprediction = () => {
    setFinal(false);
    setCj(false);
    setFn(false);
    setPm(false);
  };
  // Event handler for mouse down (click and hold)
  const handleMouseDown = () => {
    if (fbcontRef.current) {
      fbcontRef.current.style.display = "none"; // Hide .fbcont
    }
  };
  const handleMouseUp = () => {
    if (fbcontRef.current) {
      fbcontRef.current.style.display = "flex"; // Show .fbcont
    }
  };
  document.addEventListener("mouseup", handleMouseUp);

  return (
    <div className="predict">
      {!Final && (
        <div className="prediction">
          <Conjunctiva setcj={setCj} setf={setFeatures}></Conjunctiva>
          <FingerNail setfn={setFn} setf={setFeatures}></FingerNail>
          <Palm setpm={setPm} setf={setFeatures}></Palm>
          {Cj && Fn && Pm && (
            <div className="fbcont" ref={fbcontRef}>
              <div
                style={{
                  position: "absolute",
                  height: "40%",
                  width: "50%",
                  top: "0",
                  right: "0",
                }}
                onMouseDown={handleMouseDown}
              >
                {" "}
              </div>
              <div className="popup-content">
                <h2>Final Anemic Prediction</h2>
                <p>
                  Aquired all the required data. Press below button for a final
                  prediction
                </p>
                <button className="fpred" onClick={finalprediction}>
                  Predict
                </button>
                <p style={{ marginTop: "30px", marginBottom: "0" }}>
                  <span style={{ color: "red" }}>Note:</span>Click and Hold on
                  top right area to view previous predictions
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {Final && (
        <div className="result">
          <Result data={Data}></Result>
          <button className="npred" onClick={newprediction}>
            New Prediction
          </button>
        </div>
      )}
    </div>
  );
};

export default Predict;
