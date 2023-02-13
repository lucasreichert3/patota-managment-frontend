import React from 'react';
import './styles.scss';

interface Props {
  loading: boolean;
}

function Loading({loading}: Props) {
  return <>{loading && <div className='lds-dual-ring'></div>}</>;
}

export default Loading;
