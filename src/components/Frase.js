import React from 'react';

export default function Frase({text, x, y, angle, color, size, font}) {
  return (
    <p className='position-absolute texto' 
        style={{ 
            fontFamily: `${font}, serif`,
            fontSize: `${size}`, 
            color: `${color}`, 
            marginLeft: `${x}px`, 
            marginTop: `${y}px`, 
            transform: `rotate(${angle}deg)` 
        }} >
        {text}
    </p>
  )
}
