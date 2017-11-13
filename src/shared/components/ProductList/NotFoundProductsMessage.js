import React from 'react';

const NotFoundProductsMessage = (props) => {
  return (<div className='justify-content-center container'>
    <div className='products-not-found'>
      <p>No hay publicaciones que coincidan con tu búsqueda.</p>
      <ul>
        <li>Revisa la ortografía de la palabra.</li>
        <li>Utiliza palabras más genéricas o menos palabras.</li>
        <li>
          Navega por categorías de productospara
          encontrar un producto similar.
        </li>
      </ul>
    </div></div>);
};

export default NotFoundProductsMessage;
