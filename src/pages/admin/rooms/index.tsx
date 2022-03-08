import React from 'react';
import { useToasts } from 'react-toast-notifications';

import GrayButton from '../../../components/grayButton';
import Item from '../../../components/item';
import Title from '../../../components/title';
import Requests from '../../../services/api';
import { IResponseGetRooms } from '../../../types/rooms';
import { Container } from './styles';

const AdminRooms: React.FC = () => {
  const { addToast } = useToasts();
  const [rooms, setRooms] = React.useState<IResponseGetRooms[]>();
  const [refresh, setRefresh] = React.useState<boolean>(false);
  async function getRooms() {
    const rooms = await Requests.getRooms();

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
  }, [refresh]);

  return (
    <Container>
      <Title title="Lista de ambientes" subtitle="" />
      <header>
        <h2>Nome do ambiente</h2>
        <GrayButton navigateTo="criar" />
      </header>
      <main>
        <div id="rooms-list">
          {rooms &&
            rooms.map(room => (
              <Item
                name={room.roomName}
                id={Number(room.id)}
                type="room"
                setRefresh={setRefresh}
              />
            ))}
        </div>
      </main>
    </Container>
  );
};

export default AdminRooms;
