import React from 'react';
import './App.css';
import { Meme } from './components/Meme';

function App() {
  return (
    <div>
      <Meme />
      <div className='bg-success text-white p-5'>
        <p className='text-center'>by <a href='https://www.linkedin.com/in/carloscmansilla/' style={{color: 'white'}} target='_blank'>Carlos Mansilla</a></p>
      </div>
    </div>
  );
}

export default App;
