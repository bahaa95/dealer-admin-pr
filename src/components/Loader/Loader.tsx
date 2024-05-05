import React from 'react';
import './styles.scss';

export const Loader = () => {
  return (
    <div className="loader-container flex flex-col">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 className="text-lg font-bold"> يرجى الانتضار</h1>
    </div>
  );
};
