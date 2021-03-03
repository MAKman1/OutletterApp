import React, { useState, useEffect, useRef } from 'react';
import { ViroARScene, ViroText, ViroConstants } from '@viro-community/react-viro';

import styles from './styles'

function ARDisplay(props: any): JSX.Element {

  const [text, setText] = useState("Initializing AR...");
  const [markerPosition, setPos] = useState([0, 0, -1]);
  const [markerRotation, setRot] = useState([0, 0, 0]);
  const scene = useRef(null);

  useEffect(() => {
    calculateMarkerPositions();
  }, [props.arSceneNavigator.viroAppProps.arfound])


  function calculateMarkerPositions() {
    scene.current.getCameraOrientationAsync().then(
      (orientation: any) => {
        let cameraRotation = orientation.rotation;
        console.log(cameraRotation);
        let cameraPosition = orientation.position;

        cameraPosition[0] -= Math.sin(cameraRotation[1]);
        cameraPosition[2] -=  Math.cos(cameraPosition[1])
        
        setPos([cameraPosition[0], cameraPosition[1], cameraPosition[2]]); // ADD OFFSET +30 or smt
        setRot(cameraRotation);
        // console.log(markerPosition);
      }
    );
  }

  return (
    <ViroARScene ref={scene} onTrackingUpdated={_onInitialized} >
        {/* { props.arSceneNavigator.viroAppProps.arfound ? */}
        <ViroText text={text} scale={[.5, .5, .5]} position={markerPosition}  style={styles.ARComponentStyle} /> 
        {/* : */}
        {/* null */}
        {/* } */}
    </ViroARScene>
  );

  function _onInitialized(state: any, reason: any) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('Hello World');
    } else if (state == ViroConstants.TRACKING_NONE) {
      setText('');
    }
  }
}

export default ARDisplay;