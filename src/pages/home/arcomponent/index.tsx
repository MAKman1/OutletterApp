import React, { useState, useEffect, useRef } from 'react';
import { ViroARScene, ViroText, ViroConstants, ViroImage, ViroNode } from '@viro-community/react-viro';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles'

function ARDisplay(props: any): JSX.Element {

  const [text, setText] = useState("Initializing AR...");
  const [markerPosition, setPos] = useState([0, 0, 0]);
  const [markerRotation, setRot] = useState([0, 0, 0]);
  const scene = useRef(null);

  const [arData, setArData] = useState([]);
  const [arRot, setArRot] = useState([])

  let newProps = props.arSceneNavigator.viroAppProps;

  useEffect(() => {
    // if (newProps.bestItem) {
    //   setText('Price: ' + newProps.bestItem.price + 'TRY');
    // }
    console.log('INSIDE USE EFFECT');
    if (newProps.arItems.length !== 0) {
      console.log(newProps.arItems.length);
      console.log(newProps.arItems);
      calculateMarkerPositions();
    }
  }, [newProps.arItems])

  function calculateMarkerPositions() {
    scene.current.getCameraOrientationAsync().then(
      (orientation: any) => {
        let cameraRotation = orientation.rotation;
        let cameraPosition = orientation.position;
        cameraPosition[0] = ((cameraRotation[1] / 90) * 2) * -1;
        cameraPosition[1] = ((cameraRotation[0] / 90) * 2);
        cameraPosition[2] = cameraPosition[2] - 1;
        setArData([...arData, cameraPosition]);
        setArRot([...arRot, cameraRotation]);

        console.log('INSIDE CALC POS FUNCTION');
        newProps.arItems[newProps.arItems.length - 1]['pos'] = cameraPosition;
        newProps.arItems[newProps.arItems.length - 1]['rot'] = cameraRotation;
        // console.log('--------------------------------------------------------ARITEMS---------------------------------------------------------');
        // console.log(newProps.arItems);
      }
    );
  }

  return (
    <ViroARScene ref={scene} onTrackingUpdated={_onInitialized}>
      {newProps.arfound ?
        newProps.arItems.map((item, index) => {
          return (
            <ViroNode
              key={index}
              position={arData[index]}//[-0.25, 0.03, -1]}
              rotation={arRot[index]}
            >
              <ViroImage
                key={index}
                height={0.18}
                width={0.18}
                position={[-0.25, 0.015, -1]}
                placeholderSource={{ uri: item.image_url }}
                source={{ uri: item.image_url }}
              // onClick={() => newProps.setNavRoute({ name: "productFoundScreen" })}
              />
              <ViroText
                text={item.name}
                scale={[0.5, 0.5, 0.5]}
                extrusionDepth={0.01}
                // outerStroke={{type:"Outline", width: 0.3, color:'#000000'}}
                position={[0.08, 0.045, -1]}
                style={styles.ARComponentStyle}
              // onClick={() => newProps.setNavRoute({ name: "productFoundScreen" })}
              />
              <ViroText
                text={'Price: ' + item.price + 'TRY'}
                scale={[0.5, 0.5, 0.5]}
                extrusionDepth={0.1}
                // outerStroke={{type:"Outline", width: 0.3, color:'#000000'}}
                position={[0.06, -0.015, -1]}
                style={styles.priceText}
              // onClick={() => newProps.setNavRoute({ name: "productFoundScreen" })}
              />
              <ViroImage
                height={0.25}
                width={0.9}
                position={[0, 0.02, -1.001]}
                placeholderSource={require("../../../assets/popupbg.png")}
                source={require("../../../assets/popupbg.png")}
              // onClick={() => newProps.setNavRoute({ name: "productFoundScreen" })}
              />
            </ViroNode>
          )
        })
        :
        null
      }
      {
        newProps.notFound ?
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
              onClick={() => newProps.resetARScene()}
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