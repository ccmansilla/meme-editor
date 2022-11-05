import './Imgmeme.css';
import React, { useState } from 'react';
import html2canvas from 'html2canvas';

export const Imgmeme = () => {
    let centroH = window.screen.width / 2;

    const [texto,setTexto] = useState();
    const [colorTexto, setColor] = useState('#000'); 
    const [sizeTexto, setSize] = useState(40);
    const [posicionHTexto, setPosicionH] = useState(centroH);
    const [posicionVTexto, setPosicionV] = useState(350);

    const setFrase = (e) => {
        setTexto(e.target.value);
    };

    const [imagen, setImagen] = useState(1);
   
    const selectImg = (e) => {
        setImagen(e.target.value);
    };

    const generar = () => {
        html2canvas(document.querySelector('#meme')).then(function(canvas) {
            let img = canvas.toDataURL("memes/jpg");
            let link = document.createElement("a");
            link.download = "memepropio.jpg";
            link.href = img;
            link.click();
        });
    };
   
  return (
    <div className='text-center'>
        <h1 className='py-3 titulo'>Meme Editor</h1>
        <div className='d-flex justify-content-center menu'>
            <div className='px-2'>
                <h4>Frase</h4>
                <input type="text" name="texto" onChange={setFrase} placeholder='texto aqui..'/>
            </div>
            <div className='px-2'>
                <h4>Color</h4>
                <input type="color" onInput={(e) => setColor(e.target.value)} />
            </div>
            <div className='px-2'>
                <h4>Size</h4>
                <select name='size' onChange={(e) => setSize(e.target.value)}>
                    <option>20</option>
                    <option>30</option>
                    <option selected>40</option>
                    <option>60</option>
                    <option>80</option>
                    <option>100</option>
                </select>
            </div>   
            <div className='px-2'>
                <h4>Posicion</h4>
                <button className='btn btn-primary mx-1' onClick={() => setPosicionV(posicionVTexto + 10)} > ↓ </button>
                <button className='btn btn-primary mx-1' onClick={() => setPosicionV(posicionVTexto - 10)} > ↑ </button>
                <button className='btn btn-primary mx-1' onClick={() => setPosicionH(posicionHTexto + 10)} > → </button>
                <button className='btn btn-primary mx-1' onClick={() => setPosicionH(posicionHTexto - 10)} > ← </button>
            </div>
            <div className='px-2'>
                <h4>Imagen</h4>
                <select name="img" onChange={selectImg} className='mb-5'>
                    <option value="1">Futurama</option>
                    <option value="2">Bob Esponja</option>
                    <option value="3">Señora</option>
                    <option value="4">Calamarto</option>
                </select>
            </div>
        </div>

        <figure id='meme'>
            <p className='position-absolute texto' style={{fontSize:`${sizeTexto}px`, color: `${colorTexto}`, paddingLeft: `${posicionHTexto }px` , paddingTop: `${posicionVTexto }px` }} >{texto}</p>
            <img src={`./memes/${imagen}.jpg`} alt="" className='img' />
        </figure>

        <button onClick={generar} type="button" className='btn btn-danger mb-5'>Descargar Meme</button>
    </div>
  )
}
