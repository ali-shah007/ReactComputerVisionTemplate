// App.js
import React, { useState } from "react";

import ObjectDetection from "./Components/ObjectDetection";
import WeaponDetection from "./Components/WeaponDetection";
import WeaponDetectionImageUpload from "./Components/WeaponDetectionImageUpload";
import RoboflowControl from "./Components/RoboFlowControl";
import RoboflowWebcamInfer from "./Components/NewTest";
import WeaponDetectionHighAccuracy from "./Components/WeaponDetectionImageUpload";

const componentsMap = {
  "Object Detection": <ObjectDetection />,
  "Weapon Detection": <WeaponDetection />,
  "Weapon Detection (Image Upload)": <WeaponDetectionImageUpload />,
  "Weapon Detection (High Accuracy)": <WeaponDetectionHighAccuracy />,
  "Roboflow Control": <RoboflowControl />,
  "Roboflow Webcam Infer": <RoboflowWebcamInfer />,
};

function App() {
  const [selected, setSelected] = useState("Weapon Detection (High Accuracy)");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-indigo-700 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-bold whitespace-nowrap overflow-hidden transition-opacity duration-300">
            {sidebarOpen && "AI Dashboard"}
          </span>
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? "⮜" : "⮞"}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {Object.keys(componentsMap).map((key) => (
            <button
              key={key}
              className={`w-full text-left px-4 py-2 hover:bg-indigo-500 transition-colors ${
                selected === key ? "bg-indigo-600" : ""
              }`}
              onClick={() => setSelected(key)}
            >
              {sidebarOpen ? key : key[0]}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">{selected}</h1>
        <div className="bg-white p-4 shadow rounded h-full overflow-auto">
          {componentsMap[selected]}
        </div>
      </div>
    </div>
  );
}

export default App;
