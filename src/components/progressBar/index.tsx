/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProgressBar as Pg, Step } from 'react-step-progress-bar';

import budgetActiveIcon from '../../assets/svg/budget - active.svg';
import budgetIcon from '../../assets/svg/budget.svg';
import contactActiveIcon from '../../assets/svg/contact - active.svg';
import contactIcon from '../../assets/svg/contact.svg';
import detailsActiveIcon from '../../assets/svg/details - active.svg';
import detailsIcon from '../../assets/svg/details.svg';
import furnituresActiveIcon from '../../assets/svg/furnitures - active.svg';
import furnituresIcon from '../../assets/svg/furnitures.svg';
import { Container } from './styles';

interface progressBarProps {
  porcent: number
}

const visiblePages = [
  'contato',
  'detalhes',
  'moveis',
  'resumo'
];

const steps: {[key: string]: number} = {
  'contato': 0,
  'detalhes': 34,
  'moveis': 67,
  'resumo': 100
};

const ProgressBar: React.FC<progressBarProps> = () => {
  const { pathname } = useLocation();
  const pathnameFormated = pathname.slice(1);
  const percent: number = steps[pathnameFormated];

  return (
    <Container visible={visiblePages.includes(pathnameFormated)}>
      <Pg
        percent={percent}
        filledBackground="#00d84f"
        stepPositions={4}
      >

        <Step>
          {({ accomplished }: any) => (
            <img src={accomplished ? contactActiveIcon : contactIcon} alt="Contato" />
          )}
        </Step>
        <Step>
          {({ accomplished }: any) => (
            <img src={accomplished ? detailsActiveIcon : detailsIcon} alt="Contato" />

          )}
        </Step>
        <Step>
          {({ accomplished }: any) => (
            <img src={accomplished ? furnituresActiveIcon : furnituresIcon} alt="Contato" />

          )}
        </Step>
        <Step>
          {({ accomplished }: any) => (
            <img src={accomplished ? budgetActiveIcon : budgetIcon} alt="Contato" />

          )}
        </Step>

      </Pg>
    </Container>
  );
};

export default ProgressBar;
