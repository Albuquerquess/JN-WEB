import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Button from '../../../../components/button';
import Grid from '../../../../components/grid';
import Item from '../../../../components/item';
import Medium from '../../../../components/label/medium';
import Requests from '../../../../services/api';
import {
  IParamsFurniturePage,
  IRequestCreateFurniture,
  IRequestUpdateFurniture,
  IRequestUpdateFurnitureStatus,
} from '../../../../types/furnitures';
import logger from '../../../../utils/logger';
import { Container } from './styles';

interface IResponseGetFurniture {
  furniture_name: string;
  room_id: number;
  status: boolean;
}

const CreateFurniture: React.FC = () => {
  const { roomId, furnitureId } =
    useParams() as unknown as IParamsFurniturePage;

  const [onCreateFurniture, setOnCreateFurniture] = React.useState(false);
  const [onEditFurniture, setOnEditFurniture] = React.useState(false);
  const [furniture, setFurniture] = React.useState<IResponseGetFurniture>({
    furniture_name: '',
    room_id: roomId,
    status: false,
  });
  const [initialFurniture, setInitialFurniture] =
    React.useState<IResponseGetFurniture>({
      furniture_name: '',
      room_id: roomId,
      status: false,
    });
  const [refresh, setRefresh] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const { addToast } = useToasts();

  const getFurnitureById = async ({
    furnitureId,
    roomId,
  }: IParamsFurniturePage) => {
    const furniture = await Requests.getFurnituresById({ furnitureId, roomId });

    if (furniture.error) {
      addToast(furniture.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (!furniture.data) {
      addToast('Móvel nao existe ou nao pertence ao ambiente selecionado!', {
        appearance: 'error',
        autoDismiss: true,
        onDismiss: () => navigate(`/admin/ambientes/${roomId}`),
      });
    } else {
      logger.log('edit furniture mode ON!');

      setFurniture({
        ...furniture.data,
        status: Boolean(furniture.data.status),
      });

      setInitialFurniture({
        ...furniture.data,
        status: Boolean(furniture.data.status),
      });
    }
  };

  const handleClickCancel = () => {
    return navigate('/admin/ambientes');
  };

  const handleClickUpdateFurniture = async ({
    id,
    roomId,
    name,
  }: IRequestUpdateFurniture) => {
    if (furnitureId) {
      const updateFurnitureName = await Requests.updateFurniture({
        id,
        roomId,
        name,
      });

      if (updateFurnitureName.error) {
        addToast(updateFurnitureName.messages || 'Ocorreu um erro!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    } else {
      addToast(
        'Móvel do ambiente nao identificado. Por favor, recarregue a pagina e tente novamente!',
        {
          appearance: 'error',
          autoDismiss: true,
          onDismiss: () => navigate(`/admin/ambientes/${roomId}`),
        },
      );
    }
  };

  const handleClickUpdateFurnitureStatus = async ({
    id,
    status,
  }: IRequestUpdateFurnitureStatus) => {
    if (furnitureId) {
      const updateFurnitureName = await Requests.updateFurnitureStatus({
        id,
        status,
      });

      if (updateFurnitureName.error) {
        addToast(updateFurnitureName.messages || 'Ocorreu um erro!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    } else {
      addToast(
        'Móvel do ambiente nao identificado. Por favor, recarregue a pagina e tente novamente!',
        {
          appearance: 'error',
          autoDismiss: true,
          onDismiss: () => navigate(`/admin/ambientes/${roomId}`),
        },
      );
    }
  };

  const handleClickCreateFurniture = async ({
    roomId,
    name,
  }: IRequestCreateFurniture) => {
    const create = await Requests.createFurniture({ roomId, name });
  };

  const verifyEditMode = async () => {
    if (
      !onCreateFurniture &&
      furniture &&
      initialFurniture &&
      (furniture.furniture_name !== initialFurniture.furniture_name ||
        furniture.status !== initialFurniture.status)
    ) {
      logger.log(
        'name',
        furniture.furniture_name === initialFurniture.furniture_name,
      );
      logger.log('status', furniture.status === initialFurniture.status);
      setOnEditFurniture(true);
    } else {
      setOnEditFurniture(false);
    }
  };

  const verifyNavigationType = async () => {
    if (furnitureId) {
      getFurnitureById({ furnitureId, roomId });
    } else {
      logger.log('create furniture mode ON!');
      setOnCreateFurniture(true);
      setOnEditFurniture(false);

      setFurniture({ ...furniture, status: true });
    }
  };

  React.useEffect(() => {
    verifyNavigationType();
  }, []);

  React.useEffect(() => {
    verifyEditMode();
  }, [furniture, initialFurniture]);

  React.useEffect(() => {
    logger.log('furniture', furniture);
  }, [furniture]);

  return (
    <Container>
      <Helmet>
        <title>Orçamento Express - Criar Móvel</title>
      </Helmet>
      <Medium label="Informações do ambiente" />

      <div id="furniture-informations">
        <Item
          name={furniture?.furniture_name || ''}
          onChangeName={(furitureName: string) =>
            setFurniture({ ...furniture, furniture_name: furitureName })
          }
          id={Number(furnitureId)}
          roomId={Number(roomId)}
          status={furniture.status ? furniture.status : !!onCreateFurniture}
          onChangeStatus={(status: boolean) => {
            const statusFormated = status ? 'enable' : 'disable';
            handleClickUpdateFurnitureStatus({
              id: furnitureId,
              status: statusFormated,
            });
          }}
          mode={onEditFurniture ? 'edit' : 'create'}
          type="furniture"
          refresh={refresh}
          setRefresh={setRefresh}
          disabled={false}
          handleClick={() => {
            /*  */
          }}
        />
      </div>
      {(onEditFurniture || onCreateFurniture) && (
        <Grid
          gridTemplateColumn="1fr 1fr"
          gridTemplateRows="50px"
          gapColumn="50px"
          gapRow="0"
          margin="20px 0 20px 0"
        >
          <Button
            label={onEditFurniture ? 'Salvar edição' : 'Salvar'}
            handleClick={
              onEditFurniture
                ? () => {
                    if (furniture) {
                      handleClickUpdateFurniture({
                        id: furnitureId,
                        roomId,
                        name: furniture.furniture_name,
                      });
                    }
                  }
                : () => {
                    handleClickCreateFurniture({
                      roomId,
                      name: furniture.furniture_name,
                    });
                  }
            }
          />
          <Button
            background="#d5d5d5"
            color="#000000"
            handleClick={handleClickCancel}
            label="Cancelar"
          />
        </Grid>
      )}
    </Container>
  );
};

export default CreateFurniture;
