/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import RotateButton from '../../../assets/svg/furnitureButtonIcon';
import PriceIndex from '../../../helpers/priceIndex';
import URLs from '../../../helpers/URLs';
import Api from '../../../services/api';
import {
  addFurniture,
  removeFurniture,
} from '../../../store/actions/furnitures';
import { IOption } from '../../../types/select';
import Select from '../../select';
import { Container } from './styles';

/**
 * 1. fazer o calculo do valor NO BACKEND
 */
interface IVariation {
  id: string;
  variation_name: string;
  variation_description: string;
  variation_price_index: number;
  variation_image: string;
  furniture_id: string;
  created_at: string;
}

interface IFurniture {
  id: string;
  furnitureName: string;
}

interface IRoom {
  id: string;
  name: string;
}

interface IFurnitureCartProps {
  furniture: IFurniture;
  variations: IVariation[];
  room: IRoom;
}

const FurnitureCard: React.FC<IFurnitureCartProps> = ({
  furniture,
  variations,
  room,
}) => {
  const [currentVariation, setCurrentVariation] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [selected, setSelected] = React.useState(false);
  const { addToast, removeAllToasts } = useToasts();

  const dispatch = useDispatch();
  /*         
  const furnitures: IFurniture = useSelector(
    (state: reducersType) => state.furnitures,
  ); */

  const options: IOption[] = variations.map((variation, index) => ({
    value: String(index),
    label: (
      <div className="select-label">
        {PriceIndex({ index: variation.variation_price_index })}
        {variation.variation_name}
      </div>
    ),
    priceIndex: Number(variation.variation_price_index),
  }));

  async function addSelectedFurniture() {
    console.log(`
    [FurnitureCard] addSelectedFurniture - 
    furnitureId: ${variations[currentVariation].furniture_id}
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
      room_name: 'RomoName',
      variation_name: variations[currentVariation].variation_name,
    };

    await Api.post(URLs.furnituresSave, payload);

    dispatch(
      addFurniture({
        furnitureId: variations[currentVariation].furniture_id,
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
        furnitureId: variations[currentVariation].furniture_id,
      }),
    );
    setSelected(false);
  }

  const handleClick = () => {
    if (!selected) {
      addSelectedFurniture();
    } else {
      removeSelectedFurniture();
    }
  };

  React.useEffect(() => {
    console.log(`
    [FurnitureCard] FurnitureCard - 
    currentVariation: ${currentVariation}`);
  }, [currentVariation]);
  /**
   * Criar um novo componente de card para tablet/desktop
   * Criar o price-preview (ver sobre criar rota no backend para calcular o preço)
   */
  return (
    <Container
      image={variations[currentVariation].variation_image}
      selected={selected}
    >
      <section className="furniture-card-header" />

      <section className="furniture-card-body">
        <div className="furniture-card-info-wrapper">
          <h3>{furniture.furnitureName}</h3>
          <p>{variations[currentVariation].variation_description}</p>
        </div>
        <div className="furniture-card-tools-wrapper">
          {variations.length > 1 && (
            <label className="furniture-card-select-box">
              <p>Selecione uma opção</p>
              <Select
                options={options}
                defaultValue={options[0]}
                placeholder="Escolha uma opção"
                menuDirection="auto"
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                setValue={(value: string) => setCurrentVariation(Number(value))}
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
            <span className="furniture-card-button-label">
              {selected ? 'Remover' : 'Adicionar'}
            </span>
          </button>
        </div>
      </section>
    </Container>
  );
};

export default FurnitureCard;
