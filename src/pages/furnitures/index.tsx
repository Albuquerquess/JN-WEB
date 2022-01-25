import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../components/button';
import FurnitureCard from '../../components/card/furnitureCard';
import Title from '../../components/title';
import { addRoom } from '../../store/actions/furnitures';
import { Container } from './styles';

const Furnitures: React.FC = () => {
  const [furnitures, setFurnitures] = React.useState({});
  const dispatch = useDispatch();
  const fakePayload = {
    furnitures: [
      {
        id: '1',
        furnitureName: 'Buffet',
        variations: [
          {
            id: '1',
            variation_name: 'variação Buffet 1',
            variation_description:
              'Estes armários serão apropriados para toda a parte de louça, copos e travessas, podendo comportar também um micro-ondas.',
            variation_price_index: 1,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '1',
            created_at: '2022-01-24T05:58:09.000Z',
          },
          {
            id: '2',
            variation_name: 'variação Buffet 2',
            variation_description:
              'Estes armários serão apropriados para toda a parte de louça, copos e travessas, podendo comportar também um micro-ondas.',
            variation_price_index: 3,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '1',
            created_at: '2022-01-24T05:58:09.000Z',
          },
          {
            id: '3',
            variation_name: 'variação Buffet 3',
            variation_description:
              'Estes armários serão apropriados para toda a parte de louça, copos e travessas, podendo comportar também um micro-ondas.',
            variation_price_index: 2,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '1',
            created_at: '2022-01-24T05:58:09.000Z',
          },
        ],
      },
      {
        id: '2',
        furnitureName: 'Armários inferiores',
        variations: [
          {
            id: '4',
            variation_name: 'variação Armários inferiores 1',
            variation_description:
              'Estes armários serão apropriados para toda a parte de louça, copos e travessas, podendo comportar também um micro-ondas.',
            variation_price_index: 2,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '2',
            created_at: '2022-01-24T05:58:09.000Z',
          },
          {
            id: '5',
            variation_name: 'variação Armários inferiores 2',
            variation_description:
              'Estes armários serão apropriados para toda a parte de louça, copos e travessas, podendo comportar também um micro-ondas.',
            variation_price_index: 3,
            variation_image: 'https://i.imgur.com/JwtDO2x.jpeg',
            furniture_id: '2',
            created_at: '2022-01-24T05:58:09.000Z',
          },
        ],
      },
    ],
    room: {
      id: '1',
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
    </Container>
  );
};

export default Furnitures;
