import './Meme.css';
import Frase from './Frase';
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

class Phrase {
    constructor(text, x, y, angle, font, size, color) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.font = font;
        this.size = size;
        this.color = color;
    }
}

export const Meme = () => {

    const [frases, setFrases] = useState([]);

    const [texto, setTexto] = useState('');
    const [font, setFont] = useState('arial');
    const [color, setColor] = useState('#ffff00');
    const [size, setSize] = useState('30px');
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

    const addFrase = () => {
        let nueva = new Phrase(texto, posX, posY, angle, font, size, color);
        setFrases([...frases, nueva]);
        setTexto('');
        setPosY(posY + 80);
    }

    const delFrase = () => {
        setFrases([]);
        setFont('arial');
        setColor('#ffff00');
        setTexto('');
        setPosX(10);
        setPosY(10);
    }

    const generar = () => {
        html2canvas(document.querySelector('#meme'), { allowTaint: true, useCORS: true, width: 400 })
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
        <div className='container-fluid text-center quito'>
            <h1 className='py-3 titulo'>Meme Editor</h1>
            <div className='menu border-top border-bottom border-dark border-2 mb-2 responsive' >
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='px-2'>
                        <h5>Imagen</h5>
                        <select name="img" defaultValue='0' onChange={selectImg}>
                            {imagenes.map((op, index, arr) =>
                                <option value={index}>{op.name}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='px-2'>
                        <h5>Frase</h5>
                        <input type="text" name="texto" value={texto} onChange={setFrase} placeholder='texto aqui..' />
                        <button className='btn btn-success mx-1' onClick={addFrase} >+</button>
                        <button className='btn btn-success mx-1' onClick={delFrase} >Borrar</button>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='px-2'>
                        <h5>Fuente</h5>
                        <select name='font' defaultValue='arial' onChange={(e) => setFont(e.target.value)}>
                            <option value='Arial'>Arial</option>
                            <option value='Verdana'>Verdana</option>
                            <option value='Tahoma'>Tahoma</option>
                            <option value='Times New Roman'>Times New Roman</option>
                            <option value='Georgia'>Georgia</option>
                            <option value='Garamond'>Garamond</option>
                            <option value='Courier New'>Courier New</option>
                            <option value='Brush Script MT'>Brush Script MT</option>
                        </select>
                    </div>
                    <div className='px-2'>
                        <h5>Color</h5>
                        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    </div>
                    <div className='px-2'>
                        <h5>Tamaño</h5>
                        <select name='size' defaultValue='30px' onChange={(e) => setSize(e.target.value)}>
                            <option value='20px'>Pequeño</option>
                            <option value='30px'>Mediano</option>
                            <option value='40px'>Grande</option>
                        </select>
                    </div>
                </div>
            </div>
            <figure id='meme'>
                {frases.map((f) =>
                    <Frase text={f.text} font={f.font} size={f.size} x={f.x} y={f.y} color={f.color} angle={f.angle} />
                )}
                <Frase text={texto} font={font} size={size} x={posX} y={posY} color={color} angle={angle} />
                <img src={imagen.url} alt="" className='img' />
            </figure>

            <div className='d-flex justify-content-center align-items-center border-top border-bottom border-dark border-2 menu mt-2'>
                <div className='px-2'>
                    <h5>Posicion</h5>
                    <button className='btn btn-success mx-1' onClick={() => setPosY(posY + 10)} > ↓ </button>
                    <button className='btn btn-success mx-1' onClick={() => setPosY(posY - 10)} > ↑ </button>
                    <button className='btn btn-success mx-1' onClick={() => setPosX(posX - 10)} > ← </button>
                    <button className='btn btn-success mx-1' onClick={() => setPosX(posX + 10)} > → </button>
                </div>
                <div className='px-2'>
                    <h5>Girar</h5>
                    <button className='btn btn-success mx-1' onClick={() => setAngle(angle - 15)} > ←  </button>
                    <button className='btn btn-success mx-1' onClick={() => setAngle(angle + 15)} > → </button>
                </div>
                <div className='px-2'>
                    <h5>Meme</h5>
                    <button onClick={generar} type="button" className='btn btn-success'>Descargar</button>
                </div>
            </div>
        </div>
    )
}
