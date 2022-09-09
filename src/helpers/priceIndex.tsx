import React from 'react';

import priceIndex1 from '../assets/svg/price-1.svg';
import priceIndex2 from '../assets/svg/price-2.svg';
import priceIndex3 from '../assets/svg/price-3.svg';

const PriceIndex: React.FC<{ index: number }> = ({ index }) => {
  const src = () => {
    switch (index) {
      case 1:
        return priceIndex1;
      case 2:
        return priceIndex2;
      case 3:
        return priceIndex3;

      default:
        return priceIndex1;
    }
  };
  return (
    <img
      className="price-index-icon-img"
      src={src()}
      alt={`Indice de preço ${index}`}
    />
  );
};
export default PriceIndex;
