/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

interface IRotateButtonProps {
  selected: boolean;
}

const RotateButton: React.FC<IRotateButtonProps> = ({ selected }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
    <g data-name="Camada 2">
      <g data-name="Camada 1">
        <g data-name="Grupo 413">
          <circle
            data-name="Elipse 6"
            cx={19}
            cy={19}
            r={19}
            style={{
              fill: '#fff',
            }}
          />
          <path
            style={{
              fill: selected ? '#AC0000' : '#00d84f',
            }}
            d="M29 16.5h-7.5V9h-5v7.5H9v5h7.5V29h5v-7.5H29v-5z"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default RotateButton;
