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
