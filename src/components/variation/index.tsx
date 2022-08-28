import React from 'react';
import { useToasts } from 'react-toast-notifications';

import PriceIndex from '../../helpers/priceIndex';
import Requests from '../../services/api';
import { IRequestUpdateVariationStatus } from '../../types/variations';
import { formatNumber } from '../../utils/removeSpecialChars';
import Button from '../button';
import ImageButton from '../button/imageButton';
import Grid from '../grid';
import GrayInput from '../input/grayInput';
import GrayTextarea from '../input/grayTextarea';
import LowLabel from '../label/low';
import Select from '../select';
import SwitchButtom from '../switchButtom';
import TrashButton from '../trashButton';
import { Container } from './styles';

interface IPropsVariations {
  id: number;
  title: string;
  type: 'create' | 'edit';
  status: boolean;
  value: number;
  index: number;
  description: string;
  priceIndex: number;
  furnitureId: number;
  roomId: number;
  handleCreateClick(): void;
  handleDeleteClick(): void;
  handleClickCancel(): void;
}

const Variation: React.FC<IPropsVariations> = ({
  id,
  type,
  title,
  index,
  value,
  status = true,
  description,
  furnitureId,
  roomId,
  priceIndex,
  handleCreateClick,
  handleDeleteClick,
  handleClickCancel,
}) => {
  const [variationTitle, setVariationTitle] = React.useState(title);
  const [variationDescription, setVariationDescription] =
    React.useState(description);
  const [variationValue, setVariationValue] = React.useState<string>(
    String(value),
  );
  const [variationFile, setVariationFile] = React.useState<File | null>(null);
  const [variationInitialName, setVariationInitialName] = React.useState(title);
  const [variationPriceIndex, setVariationPriceIndex] = React.useState(
    priceIndex || 1,
  );
  const [variationInitialDescription, setVariationInitialDescription] =
    React.useState(description);
  const [variationInitialValue, setVariationInitialValue] =
    React.useState<number>(value);
  const [variationInitialFile, setVariationInitialFile] =
    React.useState<File | null>(null);
  const [variationInitialPriceIndex, setVariationInitialPriceIndex] =
    React.useState(priceIndex || 1);

  const [onCancelEdit, setOnCancelEdit] = React.useState<boolean>(false);

  const [onEditVariation, setOnEditVariation] = React.useState<boolean>(false);

  const VARIATION_MAX_DESCRIPTION_LENGTH = 234;

  const { addToast } = useToasts();

  const priceIndexes = [1, 2, 3].map((priceIndex: number) => ({
    label: PriceIndex({ index: priceIndex }),
    priceIndex,
    value: String(priceIndex),
  }));

  const handleClickClear = () => {
    setOnCancelEdit(true);

    setOnEditVariation(false);
    setVariationTitle(title);
    setVariationDescription(description);
    setVariationValue(String(value));
    setVariationPriceIndex(Number(priceIndex));

    setVariationFile(null);

    setOnCancelEdit(false);

    handleClickCancel();
  };

  const handleEditVariationMode = () => {
    if (
      (type === 'edit' &&
        !onCancelEdit &&
        (variationInitialName !== variationTitle ||
          variationInitialDescription !== variationDescription ||
          String(variationInitialValue) !== String(variationValue) ||
          variationInitialFile !== variationFile)) ||
      variationInitialPriceIndex !== variationPriceIndex
    ) {
      setOnEditVariation(true);
    } else {
      setOnEditVariation(false);
    }
  };

  const defineInitialValues = () => {
    setTimeout(() => {
      setVariationInitialName(variationTitle);
      setVariationInitialDescription(variationDescription);
      setVariationInitialValue(Number(variationValue));
      setVariationInitialFile(variationFile);
      setVariationInitialPriceIndex(priceIndex);

      setOnEditVariation(false);
    }, 200);
  };

  const createVariation = async () => {
    if (variationFile) {
      const createVariationResponse = await Requests.createVariation({
        title: variationTitle,
        description: variationDescription,
        value: formatNumber(variationValue),
        file: variationFile,
        furnitureId,
        roomId,
        priceIndex: Number(variationPriceIndex),
      });
      if (createVariationResponse.error) {
        addToast(
          createVariationResponse.messages ||
            'Ocorreu um erro ao criar à variação!',
          {
            appearance: 'error',
            autoDismiss: true,
          },
        );
      } else {
        addToast('Variação criada com sucesso', {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });

        handleCreateClick();
      }
    } else {
      addToast('Selecione uma imagem para a variação', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const updateVariation = async () => {
    const update = await Requests.updateVariation({
      id,
      title: variationTitle,
      value: formatNumber(variationValue),
      priceIndex: variationPriceIndex,
      description: variationDescription,
    });

    if (update.error) {
      addToast(update.messages || 'Erro ao atualizar status da variação!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      addToast(`${title || `Variação`} atualizado com sucesso!`, {
        appearance: 'success',
        autoDismiss: true,
      });
      defineInitialValues();
    }
  };

  const updateVariationStatus = async ({
    id,
    status,
  }: IRequestUpdateVariationStatus) => {
    if (type === 'edit') {
      const updateStatus = await Requests.updateVariationStatus({
        id,
        status,
      });

      if (updateStatus.error) {
        addToast(
          updateStatus.messages || 'Erro ao atualizar status da variação!',
          {
            appearance: 'error',
            autoDismiss: true,
          },
        );
      } else {
        addToast(
          `Status ${
            `de ${title}` || 'da Variação'
          } atualizado com sucesso para ${status ? 'Ativo' : 'Inativo'}`,
          {
            appearance: 'success',
            autoDismiss: true,
          },
        );
      }
    }
  };

  const handleClickDeleteVariation = async () => {
    if (type === 'edit') {
      const deleteVariation = await Requests.deleteVariation(id);

      if (deleteVariation.error) {
        addToast(deleteVariation.messages || 'Erro ao deletar variação!', {
          appearance: 'error',
          autoDismiss: true,
        });
      } else {
        addToast(`${title || `Variação`} deletado(a) com sucesso!`, {
          appearance: 'success',
          autoDismiss: true,
        });

        handleDeleteClick();
      }
    }
  };

  React.useEffect(() => {
    defineInitialValues();
  }, []);

  React.useEffect(() => {
    handleEditVariationMode();
  }, [
    variationTitle,
    variationDescription,
    variationValue,
    variationFile,
    variationPriceIndex,
  ]);

  React.useEffect(() => {
    console.log(variationPriceIndex);
  }, [variationPriceIndex]);

  return (
    <Container>
      <hr />
      <LowLabel label={`Titulo da variação ${index}`} />

      <Grid
        gridTemplateColumn="1fr"
        gridTemplateRows="50px"
        gapColumn="26px"
        gapRow="0"
        margin="20px 0 20px 0"
      >
        <GrayInput
          mask=""
          type="text"
          placeholder=""
          value={variationTitle}
          onChangeValue={setVariationTitle}
          onInputBlur={() => {
            /*  */
          }}
          id=""
        />
      </Grid>

      <LowLabel label={`Valor da variação ${index}`} />
      <Grid
        gridTemplateColumn={
          type === 'create' ? '1fr repeat(2, 118px)' : '1fr repeat(4, 118px)'
        }
        gridTemplateRows="50px"
        gapColumn="26px"
        gapRow="0"
        margin="41px 0 41px 0"
      >
        <GrayInput
          mask="R$ ****,**"
          type="text"
          placeholder=""
          value={String(variationValue)}
          onChangeValue={(e: string) => {
            if (variationValue === '0') {
              const valueFormated = e.replace('0', '');
              setVariationValue(valueFormated);
            } else {
              setVariationValue(e);
            }
          }}
          onInputBlur={() => {
            /*  */
          }}
          id="room-name"
        />
        <div className="variation-price-index">
          <Select
            menuDirection="auto"
            options={priceIndexes}
            defaultValue={
              priceIndexes.find(
                priceIndex => Number(priceIndex.value) === variationPriceIndex,
              ) || priceIndexes[0]
            }
            placeholder=""
            setValue={(value: string) => setVariationPriceIndex(Number(value))}
          />
        </div>
        <ImageButton label="imagem" setFile={setVariationFile} />
        {type === 'edit' && (
          <>
            <TrashButton handleClick={handleClickDeleteVariation} />
            <SwitchButtom
              status={type === 'edit' ? status : true}
              handleOnActivate={() => {
                updateVariationStatus({ id, status: true });
              }}
              handleOnDisable={() => {
                updateVariationStatus({ id, status: false });
              }}
            />
          </>
        )}
      </Grid>
      <LowLabel label={`Descrição da variação ${index}`} />
      <Grid
        gridTemplateColumn="1fr"
        gridTemplateRows="96px"
        gapColumn="26px"
        gapRow="0"
        margin="41px 0 41px 0"
      >
        <GrayTextarea
          id=""
          value={variationDescription}
          placeholder=""
          onChangeValue={setVariationDescription}
          maxLength={VARIATION_MAX_DESCRIPTION_LENGTH}
          onInputBlur={() => {
            /*  */
          }}
        />
      </Grid>
      {(type === 'create' || onEditVariation) && (
        <Grid
          gridTemplateColumn="1fr 1fr"
          gridTemplateRows="50px"
          gapColumn="50px"
          gapRow="0"
          margin="20px 0 20px 0"
        >
          <Button
            label="Salvar"
            handleClick={
              type === 'edit'
                ? () => {
                    updateVariation();
                  }
                : () => {
                    createVariation();
                  }
            }
          />
          <Button
            background="#d5d5d5"
            color="#000000"
            handleClick={handleClickClear}
            label="Cancelar"
          />
        </Grid>
      )}
    </Container>
  );
};

export default Variation;
