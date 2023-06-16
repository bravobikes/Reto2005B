import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import axios from 'axios';


const updateAgregarMonedasUrl = 'http://localhost:5000/updateMonedas';
const getTopScoreUrl = 'http://localhost:5000/getTopScore';
const getMonedasUrl = 'http://localhost:5000/getMonedas';
const updateTopScoreUrl = 'http://localhost:5000/updateTopScore';
const updateSetScoreUrl = 'http://localhost:5000/updatSetMonedas';
const postBuyCosmeticUrl = 'http://localhost:5000/insertBuyCosmetic';

export default function Videogame() {

  

  const [isGameOver, setIsGameOver] = useState(false);
  const [userName, setUserName] = useState();
  const [score, setScore] = useState();
  const [points, setPoints] = useState();
  const [myMonedas, setMonedas] = useState();
  
  const [topScore, setTopScore] = useState();

  const username = "U1";

  


  const { unityProvider, isLoaded, loadingProgression, addEventListener, removeEventListener,sendMessage } = useUnityContext({
    loaderUrl: "Juego/Build/Juego.loader.js",
    dataUrl: "Juego/Build/Juego.data",
    frameworkUrl: "Juego/Build/Juego.framework.js",
    codeUrl: "Juego/Build/Juego.wasm",
  });

  const sessionuser = localStorage.getItem('sessionUser');
  console.log("ID_CET: ", sessionuser);
  
  const fetchMonedas = async () => {
    try {

      const requestData = {
        userId: sessionuser,
        
      };

      const response = await axios.get(getMonedasUrl,{ params: requestData });
      // console.log('API response:', response);
      // console.log('API data:', response.data);

      const num_monedas = response.data.monedas;
      setMonedas(num_monedas);
      console.log("CURRENT Monedas: ",temp);
    

      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postBuyCosmetic = async (myCosmeticId) => {
    try {
      console.log("BUY COSMETIC", myCosmeticId);
      
      
      //const response = await axios.get(postBuyCosmeticUrl,{ params: requestData });
      
      // Perform the necessary update operation
      // For example, using axios.put() to update data
      const requestData = {
        cosmeticosId: myCosmeticId,
        userId: sessionuser,
        active:1
        
      };
      
      await axios.post(postBuyCosmeticUrl, requestData);
      // Optionally, you can fetch the updated data again if needed
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  
  
  


  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  const updateMonedas = async (myScore) => {
    try {
      console.log("UPDATE MONEDAS");
      
      setScore(myScore);
      
      // Perform the necessary update operation
      // For example, using axios.put() to update data
      const requestData = {
        userId: sessionuser,
        monedas: myScore
      };
      
      await axios.put(updateAgregarMonedasUrl, requestData);
      // Optionally, you can fetch the updated data again if needed
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const updateTopScore = async (myScore) => {
    try {
      
      console.log("UPDATING TOP SCORE");
      
      // Perform the necessary update operation
      // For example, using axios.put() to update data
      const requestData = {
        userId: sessionuser,
        topScore: myScore
      };
      
      await axios.put(updateTopScoreUrl, requestData);
      // Optionally, you can fetch the updated data again if needed
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const updateSetMonedas = async (myScore) => {
    try {
      console.log("SET");
      
      
      // Perform the necessary update operation
      // For example, using axios.put() to update data
      const requestData = {
        userId: sessionuser,
        monedas: myScore
      };
      
      await axios.put(updateSetScoreUrl, requestData);
      // Optionally, you can fetch the updated data again if needed
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  

  const fetchTopScore = async (gameOverTubeScore) => {
    try {

      const requestData = {
        userId: sessionuser
      };

      const response = await axios.get(getTopScoreUrl,{ params: requestData });
      // console.log('API response:', response);
      // console.log('API data:', response.data);

      const temp = response.data.topScore;
      console.log(parseInt(temp));
      console.log("tube: ", gameOverTubeScore);
      if(gameOverTubeScore > parseInt(temp)){
        console.log("NEW TOPSCORE");
        setTopScore(gameOverTubeScore);
        updateTopScore(gameOverTubeScore);
      }

      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  const handleGameOver = useCallback((gameOverUserName, gameOverScore,gameOverTubeScore) => {
    
    console.log("starting...", gameOverTubeScore);
    setIsGameOver(true);
    setUserName(gameOverUserName);
    setScore(gameOverScore);
    setPoints(gameOverTubeScore);

    

    console.log("Score1: ", gameOverScore);
    updateSetMonedas(gameOverScore);
    fetchTopScore(gameOverTubeScore);


    
  }, []);


  const handleModifyCoins = useCallback((numCambio) => {
    
    console.log("starting...", numCambio);

    updateMonedas(numCambio);
    


    
  }, []);

  const handleModifyCosmetic = useCallback((cosmeticId) => {
    
    console.log("starting cosmetic...", cosmeticId);

    postBuyCosmetic(cosmeticId);
    


    
  }, [postBuyCosmetic]);

  useEffect(() => {
      console.log("IN");
      // Code to send a message to Unity
      fetchMonedas(); 
      sendMessage("GameManager", "receiveMonedas", myMonedas);
      
    
  }, [sendMessage]);
  
  useEffect(() => {
    console.log('Topscore check:', topScore);
  }, [topScore]);

  useEffect(() => {

    addEventListener("GameOver", handleGameOver);
    addEventListener("ModifyCoins", handleModifyCoins);
    addEventListener("ModifyCosmetic", handleModifyCosmetic);
    
    return () => {
      
      
      
      
      //removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, handleGameOver,handleModifyCoins,handleModifyCosmetic]);

 
  
  

  

  useEffect(
    function () {
      
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );


  useEffect(() => {
    sendMessage("Canvas", "loadUser", 2);
  }, [sendMessage]);

  
  return (
    <Fragment>
    {!isLoaded && (
      <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
    )}
    <Unity
      unityProvider={unityProvider}
      style={{ width: "100vw", height: "100vh" }}
      devicePixelRatio={devicePixelRatio}
    />
    {isGameOver === true && (
          
          <p>{`Game Over ${userName}, ${username}! You've scored ${score} points.`}</p>
        )}
    </Fragment>
  );
}