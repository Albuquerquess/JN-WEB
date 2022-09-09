import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Button from '../../components/button';
import Card from '../../components/card';
import Title from '../../components/title';
import Requests from '../../services/api';
import { addRoom } from '../../store/actions/furnitures';
import logger from '../../utils/logger';
import { Container } from './styles';

interface IResponseGetRooms {
  id: string;
  url: string;
  roomName: string;
  description: string;
  status: 1 | 0;
  createdAt: Date;
  updatedAt: Date;
}

const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rooms, setRooms] = React.useState<IResponseGetRooms[]>([]);
  const { addToast } = useToasts();

  function handleClick(roomId: string, roomName: string) {
    logger.log(
      `Rooms - handleClick - [roomId: ${roomId}] [roomName: ${roomName}]`,
    );

    if (roomId && roomName) {
      dispatch(
        addRoom({
          id: String(roomId),
          name: roomName,
        }),
      );

      navigate('/contato');
    }
  }

  async function getRooms() {
    const rooms = await Requests.getActiveRooms();

    if (rooms.error) {
      addToast(rooms.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    setRooms(rooms.data);
  }

  React.useEffect(() => {
    getRooms();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Orçamento Express - Ambientes</title>
      </Helmet>
      <Title
        title="Orçar novos ambientes"
        subtitle="Escolha os móveis para a sua cozinha. Clique em adicionar e digite o comprimento que deseja."
      />
      <div id="rooms-card-container">
        {rooms &&
          rooms.map(room => (
            <Card
              image={room.url}
              description={room.description}
              title={room.roomName}
            >
              <Button
                label={`Mobilhar ${room.roomName}`}
                handleClick={() => handleClick(room.id, room.roomName)}
              />
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default Rooms;
