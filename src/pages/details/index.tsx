import React from 'react';

import Card from '../../components/card';
import Label from '../../components/label';
import Select from '../../components/select';
import { Container } from './styles';

const options = [
  { value: '1', label: <div>Chocolate</div> },
  { value: '2', label: <div>Strawberry</div> },
  { value: '3', label: <div>Vanilla</div> },
];
const Details: React.FC = () => {
  return (
    <Container>
      <Label
        label="Cores e tamponamentos"
        sublabel="Decida os detalhes dos seus móveis, a cor e o tipo de tamponamento."
      />
      <div id="card-box">
        <Card
          title="Cor dos móveis"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna."
          image="https://cdn.leroymerlin.com.br/products/armario_superior_2_portas_32x70x30cm_branco_spaceo_89565952_0001_600x600.jpg"
        >
          <Select
            menuDirection="top"
            options={options}
            defaultValue={options[0]}
            placeholder="Escolha uma cor"
            setValue={() => {
              console.log('add');
            }}
          />
        </Card>
        <Card
          title="Cor dos móveis"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna."
          image="https://cdn.leroymerlin.com.br/products/armario_superior_2_portas_32x70x30cm_branco_spaceo_89565952_0001_600x600.jpg"
        >
          <Select
            menuDirection="top"
            options={options}
            defaultValue={options[0]}
            placeholder="Escolha uma cor"
            setValue={() => {
              console.log();
            }}
          />
        </Card>
      </div>
    </Container>
  );
};

/**
 * Ver como será a separação dos Cards (https://prnt.sc/25usn7g) ✔️
 * Criar uma base do card imagem, titulo e texto (https://prnt.sc/25v0mfr) ✔️
 * Criar input (https://prnt.sc/25v7hmj)
 */

export default Details;
