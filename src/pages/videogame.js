import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Videogame() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "Juego/Build/Juego.loader.js",
    dataUrl: "Juego/Build/Juego.data",
    frameworkUrl: "Juego/Build/Juego.framework.js",
    codeUrl: "Juego/Build/Juego.wasm",
  });

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

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

  return (
    <>
    {!isLoaded && (
      <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
    )}
    <Unity
      unityProvider={unityProvider}
      style={{ width: 2160, height: 1080 }}
      devicePixelRatio={devicePixelRatio}
    />
    </>
  );
}