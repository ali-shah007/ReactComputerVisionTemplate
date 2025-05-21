import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const WeaponDetectionHighAccuracy = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Webcam error:", err);
      }
    };

    startWebcam();

    const interval = setInterval(() => {
      captureAndDetect();
    }, 1000); // 1s interval is more practical for performance

    return () => clearInterval(interval);
  }, []);

  const captureAndDetect = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL("image/jpeg").split(",")[1];

    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: "https://serverless.roboflow.com/weapon-detection-cctv-v3-dataset/1",
        params: {
          api_key: "IaOqUIAk2s0bKRAaTCO9",
        },
        data: base64Image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setDetections(response.data.predictions || []);
    } catch (error) {
      console.error("Detection error:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="relative max-w-4xl mx-auto mt-6">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full rounded"
        style={{ position: "relative", zIndex: 1 }}
      />
      <canvas ref={canvasRef} className="hidden" />

      {detections.map((det, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${det.x - det.width / 2}px`,
            top: `${det.y - det.height / 2}px`,
            width: `${det.width}px`,
            height: `${det.height}px`,
            border: "2px solid red",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "12px",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {det.class} ({Math.round(det.confidence * 100)}%)
        </div>
      ))}

      {loading && (
        <div className="text-center text-blue-600 mt-4 animate-pulse">
          Detecting...
        </div>
      )}
    </div>
  );
};

export default WeaponDetectionHighAccuracy;
