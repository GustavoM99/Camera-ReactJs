import React, {useRef, useEffect, useState} from "react";


/* Esta é uma simples aplicação com utilização da câmera,
    o que eu consegui fazer com meus conhecimentos em ReactJs */

// Obs.: Sempre escrevo o código em inglês, por questões de boas práticas.

function App() {

  // Aqui eu declaro algumas constantes que serão usadas
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  // Esta parte basicamente puxa o uso da câmera para o navegador, já formatando o tamanho
  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 } })
    .then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error(err);
    })
  }

  // Nesta parte eu crio a função de tirar foto, e guardar a foto tirada para poder mostrá-la
  const takePhoto = () => {
    const width = 414;
    const height = width / (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  }

  // Nesta parte eu crio a função de fechar a foto

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  }

  useEffect(() => {
    getVideo();
  }, [videoRef])

  /* A partir deste 'return' é escrito tudo que é mostrado na tela,
      e tudo isso foi formatado no arquivo 'index.css', na tentativa de deixar um design mais amigável */
  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video> 
        <button onClick={takePhoto}>Snap!</button>
      </div>
      <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>Close!</button>
      </div>
    </div>


  );
  }



export default App;
