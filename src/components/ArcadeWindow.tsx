/* eslint-disable react/display-name */
import { Html } from "@react-three/drei";
import React, { useMemo, useState } from "react";
import { EmulatorJS } from "react-emulatorjs";
import { Container, Text } from "@react-three/uikit";
import { Button } from "@react-three/uikit-apfel";

const ArcadeWindow = React.memo(() => {
  console.log("render game window");
  const [started, setStarted] = useState(false);
  const rom = "./SuperMarioAdvance4.gba";

  const handleStart = (e: any) => {
    e.stopPropagation();
    setStarted(true);
  };

  return (
    <Container width={300} flexgrow={1} justifyContent="center">
      {!started ? (
        <Button onClick={handleStart} background="red">
          <Text>Start</Text>
        </Button>
      ) : (
        <Html
          transform
          wrapperClass="htmlScreen"
          distanceFactor={0.925}
          zIndexRange={[2, 1]}
        >
          <EmulatorJS
            width={1610 * 1.5}
            height={852 * 1.5}
            EJS_core="gba"
            EJS_gameUrl={rom}
            EJS_startOnLoaded={true}
            EJS_Buttons={{ fullscreen: true }}
            EJS_onGameStart={() => {
              console.log("game start");
            }}
          />
        </Html>
      )}
    </Container>
  );
});

export default ArcadeWindow;
