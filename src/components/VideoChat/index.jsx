import React, { useEffect, useState } from "react";
import Video from "twilio-video";

const VideoChat = () => {
  const [frontCameraId, setFrontCameraId] = useState(null);
  const [devices, setDevices] = useState(null);
  useEffect(() => {
    // Function to enumerate devices and find the front-facing camera.
    async function getFrontFacingCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setDevices(devices)
        const frontCamera = devices.find((device) =>
          device.label.toLowerCase().includes("front")
        );

        console.log(devices);
        if (frontCamera) {
          setFrontCameraId(frontCamera.deviceId);
        } else {
          console.log("webcameras only");
        }
      } catch (error) {
        console.log(error);
      }
    }

    getFrontFacingCamera();
  }, []);

  useEffect(() => {
    if (frontCameraId) {
      // Initialize Twilio Video with the selected front-facing camera
      Video.createLocalVideoTrack({ deviceId: { exact: frontCameraId } }).then(
        (track) => {
          const videoElement = document.getElementById("local-video");
          videoElement.appendChild(track.attach());
        }
      );
    }
  }, [frontCameraId]);

  return (
    <div>
      <div id="local-video"></div>
      {devices ? devices.map((d) => <p>{d.label}</p>) : <p> no devices</p>}
    </div>
  );
};

export default VideoChat;
