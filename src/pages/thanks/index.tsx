import React from 'react';

import confirmedIcon from '../../assets/svg/confirmed.svg';
import Button from '../../components/button';
import { Container } from './styles';

const Thanks: React.FC = () => {
  return (
    <Container>
      <h1>Muito obrigado por chegar até aqui!</h1>
      <h2>Logo entraremos em contato.</h2>
      <img src={confirmedIcon} alt="Tudo certo até aqui!" />
      <p>
        Agora você está a apenas um passo <br /> de transformar sua casa em um
        lar.
      </p>
      <Button navigateTo="/ambientes" label="Mobiliar outro ambiente" />
    </Container>
  );
};

export default Thanks;
