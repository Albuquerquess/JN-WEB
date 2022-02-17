import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader';
import { useToasts } from 'react-toast-notifications';

import Button from '../../components/button';
import FurnitureCard from '../../components/card/furnitureCard';
import PricePreview from '../../components/pricePreview';
import Title from '../../components/title';
import URLs from '../../helpers/URLs';
import Api from '../../services/api';
import { addRoom } from '../../store/actions/furnitures';
import { IAppState } from '../../store/types';
import { IVariation } from '../../types/furnitureCard';
import { IRoom } from '../../types/redux/furnitures';
import logger from '../../utils/logger';
import { Container } from './styles';

type furniture = {
  id: string;
  furnitureName: string;
  variations: IVariation[];
};
interface IResponseGetFurnitures {
  furnitures: furniture[];
  room: IRoom;
}

const Furnitures: React.FC = () => {
  const [furnitures, setFurnitures] = React.useState<IResponseGetFurnitures>();

  const { addToast } = useToasts();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomData = useSelector((state: IAppState) => state.furnitures.room);

  const furnituresStored = useSelector((state: IAppState) => state.furnitures);

  async function getFurnituresByRoom() {
    try {
      const response = await Api.get(URLs.getFurnitures, {
        params: {
          room_id: roomData.id,
        },
      });

      if (response.status === 200) {
        logger.log('getFurnituresByRoom', response.data);

        const { id: roomId, name: roomName } = response.data.room;

        setFurnitures(response.data);

        dispatch(
          addRoom({
            id: roomId,
            name: roomName,
          }),
        );
      }
    } catch (error) {
      alert('Não foi possível buscar os móveis do cômodo. Tente novamente.');
    }
  }

  function handleClick() {
    if (furnituresStored.selected) {
      const furnituresSelecteds = furnituresStored.selected.filter(
        selected => selected.roomId === furnitures?.room.id,
      );

      if (furnituresSelecteds.length >= 1) {
        navigate('/video');
      } else {
        addToast('Você deve escolher pelo menos 1 móvel deste ambiente', {
          appearance: 'info',
          autoDismiss: true,
        });
      }
    } else {
      addToast('Você deve escolher pelo menos 1 móvel deste ambiente', {
        appearance: 'info',
        autoDismiss: true,
      });
    }
  }

  React.useEffect(() => {
    getFurnituresByRoom();
  }, []);
  return (
    <Container>
      {furnitures ? (
        <>
          <Title
            title={`Móveis: ${furnitures.room.name}`}
            subtitle="Adicione os móveis, as medidas solicitadas de cada um e suas variações de tipo."
          />
          <div className="furniture-card-container">
            {furnitures.furnitures.map(furniture => (
              <FurnitureCard
                variations={furniture.variations}
                furniture={{
                  furnitureName: furniture.furnitureName,
                  id: furniture.id,
                }}
                room={furnitures.room}
              />
            ))}
          </div>
          <Button handleClick={() => handleClick()} />
        </>
      ) : (
        <RingLoader />
      )}
      <PricePreview />
    </Container>
  );
};

export default Furnitures;
