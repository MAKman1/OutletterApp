import React, { useState, useEffect, useRef } from 'react';
import { ViroARScene, ViroText, ViroConstants, ViroImage } from '@viro-community/react-viro';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles'

function ARDisplay(props: any): JSX.Element {

  const [text, setText] = useState("Initializing AR...");
  const [markerPosition, setPos] = useState([0, 0, -1]);
  const [markerRotation, setRot] = useState([0, 0, 0]);
  const scene = useRef(null);

  let newProps = props.arSceneNavigator.viroAppProps;

  useEffect(() => {
    if (newProps.bestItem)
      setText('Price: ' + newProps.bestItem.price + 'TRY');
  }, [newProps.arfound])


  function calculateMarkerPositions() {
    scene.current.getCameraOrientationAsync().then(
      (orientation: any) => {
        let cameraRotation = orientation.rotation;
        console.log(cameraRotation);
        let cameraPosition = orientation.position;

        // cameraPosition[0] += Math.sin(cameraRotation[1]);
        // cameraPosition[2] -=  Math.cos(cameraPosition[1])

        setPos([cameraPosition[0], cameraPosition[1], cameraPosition[2]]); // ADD OFFSET +30 or smt
        setRot(cameraRotation);
      }
    );
  }
  // rotation={markerRotation}
  return (
    <ViroARScene ref={scene} onTrackingUpdated={_onInitialized}>
      {props.arSceneNavigator.viroAppProps.arfound ?
        <>
          <ViroImage
            height={0.13}
            width={0.13}
            position={[-0.25, 0.03, -1]}
            placeholderSource={{ uri: newProps.bestItem.image_url }}
            source={{ uri: newProps.bestItem.image_url }}
            onClick={() => props.arSceneNavigator.viroAppProps.setNavRoute({ name: "productFoundScreen" })}
          />
          <ViroText
            text={newProps.bestItem.name}
            scale={[0.5, 0.5, 0.5]}
            extrusionDepth={0.01}
            // outerStroke={{type:"Outline", width: 0.3, color:'#000000'}}
            position={[0.08, 0.045, -1]}
            style={styles.ARComponentStyle}
            onClick={() => props.arSceneNavigator.viroAppProps.setNavRoute({ name: "productFoundScreen" })}
          />
          <ViroText
            text={text}
            scale={[0.5, 0.5, 0.5]}
            extrusionDepth={0.1}
            // outerStroke={{type:"Outline", width: 0.3, color:'#000000'}}
            position={[0.06, -0.015, -1]}
            style={styles.priceText}
            onClick={() => props.arSceneNavigator.viroAppProps.setNavRoute({ name: "productFoundScreen" })}
          />
          <ViroImage
            height={0.20}
            width={0.8}
            position={[0, 0.02, -1.001]}
            placeholderSource={require("../../../assets/popupbg.png")}
            source={require("../../../assets/popupbg.png")}
            onClick={() => props.arSceneNavigator.viroAppProps.setNavRoute({ name: "productFoundScreen" })}
          />
        </>
        :
        null
      }
      {
        props.arSceneNavigator.viroAppProps.notFound ?
          <>
            <ViroText
              text={'Product  Not  Found'}
              scale={[0.5, 0.5, 0.5]}
              extrusionDepth={0.01}
              position={[0, 0, -1]}
              style={styles.ARComponentStyle}
            />
            <ViroImage
              height={0.13}
              width={0.13}
              position={[0, -0.12, -1]}
              placeholderSource={require('../../../assets/reset.png')}
              source={require('../../../assets/reset.png')}
              onClick={() => props.arSceneNavigator.viroAppProps.resetARScene()}
            />
            <ViroImage
              height={0.20}
              width={0.8}
              position={[0, 0.02, -1.001]}
              placeholderSource={require("../../../assets/popupbg.png")}
              source={require("../../../assets/popupbg.png")}
            />
          </>
          :
          null
      }
    </ViroARScene>
  );

  function _onInitialized(state: any, reason: any) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // setText('Price: TRY');
    } else if (state == ViroConstants.TRACKING_NONE) {
      setText('');
    }
  }
}

export default ARDisplay;