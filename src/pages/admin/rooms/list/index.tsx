import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import GrayButton from '../../../../components/button/grayButton';
import Item from '../../../../components/item';
import Loading from '../../../../components/loading';
import Title from '../../../../components/title';
import Requests from '../../../../services/api';
import { IResponseGetRooms } from '../../../../types/rooms';
import { Container } from './styles';

const AdminRooms: React.FC = () => {
  const { addToast } = useToasts();
  const [rooms, setRooms] = React.useState<IResponseGetRooms[]>();
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const navigate = useNavigate();

  async function getRooms() {
    const rooms = await Requests.getAllRooms();

    if (rooms.error) {
      addToast(rooms.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    setRooms(rooms.data);
  }

  function redirectToRoomPage(roomId: number) {
    if (roomId) {
      navigate(`${roomId}`);
    } else {
      addToast('Ambiente não encontrado. Entre em contato com o suporte!', {
        appearance: 'error',
        autoDismiss: false,
      });
    }
  }

  React.useEffect(() => {
    getRooms();
  }, [refresh]);

  return (
    <Container>
      <Helmet>
        <title>Orçamento Express - Admin</title>
      </Helmet>
      <Title title="Lista de ambientes" subtitle="" />
      <header>
        <h2>Nome do ambiente</h2>
        <GrayButton navigateTo="criar" label="Adicionar ambiente" />
      </header>
      <main>
        <div id="rooms-list">
          {rooms ? (
            rooms.map(room => (
              <Item
                name={room.roomName}
                id={Number(room.id)}
                roomId={undefined}
                status={Boolean(room.status)}
                type="room"
                mode="edit"
                refresh={refresh}
                setRefresh={setRefresh}
                handleClick={() => redirectToRoomPage(Number(room.id))}
                onChangeName={() => {
                  /*  */
                }}
                onChangeStatus={() => {
                  /*  */
                }}
                disabled
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </main>
    </Container>
  );
};

export default AdminRooms;
