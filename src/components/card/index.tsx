import React from 'react';

import { Container } from './styles';

interface IFurnitureCardProps {
  title: string;
  description: string | undefined;
  image: string | undefined;
  children: React.ReactNode | undefined;
}

const Card: React.FC<IFurnitureCardProps> = ({
  image,
  title,
  description,
  children,
}) => {
  return (
    <Container image={image}>
      <section className="card-header" />

      <section className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </section>
      <section className="children-box">{children}</section>
    </Container>
  );
};

export default Card;
