import './Meme.css';
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

export const Meme = () => {
    let centroH = window.screen.width / 2;
    let canvaX = centroH - 200;

    const [texto, setTexto] = useState();
    const [colorTexto, setColor] = useState('#d7f700');
    const [sizeTexto, setSize] = useState(40);
    const [posicionHTexto, setPosicionH] = useState(centroH);
    const [posicionVTexto, setPosicionV] = useState(150);
    const [rotate, setRotate] = useState(0);

    const [imagen, setImagen] = useState('');
    const [imagenes, setImagenes] = useState([]);

    const setFrase = (e) => {
        setTexto(e.target.value);
    };

    const selectImg = (e) => {
        setImagen(imagenes[e.target.value]);
    };

    const generar = () => {
        html2canvas(document.querySelector('#meme'), { allowTaint: true, useCORS: true, width: 400, x: canvaX})
            .then(function (canvas) {
                let img = canvas.toDataURL("memes/jpg");
                let link = document.createElement("a");
                link.download = "memepropio.jpg";
                link.href = img;
                link.click();
            });
    };

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(respuesta => respuesta.json())
            .then(datos => {
                setImagenes(datos.data.memes);
                setImagen(datos.data.memes[0]);
            })
    }, []);


    return (
        <div className='text-center'>
            <h1 className='py-3 titulo'>Meme Editor</h1>
            <div className='d-flex justify-content-center flex-wrap menu'>
                <div className='px-2'>
                    <h5>Imagen</h5>
                    <select name="img" defaultValue='0' onChange={selectImg}>
                        {imagenes.map((op, index, arr) =>
                            <option value={index}>{op.name}</option>
                        )}
                    </select>
                </div>
                <div className='px-2'>
                    <h5>Frase</h5>
                    <input type="text" name="texto" onChange={setFrase} placeholder='texto aqui..' />
                </div>
                <div className='px-2'>
                    <h5>Color</h5>
                    <input type="color" value={colorTexto} onInput={(e) => setColor(e.target.value)} />
                </div>
                <div className='px-2'>
                    <h5>Tamaño</h5>
                    <select name='size' defaultValue='40' onChange={(e) => setSize(e.target.value)}>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                    </select>
                </div>
            </div>
            <figure id='meme'>
                <p className='position-absolute texto' style={{ fontSize: `${sizeTexto}px`, color: `${colorTexto}`, marginLeft: `${posicionHTexto}px`, marginTop: `${posicionVTexto}px`, transform: `rotate(${rotate}deg)` }} >{texto}</p>
                <img src={imagen.url} alt="" className='img' />
            </figure>

            <div className='d-flex justify-content-center flex-wrap menu'>
                <div className='px-2'>
                    <h5>Posicion</h5>
                    <button className='btn btn-primary mx-1' onClick={() => setPosicionV(posicionVTexto + 10)} > ↓ </button>
                    <button className='btn btn-primary mx-1' onClick={() => setPosicionV(posicionVTexto - 10)} > ↑ </button>
                    <button className='btn btn-primary mx-1' onClick={() => setPosicionH(posicionHTexto - 10)} > ← </button>
                    <button className='btn btn-primary mx-1' onClick={() => setPosicionH(posicionHTexto + 10)} > → </button>
                </div>
                <div className='px-2'>
                    <h5>Girar</h5>
                    <button className='btn btn-primary mx-1' onClick={() => setRotate(rotate - 15)} > ←  </button>
                    <button className='btn btn-primary mx-1' onClick={() => setRotate(rotate + 15)} > → </button>
                </div>
                <div className='px-2'>
                    <h5>Meme</h5>
                    <button onClick={generar} type="button" className='btn btn-primary'>Descargar</button>
                </div>
            </div>
        </div>
    )
}
