import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { WindowManager, createWindow, useWindowStore } from "@spatialjs/core";
import { Environment, OrbitControls } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import * as THREE from "three";
import MainMenu from "./components/MainMenu";
import ArcadeWindow from "./components/ArcadeWindow";
import { Office } from "./components/Office";
import Clock from "./components/Clock";
import Pomondoro from "./components/Pomondoro";
import { Gamepad2, Watch, Clock1 } from "@react-three/uikit-lucide";

const store = createXRStore({
  emulate: true,
  frameRate: "high",
  foveation: 100,
});

const App: React.FC = () => {
  console.log("App component rendered");

  useEffect(() => {
    createWindow(ArcadeWindow, {
      id: "arcade",
      title: "Arcade",
      followCamera: false,
      disableBackground: false,
      disableTiling: true,
      icon: Gamepad2,
      position: new THREE.Vector3(
        -6.515547180175781,
        3.948447640633346,
        0.5299375558790193
      ),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    });
    createWindow(MainMenu, {
      id: "menu",
      title: "Main Menu",
      followCamera: true,
      disableBackground: false,
      disableTitleBar: true,
      disableTiling: true,
      selectable: false,
      position: new THREE.Vector3(
        -6.31554718017578,
        0.7298358951552244,
        0.49989919107340003
      ),
    });
    createWindow(Clock, {
      id: "clock",
      title: "Clock",
      followCamera: true,
      disableBackground: false,
      disableTitleBar: true,
      disableTiling: true,
      selectable: false,
      icon: Clock1,
      position: new THREE.Vector3(
        -6.31554718017578,
        2.0298358951552244,
        0.49989919107340003
      ),
    });
    createWindow(Pomondoro, {
      id: "pomo",
      title: "Pomondoro",
      followCamera: false,
      disableTiling: true,
      disableTitleBar: true,
      selectable: false,
      icon: Watch,
      position: new THREE.Vector3(
        -6.31554718017578,
        2.0298358951552244,
        -2.49989919107340003
      ),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        gl={{ localClippingEnabled: true }}
        camera={{
          position: [
            2.972971539398106, 3.9354946965225684, 1.33710176014615864,
          ],
          rotation: new THREE.Euler(
            -0.1098708913525798,
            0.8603464464780124,
            0.038877349543585876
          ),
        }}
      >
        <OrbitControls />
        <XR store={store}>
          <Suspense fallback={null}>
            <Environment key="environment" preset="night" background={true} />
          </Suspense>
          <Suspense fallback={null}>
            <WindowManager key="window-manager" />
          </Suspense>
          <Suspense fallback={null}>
            {/* <Room key="room" /> */}
            <Office scale={0.5} position={[0, -1, 0]} />
          </Suspense>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
        </XR>
      </Canvas>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
    </div>
  );
};

export default React.memo(App);
