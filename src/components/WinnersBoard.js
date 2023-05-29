
import React from 'react';



export const WinnersBoard = ({ data }) => {
  return (
    <div>
      <p>GANADORES</p>
      {Object.values(data).map(item => (
        <div key={item.id}>
          <p>Gano:{item.nombre} el dia {item.fecha}</p>
        </div>
      ))}
    </div>
  );
};