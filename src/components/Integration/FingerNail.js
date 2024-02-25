import React, { useState, useRef, useEffect, useCallback } from "react"; // Importing React and its hooks
import "./styles.css"; // Importing CSS file for styling
import { RiAddCircleLine } from "react-icons/ri"; // Importing icon component
import { FaUndo, FaCheck, FaTimes } from "react-icons/fa"; // Importing icon components

const FingerNail = ({ setfn, setf, setimg }) => {
  const [image, setImage] = useState(null); // State variable for the selected image
  const [polygon, setPolygon] = useState([]); // State variable for the drawn polygon points
  const [croppedImage, setCroppedImage] = useState(null); // State variable for the cropped image
  const [IsDone, setIsDone] = useState(false); // State variable to track if polygon drawing is done
  const [IsPred, setIsPred] = useState(false); // State variable to track if prediction is made
  const [Data, setData] = useState(""); // State variable to store image data URL
  const canvasRef = useRef(null); // Ref for canvas element
  const canvasContRef = useRef(null); // Ref for canvas container element
  const div2Ref = useRef(null); // Ref for div2 element

  // Function to draw the image on the canvas
  const drawImage = useCallback(() => {
    if (image) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const displayWidth = ctx.canvas.width;
      const displayHeight = ctx.canvas.height;
      ctx.drawImage(image, 0, 0, displayWidth, displayHeight);
    }
  }, [image]);

  // Function to check if the point is close to the starting point of the polygon
  const isCloseToStart = useCallback(
    (point) => {
      const start = polygon[0];
      const distance = Math.sqrt(
        (point.x - start.x) ** 2 + (point.y - start.y) ** 2
      );

      return distance < 20;
    },
    [polygon]
  );

  // Function to crop and display the image based on the drawn polygon
  const cropAndDisplayImage = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    var displayWidth = ctx.canvas.width;
    var displayHeight = ctx.canvas.height;

    const minX = Math.min(...polygon.map((point) => point.x));
    const minY = Math.min(...polygon.map((point) => point.y));
    const maxX = Math.max(...polygon.map((point) => point.x));
    const maxY = Math.max(...polygon.map((point) => point.y));
    const width = maxX - minX;
    const height = maxY - minY;

    const newCanvas = document.createElement("canvas");
    newCanvas.width = displayWidth;
    newCanvas.height = displayHeight;

    const newContext = newCanvas.getContext("2d");

    // Set up a clipping path based on the scaled polygon
    newContext.beginPath();
    newContext.moveTo(polygon[0].x, polygon[0].y);
    polygon.forEach((point) => {
      newContext.lineTo(point.x, point.y);
    });
    newContext.closePath();

    // Clip the canvas based on the scaled polygon
    newContext.clip();

    // Draw the original image onto the cropped canvas
    newContext.drawImage(
      image,

      0,
      0,
      displayWidth,
      displayHeight
    );
    // Reset the clipping path
    newContext.restore();
    const imageData = newContext.getImageData(minX, minY, width, height);
    const newCanvas1 = document.createElement("canvas");
    newCanvas1.width = width;
    newCanvas1.height = height;
    //re-sizing cropped image
    const newContext1 = newCanvas1.getContext("2d");
    newContext1.putImageData(imageData, 0, 0);
    const newCanvas2 = document.createElement("canvas");
    newCanvas2.width = 224;
    newCanvas2.height = 224;
    const newContext2 = newCanvas2.getContext("2d");
    newContext2.drawImage(newContext1.canvas, 0, 0, 224, 224);
    newContext2.fillStyle = "black";
    //converting image to url
    const dataURL = newCanvas2.toDataURL("image/png");
    setData(dataURL);
    const newImage = new Image();
    newImage.src = newCanvas2.toDataURL("image/png");

    setCroppedImage(newImage);
  }, [image, polygon]);

  // Function to draw points and polygon on the canvas
  const drawPoints = useCallback(() => {
    if (image) {
      const ctx = canvasRef.current.getContext("2d");
      const radius = 2;
      ctx.fillStyle = "green";

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawImage();
      //plotting points
      polygon.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        ctx.fill();
      });
      //connecting points
      if (polygon.length > 1) {
        ctx.beginPath();
        ctx.moveTo(polygon[0].x, polygon[0].y);
        polygon.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.strokeStyle = "green";
        ctx.stroke();
      }
      //filling if clip path is closed
      if (polygon.length > 2 && isCloseToStart(polygon[polygon.length - 1])) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        polygon.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.closePath();
        ctx.fill();
        setIsDone(true);
        // Crop and display the resulting image
        cropAndDisplayImage();
      }
    }
  }, [image, polygon, drawImage, isCloseToStart, cropAndDisplayImage]);

  // useEffect to handle resizing of the canvas
  useEffect(() => {
    const handleResize = () => {
      if (image) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        // const x = image.width;
        // const y = image.height;
        const { clientWidth, clientHeight } = canvasContRef.current;
        var displayWidth = clientWidth;
        var displayHeight = clientHeight;
        ctx.canvas.width = displayWidth;
        ctx.canvas.height = displayHeight;
        const div2 = div2Ref.current;

        // Ensure both elements are available
        if (div2) {
          const windoheight = window.innerHeight;
          const marginTop = 60 + (windoheight - 60 - 490) / 2;
          div2.style.top = "-" + marginTop + "px";
        }
        setPolygon([]);
        drawImage();
      }
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);
  }, [image, drawImage]);

  // useEffect to initialize canvas on image load
  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { clientWidth, clientHeight } = canvasContRef.current;
      var displayWidth = clientWidth;
      var displayHeight = clientHeight;
      ctx.canvas.width = displayWidth;
      ctx.canvas.height = displayHeight;

      const div2 = div2Ref.current;

      // Ensure both elements are available
      if (div2) {
        const windoheight = window.innerHeight;
        const marginTop = 60 + (windoheight - 60 - 490) / 2;
        div2.style.top = "-" + marginTop + "px";
      }
      const comp1 = document.querySelector(".cropcomp1");
      const comp2 = document.querySelector(".cropcomp3");
      comp1.style.zIndex = 0;
      comp2.style.zIndex = 0;
      setPolygon([]);
      drawImage();
    }
  }, [image, drawImage]);

  // useEffect to update canvas on polygon change
  useEffect(() => {
    drawPoints();
  }, [polygon, drawPoints]);

  // Function to load selected image
  const loadImage = (input) => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => setImage(img);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle click event on canvas
  const onCanvasClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPolygon((prevPolygon) => [...prevPolygon, { x, y }]);
  };

  // Function to send cropped image data to server for prediction
  function sendToServer(dataURL) {
    // Send dataURL to server route /finger nail
    fetch(" https://anemianetserver.onrender.com/finger_nail", {
      method: "POST",
      body: JSON.stringify({ image_data: dataURL }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from server
        setimg(dataURL);
        setf((prevData) => {
          const newData = [...prevData];
          newData[1] = data.cnn;
          newData[4] = data.knn;
          newData[7] = data.rf;
          return newData;
        });
        setfn(true);
        displayPredictions(data);
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }

  // Function to undo the last drawn point on canvas
  const undoLastPoint = () => {
    setPolygon((prevPolygon) => {
      const newPolygon = [...prevPolygon];
      newPolygon.pop(); // Remove the last point
      return newPolygon;
    });
  };

  // Function to handle click on "Done" button on canvas
  const handleDoneClick = () => {
    setImage(null);
    const comp1 = document.querySelector(".cropcomp1");
    const comp2 = document.querySelector(".cropcomp3");
    comp1.style.zIndex = 1;
    comp2.style.zIndex = 1;
    setIsDone(false);
  };

  // Function to clear the cropped image
  const claercrop = () => {
    setCroppedImage(null);
    setIsPred(false);
    setfn(false);
    const comp1 = document.querySelector(".cropcomp2");
    comp1.style.boxShadow =
      " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,rgba(0, 0, 0, 0.3) 0px 30px 60px -30px";
  };

  // Function to clear the image crop popup
  const clearpopup = () => {
    setCroppedImage(null);
    setImage(null);
    setIsDone(false);
    const comp1 = document.querySelector(".cropcomp1");
    const comp2 = document.querySelector(".cropcomp3");
    comp1.style.zIndex = 1;
    comp2.style.zIndex = 1;
  };

  // Function to trigger prediction
  const Prediction = () => {
    if (!image && croppedImage && !IsPred) {
      sendToServer(Data);
      setIsPred(true);
      const comp1 = document.querySelector(".cropcomp2");
      comp1.style.boxShadow =
        "rgb(0, 255, 0) 0px 50px 100px -20px, rgb(0, 255, 0) 0px 30px 60px -30px";
    }
  };

  // Function to display predictions
  const displayPredictions = (data) => {
    const cnnPrediction = document.getElementById("cnnfn");
    if (parseFloat(data.cnn) < 0.5) {
      cnnPrediction.style.color = "red";
      cnnPrediction.textContent =
        "CNN - Anemic " + ((parseFloat(data.cnn) - 1) * 100).toFixed(2) + "%";
    } else {
      cnnPrediction.style.color = "green";
      cnnPrediction.textContent =
        "CNN - Non-Anemic-" + (parseFloat(data.cnn) * 100).toFixed(2) + "%";
    }
    const knnPrediction = document.getElementById("knnfn");
    if (parseFloat(data.knn) < 0.5) {
      knnPrediction.style.color = "green";
      knnPrediction.textContent = "KNN - Non-Anemic";
    } else {
      knnPrediction.style.color = "red";
      knnPrediction.textContent = "KNN - Anemic";
    }
    const rfPrediction = document.getElementById("rffn");
    if (parseFloat(data.rf) < 0.5) {
      rfPrediction.style.color = "green";
      rfPrediction.textContent = "RF - Non-Anemic";
    } else {
      rfPrediction.style.color = "red";
      rfPrediction.textContent = "RF - Anemic";
    }
  };

  return (
    <div className="cropcomp2" id="crop-container">
      <h2>Finger Nail</h2>
      {/* Conditionally rendering file upload box */}
      {!image && !croppedImage && (
        <div
          className="file-upload-box"
          onClick={() => document.getElementById("file-input2").click()}
        >
          <RiAddCircleLine className="plus-icon" />
          <p className="file-text">
            {image ? "file chosen" : "No file chosen"}
          </p>
          {/* Hidden file input triggered by clicking on the file-upload-box */}
          <input
            type="file"
            id="file-input2"
            accept="image/*" // Specify the file types you want to accept
            onChange={(e) => loadImage(e.target)}
          />
        </div>
      )}
      {/* Render canvas if image is selected */}
      {image && (
        <div className="canvas-center" ref={div2Ref}>
          <div
            className="canvas-container"
            id="canvas-container"
            ref={canvasContRef}
          >
            {/* Canvas for drawing */}
            <canvas
              ref={canvasRef}
              onClick={onCanvasClick}
              style={{ cursor: "crosshair" }}
            ></canvas>

            {/* Buttons for undo, done, and close */}
            <button onClick={undoLastPoint} className="btn1">
              <FaUndo />
            </button>
            {IsDone && (
              <button onClick={handleDoneClick} className="btn2">
                <FaCheck />
              </button>
            )}
            <button onClick={clearpopup} className="close-btn">
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Render cropped image */}
      {!image && croppedImage && (
        <div className="cropped-image">
          {/* <h3>Cropped Image:</h3> */}
          <img src={croppedImage.src} alt="Cropped" />

          {/* Button to clear cropped image */}
          <button onClick={claercrop} className="btn3">
            <FaTimes />
          </button>
        </div>
      )}

      {/* Render predictions if prediction is made */}
      {IsPred && !image && croppedImage && (
        <div className="predictions">
          <h3>Predictions</h3>
          <h4 id="cnnfn">CNN - Loading...</h4>
          <h4 id="knnfn">KNN - Loading...</h4>
          <h4 id="rffn">RF - Loading...</h4>
        </div>
      )}

      {/* Button to trigger prediction */}
      <button className="pbtn" onClick={Prediction}>
        Predict
      </button>
    </div>
  );
};

export default FingerNail;
