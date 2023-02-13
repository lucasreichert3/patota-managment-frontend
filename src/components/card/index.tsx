import React, {PropsWithChildren, ReactElement} from 'react';
import './index.scss';

interface Props extends PropsWithChildren {
  header?: ReactElement;
}

function Card(props: Props) {
  return <div className='card-container'>
    <div className="header">
        {props.header}
    </div>
    {props.children}
  </div>;
}

export default Card;
