import React from 'react';
import { Helmet } from 'react-helmet';
import {
  useLocation,
  useNavigate,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Button from '../../../../components/button';
import ImageButton from '../../../../components/button/imageButton';
import Grid from '../../../../components/grid';
import GrayInput from '../../../../components/input/grayInput';
import GrayTextarea from '../../../../components/input/grayTextarea';
import LowLabel from '../../../../components/label/low';
import Title from '../../../../components/title';
import Requests from '../../../../services/api';
import { IResponseGetRooms } from '../../../../types/rooms';
import { Container } from './styles';

const CreateRoom: React.FC = () => {
  const [roomImage, setRoomImage] = React.useState<File | null>(null);
  const [roomName, setRoomName] = React.useState<string>('');
  const [roomNameInitial, setRoomNameInitial] = React.useState<string>('');
  const [roomDescription, setRoomDescription] = React.useState<string>('');
  const [roomDescriptionInitial, setRoomDescriptionInitial] =
    React.useState<string>('');
  const [roomExists, setRoomExists] = React.useState<boolean>(false);
  const [onEditRoom, setOnEditRoom] = React.useState<boolean>(false);
  const [onCreateRoom, setOnCreateRoom] = React.useState<boolean>(false);

  const location = useLocation();
  const currentPathSplit = location.pathname.split('/');
  const param = currentPathSplit[currentPathSplit.length - 1];

  const navigate = useNavigate();
  const { addToast } = useToasts();

  const handleClickCancel = () => {
    return navigate('/admin/ambientes');
  };

  const handleClickCreateRoom = async () => {
    if (roomImage) {
      const create = await Requests.createRoom({
        name: roomName,
        description: roomDescription,
        file: roomImage,
      });

      if (create && create.error) {
        addToast(create.messages || 'Ocorreu um erro!', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        addToast(`${roomName} Criado(a) com sucesso!`, {
          appearance: 'success',
          autoDismiss: true,
        });

        navigate(`/admin/ambientes`);
      }
    } else {
      addToast('Você deve selecionar uma imagem do ambiente!', {
        appearance: 'info',
        autoDismiss: true,
      });
    }
  };

  const handleClickUpdateRoom = async (roomId: string) => {
    if ((onEditRoom && !roomImage) || roomImage) {
      const update = await Requests.updateRoom({
        name: roomNameInitial !== roomName && roomName,
        description: roomDescription,
        file: roomImage,
        id: Number(roomId),
      });

      if (update && update.error) {
        addToast(update.messages || 'Ocorreu um erro!', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        addToast(`${roomName} Atualizado(a) com sucesso!`, {
          appearance: 'success',
          autoDismiss: true,
        });

        setRoomNameInitial(roomName);
        setRoomDescriptionInitial(roomDescription);
        setOnEditRoom(false);
      }
    } else {
      addToast('Você deve selecionar uma imagem do ambiente!', {
        appearance: 'info',
        autoDismiss: true,
      });
    }
  };

  const getRoomById = async (id: string) => {
    const rooms = await Requests.getRooms();

    if (rooms && rooms.error) {
      addToast(rooms.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    const [room]: IResponseGetRooms[] = rooms.data.filter(
      (room: IResponseGetRooms) => room.id === id,
    );

    if (!room) {
      addToast(
        'Ambiente não encontrado. Você será redirecionado para a página principal.',
        {
          appearance: 'error',
          autoDismiss: true,
          onDismiss: () => {
            navigate('/admin/ambientes');
          },
        },
      );
    }

    setRoomNameInitial(room.roomName);
    setRoomDescriptionInitial(room.description);
    setRoomName(room.roomName);
    setRoomDescription(room.description);
    setTimeout(() => {
      setRoomExists(true);
    }, 200);
  };

  React.useEffect(() => {
    console.log(param);
    if (Number(param)) {
      getRoomById(param);
    } else if (param === 'criar') {
      setOnCreateRoom(true);
    }
  }, []);

  React.useEffect(() => {
    if (roomExists) {
      if (
        roomName !== roomNameInitial ||
        roomDescription !== roomDescriptionInitial
      ) {
        setOnEditRoom(true);
      } else {
        setOnEditRoom(false);
      }
    }
  }, [roomName, roomDescription]);

  return (
    <Container>
      <Helmet>
        <title>Orçamento Express - Criar ambiente</title>
      </Helmet>
      <header>
        <Title title="Informações do ambiente" subtitle="" />
      </header>
      <main>
        <LowLabel label="Título" />
        <Grid
          gridTemplateColumn="1fr 262px"
          gridTemplateRows="50px"
          gapColumn="26px"
          gapRow="0"
          margin="0 0 20px 0"
        >
          <div className="input">
            <GrayInput
              mask=""
              type="text"
              placeholder="Ex.: Cozinha"
              onChangeValue={setRoomName}
              value={roomName}
              onInputBlur={() => {
                /*  */
              }}
              id="room-name"
            />
          </div>
          <ImageButton
            label={
              // eslint-disable-next-line no-nested-ternary
              onCreateRoom
                ? 'Selecione uma imagem'
                : onEditRoom
                ? 'Atualizar imagem'
                : 'Imagem selecionada'
            }
            setFile={setRoomImage}
          />
        </Grid>
        <LowLabel label="Descrição" />

        <Grid
          gridTemplateColumn="1fr"
          gridTemplateRows="95px"
          gapColumn="0"
          gapRow="0"
          margin="0"
        >
          <GrayTextarea
            value={roomDescription}
            placeholder="Descrição..."
            onChangeValue={setRoomDescription}
            onInputBlur={() => {
              /*  */
            }}
            id="room-description"
          />
        </Grid>

        <Grid
          gridTemplateColumn="1fr 1fr"
          gridTemplateRows="50px"
          gapColumn="50px"
          gapRow="0"
          margin="20px 0 0 0"
        >
          {(onEditRoom || onCreateRoom) && (
            <>
              <Button
                label={onEditRoom ? 'Salvar edição' : 'Salvar'}
                handleClick={
                  onEditRoom
                    ? () => {
                        handleClickUpdateRoom(param);
                      }
                    : handleClickCreateRoom
                }
              />
              <Button
                background="#d5d5d5"
                color="#000000"
                handleClick={handleClickCancel}
                label="Cancelar"
              />
            </>
          )}
        </Grid>
      </main>
    </Container>
  );
};

export default CreateRoom;
