import React from 'react';
import './index.scss';

interface Props {
  text: string;
  click: () => void
}

function Button({text, click}: Props) {
  return <div className='button-container' onClick={click}>{text}</div>;
}

export default Button;
