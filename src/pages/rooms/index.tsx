import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Button from '../../components/button';
import Card from '../../components/card';
import Title from '../../components/title';
import URLs from '../../helpers/URLs';
import { Api } from '../../services/api';
import { addRoom } from '../../store/actions/furnitures';
import logger from '../../utils/logger';
import { Container } from './styles';

interface IResponseGetRooms {
  id: number;
  room_name: string;
}

const Rooms: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rooms, setRooms] = React.useState<IResponseGetRooms[]>([]);
  const { addToast } = useToasts();

  function handleClick(roomId: number, roomName: string) {
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
    const response = await Api.get<IResponseGetRooms[]>(URLs.getRooms);

    if (response.status !== 200) {
      return addToast(
        'Não foi possível buscar as informações de cor e tamponamento. Por favor tente novamente!',
        {
          appearance: 'warning',
          autoDismiss: false,
        },
      );
    }
    return setRooms(response.data);
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
              image="https://www.tuacasa.com.br/wp-content/uploads/2021/03/banheiro-bege-1.jpg "
              description="Do ullamco nisi in id exercitation pariatur aute officia dolor consectetur pariatur enim. "
              title={room.room_name}
            >
              <Button
                label={`Mobilhar ${room.room_name}`}
                handleClick={() => handleClick(room.id, room.room_name)}
              />
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default Rooms;
