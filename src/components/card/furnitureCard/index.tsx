/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import RotateButton from '../../../assets/svg/furnitureButtonIcon';
import PriceIndex from '../../../helpers/priceIndex';
import URLs from '../../../helpers/URLs';
import { Api } from '../../../services/api';
import {
  addFurniture,
  removeFurniture,
} from '../../../store/actions/furnitures';
import { IAppState, IAppStateFurniture } from '../../../store/types';
import { IFurnitureCardProps } from '../../../types/furnitureCard';
import { IOption } from '../../../types/select';
import logger from '../../../utils/logger';
import Select from '../../select';
import { Container } from './styles';

const FurnitureCard: React.FC<IFurnitureCardProps> = ({
  furniture,
  variations,
  room,
}) => {
  const [currentVariation, setCurrentVariation] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [selected, setSelected] = React.useState(false);
  const { addToast, removeAllToasts } = useToasts();

  const furnitureStored: IAppStateFurniture = useSelector(
    (state: IAppState) => state.furnitures,
  );

  const dispatch = useDispatch();

  async function addSelectedFurniture() {
    logger.log(`
    [FurnitureCard] addSelectedFurniture -
    length: ${length}
    furnitureId: ${variations[currentVariation].furnitureId}
    variationId: ${variations[currentVariation].id}
    currentVariation: ${currentVariation}`);

    if (length <= 0) {
      removeAllToasts();
      addToast(
        `Informe o comprimento do ${furniture.furnitureName || 'móvel'}`,
        {
          appearance: 'info',
          autoDismiss: true,
        },
      );

      return;
    }

    const payload = {
      furniture_name: furniture.furnitureName,
      room_name: room.name,
      variation_name: variations[currentVariation].name,
    };

    await Api.post(URLs.furnituresSave, payload);

    dispatch(
      addFurniture({
        furnitureId: variations[currentVariation].id,
        variationId: variations[currentVariation].id,
        roomId: room.id,
        length,
      }),
    );

    setSelected(true);
  }

  function removeSelectedFurniture() {
    dispatch(
      removeFurniture({
        furnitureId: variations[currentVariation].furnitureId,
      }),
    );
    setSelected(false);
  }

  function checkIfTheFurnitureIsStored() {
    const furnitureId = furniture.id;

    if (furnitureStored.selected && furnitureId) {
      const [furnitureIsStored] = furnitureStored.selected.filter(
        furniture => furniture.furnitureId === furnitureId,
      );

      logger.log(
        `checkIfTheFurnitureIsStored - [furnitureIsStored: ${furnitureIsStored}]`,
      );

      if (furnitureIsStored) {
        const { variationId } = furnitureIsStored;

        const currentVariationStoredIndex = variations.findIndex(
          variation => variation.id === variationId,
        );

        if (currentVariationStoredIndex || currentVariationStoredIndex === 0) {
          setSelected(true);
          setCurrentVariation(currentVariationStoredIndex);
          setLength(furnitureIsStored.length);
        }
      }
    }
  }
  const options: IOption[] = variations.map((variation, index) => ({
    value: String(index),
    label: (
      <div className="select-label">
        {PriceIndex({ index: variation.priceIndex })}
        {variation.name}
      </div>
    ),
    priceIndex: Number(variation.priceIndex),
  }));

  const handleClick = () => {
    if (!selected) {
      addSelectedFurniture();
    } else {
      removeSelectedFurniture();
    }
  };

  React.useEffect(() => {
    checkIfTheFurnitureIsStored();
  }, []);

  return (
    <Container
      image={variations[currentVariation].imageSrc}
      selected={selected}
    >
      <section className="furniture-card-header" />

      <section className="furniture-card-body">
        <div className="furniture-card-info-wrapper">
          <h3>{furniture.furnitureName}</h3>
          <p>{variations[currentVariation].description}</p>
        </div>
        <div className="furniture-card-tools-wrapper">
          {variations.length > 1 && (
            <label className="furniture-card-select-box">
              <p>Selecione uma opção</p>
              <Select
                options={options}
                defaultValue={
                  currentVariation
                    ? options.filter(
                        option => Number(option.value) === currentVariation,
                      )[0]
                    : options[0]
                }
                placeholder="Escolha uma opção"
                menuDirection="auto"
                setValue={(value: string) => setCurrentVariation(Number(value))}
                disable={selected}
              />
            </label>
          )}
          <label htmlFor="length" className="furniture-card-input-box">
            <p>Comprimento</p>
            <input
              type="number"
              min={0}
              id="length"
              placeholder="Ex: 2.2m"
              value={length}
              disabled={selected}
              onChange={e => setLength(Number(e.target.value))}
            />
          </label>

          <button
            type="button"
            onClick={handleClick}
            className="furniture-card-button"
          >
            <RotateButton selected={selected} />
            <p className="furniture-card-button-label">
              {selected ? 'Remover' : 'Adicionar'}
            </p>
          </button>
        </div>
      </section>
    </Container>
  );
};

export default FurnitureCard;
