import React from 'react';
import { useLocation } from 'react-router-dom';

import facebookLogo from '../../assets/svg/facebook.svg';
import instagramLogo from '../../assets/svg/instagram.svg';
import logo from '../../assets/svg/logo.svg';
import youtubeLogo from '../../assets/svg/youtube.svg';
import { Container } from './styles';

const Footer: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Container onFurniturePage={pathname === '/moveis'}>
      <main>
        <img src={logo} alt="JN - Móveis Planejados" />
        <p>
          Fábrica de móveis planejados situada
          <br /> em Natal, RN. Estamos há mais de 15 anos
          <br /> no mercado e já entregamos mais de
          <br /> 1800 ambientes completos.
        </p>
        <section id="footer-icons">
          <a
            href="https://pt-br.facebook.com/jnmoveisplanejados.rn/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={facebookLogo} alt="Acesse o facebook" />
          </a>
          <a
            href="https://www.instagram.com/jn.moveisplanejados/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagramLogo} alt="Acesse o instagram" />
          </a>
          <a
            href="https://pt-br.facebook.com/jnmoveisplanejados.rn/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={youtubeLogo} alt="Acesse o youtube" />
          </a>
        </section>
      </main>
      <section id="footer-copy-right">
        <p>
          <strong>2021 Copyright: </strong>JN Móveis.
        </p>
        <span id="devs">
          <p>
            <strong>Projeto: </strong>Jonathan Weslley.
          </p>
          <p>
            <strong>Desenvolvimento: </strong>Gustavo Albuquerque.
          </p>
        </span>
      </section>
    </Container>
  );
};

export default Footer;
