import React from 'react';
import { SyncLoader } from 'react-spinners';

import './Spinner.css';

const Spinner = (props) => {
  return (<div className='loading'>
    <SyncLoader
      color={'#FFE600'}
    />
    <p className='loading-title'>{props.text}</p>
  </div>);
};

export default Spinner;
