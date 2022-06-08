import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Button from '../../components/button';
import FurnitureCard from '../../components/card/furnitureCard';
import Loading from '../../components/loading';
import PricePreview from '../../components/pricePreview';
import Title from '../../components/title';
import Requests from '../../services/api';
import { IAppState } from '../../store/types';
import { IVariation } from '../../types/furnitureCard';
import { Container } from './styles';

type IFurnitures = {
  id: number;
  furnitureName: string;
  status: 1 | 0;
  roomId: number;
  variations: IVariation[];
};

const Furnitures: React.FC = () => {
  const [furnitures, setFurnitures] = React.useState<IFurnitures[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { addToast } = useToasts();

  const navigate = useNavigate();
  const currentRoom = useSelector((state: IAppState) => state.furnitures.room);

  const furnituresStored = useSelector((state: IAppState) => state.furnitures);

  async function getFurnituresByRoom() {
    setLoading(true);
    const furnitures = await Requests.getFurnituresByRoomId({
      roomId: Number(currentRoom.id),
      getActive: true,
    });

    if (furnitures.error) {
      addToast(furnitures.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
        onDismiss: () => {
          navigate('/admin/ambientes');
        },
      });
    }

    setFurnitures(furnitures.data);
    setLoading(false);
  }

  function handleClick() {
    if (furnituresStored.selected) {
      const furnituresSelecteds = furnituresStored.selected.filter(
        selected => selected.roomId === currentRoom.id,
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
      {furnitures.length > 0 && !loading && (
        <>
          <Title
            title={`Móveis: ${currentRoom.name}`}
            subtitle="Adicione os móveis, as medidas solicitadas de cada um e suas variações de tipo."
          />
          <div className="furniture-card-container">
            {furnitures &&
              furnitures.map(furniture => (
                <FurnitureCard
                  variations={furniture.variations}
                  furniture={{
                    furnitureName: furniture.furnitureName,
                    id: String(furniture.id),
                  }}
                  room={currentRoom}
                />
              ))}
          </div>
          <Button handleClick={() => handleClick()} />
        </>
      )}
      {furnitures.length === 0 && loading && <Loading />}
      {furnitures && furnitures.length === 0 && !loading && (
        <>
          <h1>Não existem moveis cadastrado nesse ambiente!</h1>
          <Link to="/ambientes">Voltar para a pagina de ambientes.</Link>
        </>
      )}
      <PricePreview />
    </Container>
  );
};

export default Furnitures;
