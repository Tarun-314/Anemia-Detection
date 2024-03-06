import React, { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getUserEmail } from "../auth/UserEmail";
import { MdDelete } from "react-icons/md";
import "./history.css";
const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [load, setLoad] = useState(true);

  const fetchHistoryData = useCallback(async () => {
    const email = getUserEmail();
    const historyRef = collection(db, email);
    const querySnapshot = await getDocs(historyRef);
    const data = [];
    querySnapshot.forEach((doc) => {
      var datadoc = doc.data();
      console.log(doc.data());
      const convertValue = (value) => {
        if (value === "0") return "Non-Anemic";
        else if (value === "1") return "Anemic";
        else {
          const floatValue = parseFloat(value);
          return floatValue > 0.5 ? "Non-Anemic" : "Anemic";
        }
      };

      [
        "cjcnn",
        "cjknn",
        "cjrf",
        "fncnn",
        "fnknn",
        "fnrf",
        "pmcnn",
        "pmknn",
        "pmrf",
      ].forEach((property) => {
        datadoc[property] = convertValue(datadoc[property]);
      });
      const floatValue = parseFloat(datadoc["yes"]);
      const am = "Anemic - " + datadoc["yes"];
      const nam = "Non-Anemic - " + datadoc["no"];
      datadoc["yes"] = floatValue < 50 ? nam : am;
      data.push({ ...datadoc });
    });
    data.sort((a, b) => b.time.toDate() - a.time.toDate());
    return data;
  }, []);

  const loadHistory = useCallback(async () => {
    const data = await fetchHistoryData();
    setHistoryData(data);
    setLoad(false);
  }, [fetchHistoryData]);
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const deleteHistoryEntry = async (timestamp) => {
    const email = getUserEmail();
    await deleteDoc(doc(db, email, timestamp));
    setLoad(true);
    setHistoryData([]);
    loadHistory();
  };

  return (
    <div className="history-container">
      {load && (
        <h2 key="load" style={{ zIndex: "2" }}>
          Loading History...
        </h2>
      )}
      {historyData.map((entry) => (
        <div
          key={entry.DocId}
          className="history-box"
          style={{
            boxShadow:
              entry.no > 50
                ? "0px 29px 52px 0px rgba(126,211,33,1),0px 25px 16px 0px rgba(184,233,134,1)"
                : "0px 29px 52px 0px rgba(208,2,27,1),0px 25px 16px 0px rgba(208,2,27,1)",
          }}
        >
          <div className="header">
            <h3>{entry.yes}</h3>
          </div>
          <span className="timestamp">
            {new Date(entry.time.toDate()).toLocaleString()}
          </span>
          <div className="card-content">
            <div className="column">
              <h2 style={{ marginBottom: "13px", marginTop: "17px" }}>Image</h2>
              <h2>CNN</h2>
              <h2>KNN</h2>
              <h2>RF</h2>
            </div>
            <div className="column">
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    right: "-30px",
                    fontWeight: "bold",
                    top: "-10px",
                  }}
                >
                  Conjunctiva
                </div>
                <img src={entry.cjimg} alt="Conjunctiva" />
              </div>
              <div className="cell">{entry.cjcnn}</div>
              <div className="cell">{entry.cjknn}</div>
              <div className="cell">{entry.cjrf}</div>
            </div>
            <div className="column">
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    fontWeight: "bold",
                    top: "-10px",
                  }}
                >
                  FingerNail
                </div>
                <img src={entry.fnimg} alt="FingerNail" />
              </div>
              <div className="cell">{entry.fncnn}</div>
              <div className="cell">{entry.fnknn}</div>
              <div className="cell">{entry.fnrf}</div>
            </div>
            <div className="column">
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    right: "0px",
                    fontWeight: "bold",
                    top: "-10px",
                  }}
                >
                  Palm
                </div>
                <img src={entry.pmimg} alt="Palm" />
              </div>
              <div className="cell">{entry.pmcnn}</div>
              <div className="cell">{entry.pmknn}</div>
              <div className="cell">{entry.pmrf}</div>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteHistoryEntry(entry.DocId)}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
