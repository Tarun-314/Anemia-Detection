import { useState, useEffect } from "react";
import Conjunctiva from "./Conjunctiva";
import FingerNail from "./FingerNail";
import Palm from "./Palm";
import "./predict.css";
import Result from "./Result";
const Predict = () => {
  const [Cj, setCj] = useState(false);
  const [Fn, setFn] = useState(false);
  const [Pm, setPm] = useState(false);
  const [Final, setFinal] = useState(false);
  const [Data, setData] = useState(null);

  const finalprediction = () => {
    fetch(" http://127.0.0.1:5000/final", {
      method: "POST",
      body: JSON.stringify({}),
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
  return (
    <div className="predict">
      {!Final && (
        <div className="prediction">
          <Conjunctiva setcj={setCj}></Conjunctiva>
          <FingerNail setfn={setFn}></FingerNail>
          <Palm setpm={setPm}></Palm>
          {Cj && Fn && Pm && (
            <div className="fbcont">
              <div className="popup-content">
                <h2>Final Anemic Prediction</h2>
                <p>
                  Aquired all the required data. Press below button for a final
                  prediction
                </p>
                <button className="fpred" onClick={finalprediction}>
                  Predict
                </button>
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
