import React from 'react';
import { useToasts } from 'react-toast-notifications';

import Requests from '../../services/api';
import { IRequestUpdateVariationStatus } from '../../types/variations';
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
  handleCreateClick(): void;
}

const Variation: React.FC<IPropsVariations> = ({
  id,
  type,
  title,
  index,
  value,
  status = true,
  description,
  handleCreateClick,
}) => {
  const [variationTitle, setVariationTitle] = React.useState(title);
  const [variationDescription, setVariationDescription] =
    React.useState(description);
  const [variationValue, setVariationValue] = React.useState<number>(value);
  const [variationFile, setVariationFile] = React.useState<File | null>(null);
  const [variationInitialName, setVariationInitialName] = React.useState(title);
  const [variationInitialDescription, setVariationInitialDescription] =
    React.useState(description);
  const [variationInitialValue, setVariationInitialValue] =
    React.useState<number>(value);
  const [variationInitialFile, setVariationInitialFile] =
    React.useState<File | null>(null);
  const [onCancelEdit, setOnCancelEdit] = React.useState<boolean>(false);

  const [onEditVariation, setOnEditVariation] = React.useState<boolean>(false);

  const { addToast } = useToasts();

  const handleClickCancel = () => {
    setOnCancelEdit(true);

    setOnEditVariation(false);
    setVariationTitle(title);
    setVariationDescription(description);
    setVariationValue(value);

    setVariationFile(null);

    setOnCancelEdit(false);
  };

  const handleEditFurnitureMode = () => {
    if (
      type === 'edit' &&
      !onCancelEdit &&
      (variationInitialName !== variationTitle ||
        variationInitialDescription !== variationDescription ||
        variationInitialValue !== variationValue ||
        variationInitialFile !== variationFile)
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
      setVariationInitialValue(variationValue);
      setVariationInitialFile(variationFile);

      setOnEditVariation(false);
    }, 200);
  };

  const updateVariation = async () => {
    const update = await Requests.updateVariation({
      id,
      title: variationTitle,
      value: variationValue,
      priceIndex: 1,
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
        `Status ${`de ${title}` || 'da Variação'} atualizado com sucesso para ${
          status ? 'Ativo' : 'Inativo'
        }`,
        {
          appearance: 'success',
          autoDismiss: true,
        },
      );
    }
  };

  React.useEffect(() => {
    defineInitialValues();
  }, []);

  React.useEffect(() => {
    handleEditFurnitureMode();
  }, [variationTitle, variationDescription, variationValue, variationFile]);

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
        gridTemplateColumn="1fr repeat(4, 118px)"
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
          onChangeValue={setVariationValue}
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
          status={status}
          handleOnActivate={() => {
            updateVariationStatus({ id, status: true });
          }}
          handleOnDisable={() => {
            updateVariationStatus({ id, status: false });
          }}
        />
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
          onInputBlur={() => {
            /*  */
          }}
        />
      </Grid>
      {onEditVariation && (
        <Grid
          gridTemplateColumn="1fr 1fr"
          gridTemplateRows="50px"
          gapColumn="50px"
          gapRow="0"
          margin="20px 0 20px 0"
        >
          <Button
            label={type === 'edit' ? 'Salvar' : 'Cancelar'}
            handleClick={
              type === 'edit'
                ? () => {
                    updateVariation();
                  }
                : () => {
                    handleCreateClick();
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

export default Variation;
