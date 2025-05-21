// Import dependencies
import React, { useRef, useState, useEffect } from "react";

import ObjectDetection from "./Components/ObjectDetection";
import WeaponDetection from "./Components/WeaponDetection";
import WeaponDetectionImageUpload from "./Components/WeaponDetectionImageUpload";
import RoboflowControl from "./Components/RoboFlowControl";
import RoboflowWebcamInfer from "./Components/NewTest";
import WeaponDetectionHighAccuracy from "./Components/WeaponDetectionImageUpload";

function App() {
  // const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  // // Main function
  // const runCoco = async () => {
  //   // 3. TODO - Load network 
  //   // e.g. const net = await cocossd.load();
  //   const net = await cocossd.load();
  
    
  //   //  Loop and detect hands
  //   setInterval(() => {
  //     detect(net);
  //   }, 10);
  // };

  // const detect = async (net) => {
  //   // Check data is available
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get Video Properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     // Set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     // Set canvas height and width
  //     canvasRef.current.width = videoWidth;
  //     canvasRef.current.height = videoHeight;

  //     // 4. TODO - Make Detections
  //     // e.g. const obj = await net.detect(video);
  //     const obj = await net.detect(video);
  //     console.log(obj);

  //     // Draw mesh
  //     const ctx = canvasRef.current.getContext("2d");

  //     // 5. TODO - Update drawing utility
  //     // drawSomething(obj, ctx)  
  //     drawRectangle(obj, ctx);
      
  //   }
  // };

  // useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <WeaponDetectionHighAccuracy/>
    </div>
  );
}

export default App;
