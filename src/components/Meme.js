import './Meme.css';
import Frase from './Frase';
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

export const Meme = () => {

    const [texto, setTexto] = useState();
    const [color, setColor] = useState('#000');
    const [size, setSize] = useState('35px');
    const [posX, setPosX] = useState(10);
    const [posY, setPosY] = useState(10);
    const [angle, setAngle] = useState(0);

    const [imagen, setImagen] = useState('');
    const [imagenes, setImagenes] = useState([]);

    const setFrase = (e) => {
        setTexto(e.target.value);
    };

    const selectImg = (e) => {
        setImagen(imagenes[e.target.value]);
    };

    const generar = () => {
        html2canvas(document.querySelector('#meme'), { allowTaint: true, useCORS: true, width: 400})
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
                    <input type="color" value={color} onInput={(e) => setColor(e.target.value)} />
                </div>
                <div className='px-2'>
                    <h5>Tamaño</h5>
                    <select name='size' defaultValue='35px' onChange={(e) => setSize(e.target.value)}>
                        <option value='25px'>Pequeño</option>
                        <option value='35px'>Mediano</option>
                        <option value='45px'>Grande</option>
                    </select>
                </div>
            </div>
            <figure id='meme'>
                <Frase text={texto} size={size} x={posX} y={posY} color={color} angle={angle} />
                <img src={imagen.url} alt="" className='img' />
            </figure>

            <div className='d-flex justify-content-center flex-wrap menu mt-2'>
                <div className='px-2'>
                    <h5>Posicion</h5>
                    <button className='btn btn-primary mx-1' onClick={() => setPosY(posY + 10)} > ↓ </button>
                    <button className='btn btn-primary mx-1' onClick={() => setPosY(posY - 10)} > ↑ </button>
                    <button className='btn btn-primary mx-1' onClick={() => setPosX(posX - 10)} > ← </button>
                    <button className='btn btn-primary mx-1' onClick={() => setPosX(posX + 10)} > → </button>
                </div>
                <div className='px-2'>
                    <h5>Girar</h5>
                    <button className='btn btn-primary mx-1' onClick={() => setAngle(angle - 15)} > ←  </button>
                    <button className='btn btn-primary mx-1' onClick={() => setAngle(angle + 15)} > → </button>
                </div>
                <div className='px-2'>
                    <h5>Meme</h5>
                    <button onClick={generar} type="button" className='btn btn-primary'>Descargar</button>
                </div>
            </div>
        </div>
    )
}
