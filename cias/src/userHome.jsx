import React, { useState, useEffect, useRef } from 'react';
import './styles/userHome.css';

function UserHome({ email }) {  // Recibimos el correo como prop
  const [hasPhoto, setHasPhoto] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 }
      })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          video.play();
        };
      })
      .catch(err => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);

    // Llamada al backend para enviar la notificación
    sendNotification(email);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  const sendNotification = (email) => {
    fetch('http://localhost:5000/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(response => response.json())
      .then(data => console.log("Notificación enviada", data))
      .catch(error => console.error("Error al enviar la notificación:", error));
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>REGISTER FACE!</button>
      </div>
      <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>CLOSE</button>
      </div>
    </div>
  );
}

export default UserHome;
