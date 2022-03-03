/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import removeGreen from '../../assets/svg/remove-green.svg';
import waterDrop from '../../assets/svg/waterDrop.svg';
import PriceIndex from '../../helpers/priceIndex';
import URLs from '../../helpers/URLs';
import { Api } from '../../services/api';
import { addColorAndTamponade } from '../../store/actions/details';
import { IAppState } from '../../store/types';
import {
  IColorResponse,
  IColorsAndTamponades,
  ITamponadeResponse,
} from '../../types/details';
import { ISaveColorAndTamponadeSelectedProps } from '../../types/forms/details';
import logger from '../../utils/logger';
import Select from '../select';
import { Container } from './styles';

const PricePreview: React.FC = () => {
  const furnituresStored = useSelector((state: IAppState) => state.furnitures);

  const colorAndTamponadeStored = useSelector(
    (state: IAppState) => state.details,
  );

  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(
    colorAndTamponadeStored.colorAndTamponade.colorId || '1',
  );
  const [selectedTamponade, setSelectedTamponade] = React.useState(
    colorAndTamponadeStored.colorAndTamponade.tamponadeId || '1',
  );
  const [colorsAndTamponades, setColorsAndTamponades] =
    React.useState<IColorsAndTamponades>({
      colors: [],
      tamponades: [],
    });
  const { addToast, removeAllToasts } = useToasts();

  const dispatch = useDispatch();

  async function calculateBudgetAmount() {
    try {
      const furnituresByCurrentRoom = furnituresStored.selected.filter(
        selected => selected.roomId === furnituresStored.room.id,
      );

      if (furnituresByCurrentRoom.length > 0) {
        const variations = furnituresByCurrentRoom.map(furniture => {
          return {
            variationId: furniture.variationId,
            length: furniture.length,
          };
        });
        const params = {
          variations: JSON.stringify(variations),
          colorId: selectedColor,
          tamponadeId: selectedTamponade,
        };

        const response = await Api.get(URLs.calculateBudgetAmount, {
          params,
        });
        setAmount(response.data);
      } else {
        setAmount(0);
      }
    } catch (error) {
      logger.log('calculateBudgetAmount', error);
      alert(
        'Não foi possível gerar o orçamento prévio. Por favor, contate o suporte ou tente mais tarde.',
      );
    }
  }

  async function getColorAndTamponades(): Promise<void> {
    try {
      const response = await Api.get(URLs.colorsAndTamponadesIndex);

      if (response.status !== 200) throw Error;
      const colorsAndTamponadesFormated = {
        colors: response.data.colors.map((color: IColorResponse) => ({
          value: color.id,
          label: (
            <div className="select-label">
              {PriceIndex({ index: color.price_index })}
              {color.color_name}
            </div>
          ),
        })),
        tamponades: response.data.tamponades.map(
          (tamponade: ITamponadeResponse) => ({
            value: tamponade.id,
            label: (
              <div className="select-label">
                {PriceIndex({ index: tamponade.price_index })}
                {tamponade.tamponade_name}
              </div>
            ),
          }),
        ),
      };
      setColorsAndTamponades(colorsAndTamponadesFormated);
    } catch (error: AxiosError | unknown) {
      removeAllToasts();
      if (axios.isAxiosError(error)) {
        addToast('Ocorreu um erro ao buscar as informações!', {
          appearance: 'warning',
          autoDismiss: true,
        });
        addToast(error.response?.data.message, {
          appearance: 'warning',
          autoDismiss: false,
        });
      } else {
        addToast('Ocorreu um erro inesperado. Por favor, tente novamente.', {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
    }
  }

  async function registerColorAndTamponde({
    colorId,
    tamponadeId,
  }: ISaveColorAndTamponadeSelectedProps) {
    if (colorsAndTamponades.colors && colorsAndTamponades.tamponades) {
      const colorName = colorsAndTamponades.colors.filter(
        color => color.value === selectedColor,
      )[0].label.props.children[1];

      const tamponadeName = colorsAndTamponades.tamponades.filter(
        tamponade => tamponade.value === selectedTamponade,
      )[0].label.props.children[1];

      const response = await Api.post(URLs.colorsAndTamponadesSave, {
        color_name: colorName,
        tamponade_name: tamponadeName,
      });
      dispatch(
        addColorAndTamponade({
          colorId,
          tamponadeId,
        }),
      );
      if (response.status !== 204) {
        addToast('Erro ao buscar informações de cor e tamponamento.', {
          appearance: 'error',
          autoDismiss: false,
        });
      }
    } else {
      addToast('Não foi possível salvar as informações. Temte novamente!', {
        appearance: 'warning',
        autoDismiss: false,
      });
    }
  }

  React.useEffect(() => {
    getColorAndTamponades();
    calculateBudgetAmount();
  }, [furnituresStored, selectedColor, selectedTamponade]);

  React.useEffect(() => {
    registerColorAndTamponde({
      colorId: selectedColor,
      tamponadeId: selectedTamponade,
    });
  }, [selectedColor, selectedTamponade]);

  return (
    <Container isOpen={open}>
      <div id="price-preview-wrapper">
        <main>
          <p id="current-price">
            <span id="current-price-preview">Preço atual:</span>{' '}
            {amount.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <div id="price-preview-tools-wrapper">
            <div className="price-preview-select-box">
              <p>Cor</p>
              {colorsAndTamponades && colorsAndTamponades.colors && (
                <Select
                  menuDirection="top"
                  options={colorsAndTamponades.colors}
                  defaultValue={
                    colorsAndTamponades.colors.filter(
                      color => color.value === selectedColor,
                    )[0]
                  }
                  placeholder="Escolha uma cor"
                  setValue={(value: string) => setSelectedColor(value)}
                />
              )}
            </div>
            <div className="price-preview-select-box">
              <p>Tamponamento</p>
              {colorsAndTamponades && colorsAndTamponades.colors && (
                <Select
                  menuDirection="top"
                  options={colorsAndTamponades.tamponades}
                  defaultValue={
                    colorsAndTamponades.tamponades.filter(
                      tamponade => tamponade.value === selectedTamponade,
                    )[0]
                  }
                  placeholder="Escolha um tamponamento"
                  setValue={(value: string) => setSelectedTamponade(value)}
                />
              )}
            </div>
          </div>
        </main>
        <aside>
          <img
            src={waterDrop}
            onClick={() => setOpen(true)}
            alt="Clique para abrir"
            id="water-drop-icon"
          />
          <img
            src={removeGreen}
            onClick={() => setOpen(false)}
            alt="Clique para fechar"
            id="close-icon"
          />
        </aside>
      </div>
    </Container>
  );
};

export default PricePreview;
