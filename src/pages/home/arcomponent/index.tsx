import React, { useState, useEffect, useRef } from 'react';
import { ViroARScene, ViroText, ViroConstants, ViroImage, ViroCamera } from '@viro-community/react-viro';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles'

function ARDisplay(props: any): JSX.Element {

  const [text, setText] = useState("Initializing AR...");
  const [markerPosition, setPos] = useState([0, 0, 0]);
  const [markerRotation, setRot] = useState([0, 0, 0]);
  const scene = useRef(null);
  const [arData, setArData] = useState([[0, 0, -1]]);
  const [arRot, setArRot] = useState([[0,0,0]])

  let newProps = props.arSceneNavigator.viroAppProps;

  useEffect(() => {
    if (newProps.bestItem) {
      setText('Price: ' + newProps.bestItem.price + 'TRY');
    }
    setPos([0, 0, 0]);
    setRot([0, 0, 0]);
    calculateMarkerPositions();
  }, [newProps.arfound])

  // useEffect(() => {
  //   console.log(newProps.ARCount);
  //   calculateMarkerPositions();
  // }), [newProps.ARCount];

  function calculateMarkerPositions() {
    scene.current.getCameraOrientationAsync().then(
      (orientation: any) => {
        let cameraRotation = orientation.rotation;
        // console.log(cameraRotation);
        let cameraPosition = orientation.position;

        // cameraPosition[0] = Math.sin(cameraRotation[0]) + cameraPosition[0];
        // cameraPosition[1] =  Math.cos(cameraRotation[0]) + cameraPosition[1];
        // cameraPosition[2] = 
          // setPos([cameraPosition[0], cameraPosition[1], cameraPosition[2]]); // ADD OFFSET +30 or smt
          // setRot(cameraRotation);
        // let newData = arData;
        // newData.pos = [cameraPosition[0], cameraPosition[1], cameraPosition[2]];
        // newData.rot = cameraRotation;
        cameraPosition[0] = Math.tan(cameraRotation[1] / 2) * -1;
        cameraPosition[2] = cameraPosition[2] - 1;
        console.log(cameraRotation);

        setArData([...arData, cameraPosition]);
        setArRot([...arRot, cameraRotation]);
      }
    );
  }
  // rotation={markerRotation}
  return (
    <ViroARScene ref={scene} onTrackingUpdated={_onInitialized}>
      {//!newProps.arfound ?

        <>
          {/* <ViroCamera position={[0, 0, 1]} active={arData.active} /> */}
          {
            arData.map((item, index) => {
              return (
                <ViroImage
                key={index}
                  height={0.13}
                  width={0.13}
                  position={item}//[-0.25, 0.03, -1]}
                  rotation={[0,0,0]} //arRot[index]}
                  placeholderSource={require("../../../assets/darthvader.jpg")}//{ uri: newProps.bestItem.image_url }}
                  source={require("../../../assets/darthvader.jpg")}  //{ uri: newProps.bestItem.image_url }}
                // onClick={() => newProps.setNavRoute({ name: "productFoundScreen" })}
                />
              )
            })
          }
          {/* <ViroText
                text={'Darth Vader Shirt'}//newProps.bestItem.name}
                scale={[0.5, 0.5, 0.5]}
                extrusionDepth={0.01}
                // outerStroke={{type:"Outline", width: 0.3, color:'#000000'}}
                position={[0.08, 0.045, -1]}
                style={styles.ARComponentStyle}
              // onClick={() => newProps.setNavRoute({ name: "productFoundScreen" })}
              />
              <ViroText
                text={'Price: 50.99 TRY'} //text}
                scale={[0.5, 0.5, 0.5]}
                extrusionDepth={0.1}
                // outerStroke={{type:"Outline", width: 0.3, color:'#000000'}}
                position={[0.06, -0.015, -1]}
                style={styles.priceText}
              // onClick={() => newProps.setNavRoute({ name: "productFoundScreen" })}
              />
              <ViroImage
                height={0.20}
                width={0.8}
                position={[0, 0.02, -1.001]}
                placeholderSource={require("../../../assets/popupbg.png")}
                source={require("../../../assets/popupbg.png")}
              // onClick={() => newProps.setNavRoute({ name: "productFoundScreen" })}
              /> */}
        </>
        //   :
        //   null
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