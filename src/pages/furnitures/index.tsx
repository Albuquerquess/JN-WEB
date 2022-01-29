import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../components/button';
import FurnitureCard from '../../components/card/furnitureCard';
import PricePreview from '../../components/pricePreview';
import Title from '../../components/title';
import { addRoom } from '../../store/actions/furnitures';
import { Container } from './styles';

const Furnitures: React.FC = () => {
  const [furnitures, setFurnitures] = React.useState({});
  const dispatch = useDispatch();
  const fakePayload = {
    furnitures: [
      {
        id: '7',
        furnitureName: 'Armários inferiores',
        variations: [
          {
            id: '13',
            variation_name: 'variação Armários inferiores 1',
            variation_description:
              'No nível organizacional, a interoperabilidade de hardware imponha um obstáculo ao upgrade para novas versões da gestão de risco. Evidentemente, a utilização de SSL nas transações comerciais assume importantes níveis de uptime das formas de ação. Pensando mais a longo prazo, o índice de utilização do sistema deve passar por alterações no escopo das janelas de tempo disponíveis.',
            variation_price_index: 2,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '7',
            created_at: '2022-01-26T22:05:38.000Z',
          },
          {
            id: '14',
            variation_name: 'variação Armários inferiores 2',
            variation_description:
              'No nível organizacional, a interoperabilidade de hardware imponha um obstáculo ao upgrade para novas versões da gestão de risco. Evidentemente, a utilização de SSL nas transações comerciais assume importantes níveis de uptime das formas de ação. Pensando mais a longo prazo, o índice de utilização do sistema deve passar por alterações no escopo das janelas de tempo disponíveis.',
            variation_price_index: 3,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '7',
            created_at: '2022-01-26T22:05:38.000Z',
          },
        ],
      },
      {
        id: '8',
        furnitureName: 'Buffet',
        variations: [
          {
            id: '15',
            variation_name: 'variação Buffet 1',
            variation_description:
              'No nível organizacional, a interoperabilidade de hardware imponha um obstáculo ao upgrade para novas versões da gestão de risco. Evidentemente, a utilização de SSL nas transações comerciais assume importantes níveis de uptime das formas de ação. Pensando mais a longo prazo, o índice de utilização do sistema deve passar por alterações no escopo das janelas de tempo disponíveis.',
            variation_price_index: 1,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '8',
            created_at: '2022-01-26T22:05:38.000Z',
          },
          {
            id: '16',
            variation_name: 'variação Buffet 2',
            variation_description:
              'No nível organizacional, a interoperabilidade de hardware imponha um obstáculo ao upgrade para novas versões da gestão de risco. Evidentemente, a utilização de SSL nas transações comerciais assume importantes níveis de uptime das formas de ação. Pensando mais a longo prazo, o índice de utilização do sistema deve passar por alterações no escopo das janelas de tempo disponíveis.',
            variation_price_index: 3,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '8',
            created_at: '2022-01-26T22:05:38.000Z',
          },
          {
            id: '17',
            variation_name: 'variação Buffet 3',
            variation_description:
              'No nível organizacional, a interoperabilidade de hardware imponha um obstáculo ao upgrade para novas versões da gestão de risco. Evidentemente, a utilização de SSL nas transações comerciais assume importantes níveis de uptime das formas de ação. Pensando mais a longo prazo, o índice de utilização do sistema deve passar por alterações no escopo das janelas de tempo disponíveis.',
            variation_price_index: 2,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '8',
            created_at: '2022-01-26T22:05:38.000Z',
          },
        ],
      },
    ],
    room: {
      id: '3',
      name: 'Quarto',
    },
  };

  React.useEffect(() => {
    dispatch(
      addRoom({
        id: fakePayload.room.id,
        name: fakePayload.room.name,
      }),
    );
  }, []);
  return (
    <Container>
      <Title
        title="Móveis: Cozinha"
        subtitle="Adicione os móveis, as medidas solicitadas de cada um e suas variações de tipo."
      />
      <div className="furniture-card-container">
        {fakePayload.furnitures.map(furniture => (
          <FurnitureCard
            variations={furniture.variations}
            furniture={{
              furnitureName: furniture.furnitureName,
              id: furniture.id,
            }}
            room={fakePayload.room}
          />
        ))}
      </div>
      <Button />
      <PricePreview />
    </Container>
  );
};

export default Furnitures;
