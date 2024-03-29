import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Button from '../../../../components/button';
import GrayButton from '../../../../components/button/grayButton';
import Grid from '../../../../components/grid';
import GrayInput from '../../../../components/input/grayInput';
import Item from '../../../../components/item';
import LowLabel from '../../../../components/label/low';
import Medium from '../../../../components/label/medium';
import Loading from '../../../../components/loading';
import Variation from '../../../../components/variation';
import Requests from '../../../../services/api';
import {
  IParamsFurniturePage,
  IRequestCreateFurniture,
  IRequestUpdateFurniture,
  IRequestUpdateFurnitureStatus,
} from '../../../../types/furnitures';
import { IVariation } from '../../../../types/variations';
import logger from '../../../../utils/logger';
import { Container } from './styles';

const CreateFurniture: React.FC = () => {
  const { roomId, furnitureId } =
    useParams() as unknown as IParamsFurniturePage;

  const [furnitureName, setFurnitureName] = React.useState('');
  const [variationLabel, setVariationLabel] = React.useState('');
  const [initialfurnitureName, setInitialFurnitureName] = React.useState('');
  const [furnitureStatus, setFurnitureStatus] = React.useState<boolean>(false);
  const [initialFurnitureStatus, setInitialFurnitureStatus] =
    React.useState<boolean>(false);

  // Variations
  const [onCreateFurniture, setOnCreateFurniture] = React.useState(false);
  const [onEditFurniture, setOnEditFurniture] = React.useState(false);
  const [variations, setVariations] = React.useState<IVariation[]>([]);
  const [createVariations, setCreateVariations] = React.useState<
    IVariation[] | null
  >(null);

  const [refresh, setRefresh] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const { addToast } = useToasts();

  const getFurnitureById = async ({
    furnitureId,
    roomId,
  }: IParamsFurniturePage) => {
    setLoading(true);

    const furniture = await Requests.getFurnituresById({ furnitureId, roomId });

    if (furniture.error) {
      addToast(furniture.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (!furniture.data) {
      addToast('Móvel não existe ou não pertence ao ambiente selecionado!', {
        appearance: 'error',
        autoDismiss: true,
        onDismiss: () => navigate(`/admin/ambientes/${roomId}`),
      });
    } else {
      logger.log('edit furniture mode ON!');

      const variations = await Requests.getVariationsByFurnitureId({
        furnitureId,
        roomId,
      });

      if (variations.error) {
        addToast(furniture.messages || 'Ocorreu um erro!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }

      setVariations(
        variations.data.map((variation: IVariation) => ({
          ...variation,
          type: 'create',
        })),
      );

      setInitialFurnitureStatus(Boolean(furniture.data.status));
      setInitialFurnitureName(furniture.data.furniture_name);
      setFurnitureStatus(Boolean(furniture.data.status));
      setFurnitureName(furniture.data.furniture_name);
      setVariationLabel(furniture.data.variation_label);

      setLoading(false);
    }
  };

  const handleClickCancel = () => {
    return navigate('/admin/ambientes');
  };

  const popCreatedVariation = () => {
    setCreateVariations(null);
  };

  const redirectToRooms = () => {
    navigate('/admin/ambientes');
  };

  const handleClickUpdateFurniture = async ({
    id,
    roomId,
    name,
  }: IRequestUpdateFurniture) => {
    if (furnitureId) {
      const updateFurniture = await Requests.updateFurniture({
        id,
        roomId,
        name,
      });

      logger.log(`[updateFurniture - ${updateFurniture}]`);

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
    variationLabel,
  }: IRequestCreateFurniture) => {
    if (!name) {
      addToast('Por favor, preencha o nome do móvel!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (!variationLabel) {
      addToast(
        'Por favor, preencha o nome do tipo de variação que o móvel terá!',
        {
          appearance: 'error',
          autoDismiss: true,
        },
      );
    } else {
      const create = await Requests.createFurniture({
        roomId,
        name,
        variationLabel,
      });

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

  const handleClickCreateVariationCard = () => {
    if (!createVariations) {
      setCreateVariations([
        {
          id: 0,
          title: '',
          value: 0,
          status: 1,
          priceIndex: 0,
          imageSrc: '',
          description: '',
          furnitureId: 0,
          roomId: 0,
          percentageByColor: 0,
          percentageByLaca: 0,
          percentageByTamponade: 0,
        },
      ]);
    }
  };

  React.useEffect(() => {
    verifyNavigationType();
  }, [refresh]);

  React.useEffect(() => {
    checkEditMode();
  }, [furnitureName, furnitureStatus]);

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
              setRefresh={redirectToRooms}
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
        <Grid
          gridTemplateColumn="1fr"
          gridTemplateRows="50px"
          gapColumn="50px"
          gapRow="0"
          margin="41px 0 41px 0"
        >
          <LowLabel label="Nome do tipo de variações do móvel" />

          <GrayInput
            mask=""
            type="text"
            placeholder=""
            value={variationLabel}
            onChangeValue={setVariationLabel}
            onInputBlur={() => {
              /*  */
            }}
            id="room-name"
          />
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
                      variationLabel,
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
          <LowLabel label="Titulo das variações" />

          <Grid
            gridTemplateColumn="1fr 262px"
            gridTemplateRows="50px"
            gapColumn="26px"
            gapRow="0"
            margin="20px 0 41px 0"
          >
            <GrayInput
              mask=""
              type="text"
              placeholder=""
              value={variationLabel}
              onChangeValue={setVariationLabel}
              onInputBlur={() => {
                /*  */
              }}
              id="room-name"
            />
            <GrayButton
              label="Adicionar variação"
              handleClick={handleClickCreateVariationCard}
            />
          </Grid>

          {!loading &&
            variations.length > 0 &&
            variations.map((variation, index: number) => (
              <Variation
                id={Number(variation.id)}
                type="edit"
                index={index + 1}
                title={variation.title}
                value={Number(variation.value)}
                description={variation.description}
                status={Boolean(variation.status)}
                furnitureId={furnitureId}
                roomId={roomId}
                priceIndex={Number(variation.priceIndex)}
                handleCreateClick={() => {
                  /*  */
                }}
                handleDeleteClick={() => {
                  getFurnitureById({ furnitureId, roomId });
                }}
                handleClickCancel={() => {
                  /*  */
                }}
              />
            ))}

          {!loading &&
            createVariations &&
            createVariations.length > 0 &&
            createVariations.map(variation => (
              <Variation
                id={Number(variation.id)}
                type="create"
                index={variations.length + 1}
                title={variation.title}
                value={Number(variation.value)}
                description={variation.description}
                status={Boolean(variation.status)}
                furnitureId={furnitureId}
                roomId={roomId}
                priceIndex={variation.priceIndex}
                handleCreateClick={() => {
                  getFurnitureById({ furnitureId, roomId });
                  popCreatedVariation();
                }}
                handleDeleteClick={() => {
                  /*  */
                }}
                handleClickCancel={() => {
                  popCreatedVariation();
                }}
              />
            ))}

          {loading && <Loading />}
        </section>
      )}
    </Container>
  );
};

export default CreateFurniture;
