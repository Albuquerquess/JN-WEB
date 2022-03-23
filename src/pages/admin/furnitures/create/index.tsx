import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import priceIndex3 from '../../../../assets/svg/price-3.svg';
import Button from '../../../../components/button';
import ImageButton from '../../../../components/button/imageButton';
import Grid from '../../../../components/grid';
import GrayInput from '../../../../components/input/grayInput';
import Item from '../../../../components/item';
import LowLabel from '../../../../components/label/low';
import Medium from '../../../../components/label/medium';
import Select from '../../../../components/select';
import SwitchButtom from '../../../../components/switchButtom';
import TrashButton from '../../../../components/trashButton';
import PriceIndex from '../../../../helpers/priceIndex';
import Requests from '../../../../services/api';
import {
  IParamsFurniturePage,
  IRequestCreateFurniture,
  IRequestUpdateFurniture,
  IRequestUpdateFurnitureStatus,
} from '../../../../types/furnitures';
import logger from '../../../../utils/logger';
import { Container } from './styles';

const CreateFurniture: React.FC = () => {
  const { roomId, furnitureId } =
    useParams() as unknown as IParamsFurniturePage;

  const [furnitureName, setFurnitureName] = React.useState('');
  const [initialfurnitureName, setInitialFurnitureName] = React.useState('');
  const [furnitureStatus, setFurnitureStatus] = React.useState<boolean>(false);
  const [initialFurnitureStatus, setInitialFurnitureStatus] =
    React.useState<boolean>(false);

  const [variationName, setVariationName] = React.useState('');
  const [variationFile, setVariationFile] = React.useState<File | null>(null);

  const [onCreateFurniture, setOnCreateFurniture] = React.useState(false);
  const [onEditFurniture, setOnEditFurniture] = React.useState(false);

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

      setInitialFurnitureStatus(Boolean(furniture.data.status));
      setInitialFurnitureName(furniture.data.furniture_name);
      setFurnitureStatus(Boolean(furniture.data.status));
      setFurnitureName(furniture.data.furniture_name);
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
    console.log(furnitureId);
    if (furnitureId) {
      const updateFurniture = await Requests.updateFurniture({
        id,
        roomId,
        name,
      });

      console.log({ updateFurniture });

      if (updateFurniture.error) {
        addToast(updateFurniture.messages || 'Ocorreu um erro!', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        setOnEditFurniture(false);
        setInitialFurnitureName(furnitureName);
        setInitialFurnitureStatus(furnitureStatus);

        addToast(`${furnitureName} editado com sucesso!`, {
          appearance: 'success',
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
    furnitureId,
    status,
  }: IRequestUpdateFurnitureStatus) => {
    if (furnitureId) {
      const updateFurnitureName = await Requests.updateFurnitureStatus({
        furnitureId,
        status,
      });

      console.log({ updateFurnitureName });

      if (updateFurnitureName.error) {
        addToast(updateFurnitureName.messages || 'Ocorreu um erro!', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        addToast(`${furnitureName} editado com sucesso!`, {
          appearance: 'success',
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

    if (create.error) {
      addToast(create.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      navigate(`/admin/ambientes/${roomId}`);

      addToast('Móvel criado com sucesso!', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  };

  const checkEditMode = async () => {
    if (
      !onCreateFurniture &&
      (furnitureName !== initialfurnitureName ||
        furnitureStatus !== initialFurnitureStatus)
    ) {
      logger.log('name', furnitureName !== initialfurnitureName);
      logger.log('status', furnitureStatus !== initialFurnitureStatus);
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

      setFurnitureStatus(true);
    }
  };

  React.useEffect(() => {
    verifyNavigationType();
  }, [refresh]);

  React.useEffect(() => {
    checkEditMode();
  }, [furnitureName, furnitureStatus]);

  React.useEffect(() => {
    logger.log(
      `furnitureName: [furnitureName: ${furnitureName}][furnitureStatus: ${furnitureStatus}]`,
    );
  }, [furnitureName, furnitureStatus]);

  const Variations = [
    {
      id: 1,
      variation_name: 'Portas de MDF',
      status: 1,
      variation_value: '1234.56',
      percentage_by_color: 0.2,
      pergcentage_by_laca: 0.5,
      percentage_by_tamponade: 0.4,
      variation_description:
        'Lorem anim laborum magna ad proident commodo fugiat minim. Qui ex anim veniam proident velit et cillum anim sunt anim aute. Incididunt ex elit dolor sit incididunt consectetur amet amet exercitation. Amet pariatur nostrud adipisicing ad aliqua ipsum excepteur aliqua ut nulla reprehenderit exercitation. Minim consequat duis est aute duis esse magna cupidatat eiusmod reprehenderit Lorem do. Cupidatat veniam id voluptate sunt.',
      variation_price_index: 1,
      furniture_id: furnitureId,
      variation_image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.leroymerlin.com.br%2Farmario-aereo-mdf-porta-basculante-branco-acetinado-lilies-moveis_1567068894&psig=AOvVaw0T9V3zY2V4TJChK3uEIXV-&ust=1647781722986000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCPi1mrSf0vYCFQAAAAAdAAAAABAF',
    },
    {
      id: 2,
      variation_name: 'Vidro reflecta bronze',
      status: 0,
      variation_value: '4455.66',
      percentage_by_color: 0.2,
      pergcentage_by_laca: 0.5,
      percentage_by_tamponade: 0.4,
      variation_description:
        'Excepteur minim esse sint veniam mollit in magna irure cupidatat Lorem consectetur. Ipsum dolore qui adipisicing consectetur aliquip aute. Aliquip consectetur est amet aliquip voluptate quis enim pariatur magna sit ad sint amet et.',
      variation_price_index: 3,
      furniture_id: furnitureId,
      variation_image:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Floja.madesa.com%2Farmario-aereo-madesa-reims-2-portas-de-correr-de-vidro-reflex-preto%2Fp&psig=AOvVaw1Eq6rsOMqXLwFEa_CAZSDz&ust=1647782150328000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCPCDgYCh0vYCFQAAAAAdAAAAABAG',
    },
  ];

  return (
    <Container>
      <Helmet>
        <title>Orçamento Express - Criar Móvel</title>
      </Helmet>
      <Medium label="Informações do ambiente" />

      <section id="furniture-informations">
        <Grid
          gridTemplateColumn="1fr"
          gridTemplateRows="50px"
          gapColumn="50px"
          gapRow="0"
          margin="41px 0 41px 0"
        >
          <LowLabel label="Nome do móvel" />
          {!onCreateFurniture ? (
            <Item
              name={furnitureName}
              onChangeName={setFurnitureName}
              id={Number(furnitureId)}
              roomId={Number(roomId)}
              status={furnitureStatus}
              onChangeStatus={() => {
                handleClickUpdateFurnitureStatus({
                  furnitureId,
                  status: furnitureStatus ? 'enable' : 'disable',
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
          ) : (
            <GrayInput
              mask=""
              type="text"
              placeholder=""
              value={furnitureName}
              onChangeValue={setFurnitureName}
              onInputBlur={() => {
                /*  */
              }}
              id="room-name"
            />
          )}
        </Grid>
      </section>
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
                    console.log(`edit!`);
                    handleClickUpdateFurniture({
                      id: furnitureId,
                      roomId,
                      name: furnitureName,
                    });
                  }
                : () => {
                    handleClickCreateFurniture({
                      roomId,
                      name: furnitureName,
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

      {!onCreateFurniture && (
        <section id="variations-informations">
          <Medium label="Variações do móvel" />
          <Grid
            gridTemplateColumn="repeat(2, 137px) repeat(4, 118px)"
            gridTemplateRows="50px"
            gapColumn="26px"
            gapRow="0"
            margin="41px 0 41px 0"
          >
            <GrayInput
              mask=""
              type="text"
              placeholder="Nome da variação"
              value={variationName}
              onChangeValue={setVariationName}
              onInputBlur={() => {
                /*  */
              }}
              id="room-name"
            />
            <GrayInput
              mask=""
              type="text"
              placeholder=""
              value={variationName}
              onChangeValue={setVariationName}
              onInputBlur={() => {
                /*  */
              }}
              id="room-name"
            />
            <div className="variation-price-index">
              <Select
                menuDirection="auto"
                options={[]}
                defaultValue={[][0]}
                placeholder=""
                setValue={(value: string) => console.log(value)}
              />
            </div>
            <ImageButton label="imagem" setFile={setVariationFile} />
            <TrashButton />
            <SwitchButtom
              status
              handleOnActivate={() => {
                /*   */
              }}
              handleOnDisable={() => {
                /*  */
              }}
            />
          </Grid>
        </section>
      )}
    </Container>
  );
};

export default CreateFurniture;
