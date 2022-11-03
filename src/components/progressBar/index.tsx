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

type ISetpProps = {
  accomplished: boolean
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
  const percent = steps[pathnameFormated];

  return (
    <Container visible={visiblePages.includes(pathnameFormated)}>
      <div id="progress-bar-line-background">
      <Pg
        percent={percent}
        filledBackground="#00d84f"
        stepPositions={4}
      >

        <Step>
          {(props: ISetpProps) => (
            <div className="step-container">
            <img src={props.accomplished ? contactActiveIcon : contactIcon} alt="Contato" />
            <div>Contato</div>
            </div>
          )}
        </Step>
        <Step>
          {(props: ISetpProps) => (
            <div className="step-container">
            <img src={props.accomplished ? detailsActiveIcon : detailsIcon} alt="Detalhes" />
            <div>Detalhes</div>
            </div>

          )}
        </Step>
        <Step>
          {(props: ISetpProps) => (
            <div className="step-container">
            <img src={props.accomplished ? furnituresActiveIcon : furnituresIcon} alt="Móveis" />
            <div>Móveis</div>
            </div>

          )}
        </Step>
        <Step>
          {(props: ISetpProps) => (
            <div className="step-container">
            <img src={props.accomplished ? budgetActiveIcon : budgetIcon} alt="Orçamento" />
            <div>Orçamento</div>
            </div>

          )}
        </Step>

      </Pg>
      </div>
    </Container>
  );
};

export default ProgressBar;
