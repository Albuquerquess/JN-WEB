import React from 'react';
import { Helmet } from 'react-helmet';

import ContactForm from '../../components/forms/contactForm';
import { Container } from './styles';

const Contacts: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>Orçamento Express - Contatos</title>
      </Helmet>
      <h1>Informações de contato</h1>
      <ContactForm />
    </Container>
  );
};

export default Contacts;

/**
 * // TODO: Criar o BOX que abraça toda a aplicação (https://prnt.sc/25h68x0) ✔️
 * // TODO: Criar Header (https://prnt.sc/25h6cnd) ✔️
 * // TODO: Criar progress component (https://prnt.sc/25h6fyr) ✔️
 * // TODO: Criar componente de botão (https://prnt.sc/25h6jo5) ✔️
 * // TODO: Criar componentes de input (https://prnt.sc/25h6p0t) ✔️
 * // TODO: Criar Form (https://prnt.sc/25h6tm3) ✔️
 */
