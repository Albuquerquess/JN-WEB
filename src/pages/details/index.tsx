import axios, { AxiosError } from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Button from '../../components/button';
import Card from '../../components/card';
import Label from '../../components/label';
import Select from '../../components/select';
import PriceIndex from '../../helpers/priceIndex';
import URLs from '../../helpers/URLs';
import Requests, { Api } from '../../services/api';
import { addColorAndTamponade } from '../../store/actions/details';
import { IAppState } from '../../store/types';
import {
  IColorResponse,
  IColorsAndTamponades,
  ITamponadeResponse,
} from '../../types/details';
import { ISaveColorAndTamponadeSelectedProps } from '../../types/forms/details';
import { Container } from './styles';

const Details: React.FC = () => {
  const colorAndTamponadeStored = useSelector(
    (state: IAppState) => state.details.colorAndTamponade,
  );

  const [selectedColor, setSelectedColor] = React.useState(
    colorAndTamponadeStored?.colorId || '1',
  );
  const [selectedTamponade, setSelectedTamponade] = React.useState(
    colorAndTamponadeStored?.tamponadeId || '1',
  );
  const [colorsAndTamponades, setColorsAndTamponades] =
    React.useState<IColorsAndTamponades>({
      colors: [],
      tamponades: [],
    });
  const { addToast, removeAllToasts } = useToasts();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function getColorAndTamponades(): Promise<void> {
    try {
      const colorsAndTamponades = await Requests.getColorAndTamponade();

      if (colorsAndTamponades.error) {
        addToast(colorsAndTamponades.messages || 'Ocorreu um erro!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }

      const colorsAndTamponadesFormated = {
        colors: colorsAndTamponades.data.colors.map(
          (color: IColorResponse) => ({
            value: color.id,
            label: (
              <div className="select-label">
                {PriceIndex({ index: color.price_index })}
                {color.color_name}
              </div>
            ),
          }),
        ),
        tamponades: colorsAndTamponades.data.tamponades.map(
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
        addToast(
          'Ocorreu um erro ao buscar as informações. Por favor, tente novamente!',
          {
            appearance: 'warning',
            autoDismiss: true,
          },
        );

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
    addToast('Salvando informações', {
      appearance: 'info',
      autoDismiss: true,
    });

    console.log(colorsAndTamponades);

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
    if (response.status === 204) {
      navigate('/moveis');

      removeAllToasts();

      addToast('informações salvas', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast('Erro ao salvar as informações', {
        appearance: 'error',
        autoDismiss: false,
      });
    }
  }

  React.useEffect(() => {
    getColorAndTamponades();
  }, []);

  React.useEffect(() => {
    console.log(colorsAndTamponades);
  }, [colorsAndTamponades]);
  return (
    <Container>
      <Label
        label="Cores e tamponamentos"
        sublabel="Decida os detalhes dos seus móveis. Eles poderão ser alterados também na próxima etapa."
      />
      <div id="card-box">
        <Card
          title="Cor dos móveis"
          description="Cor de todos os móveis do ambiente que você está orçando."
          image="https://i.imgur.com/W2z3eLr.png"
        >
          {colorsAndTamponades && colorsAndTamponades.colors && (
            <Select
              menuDirection="auto"
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
        </Card>
        <Card
          title="Tamponamento"
          description="Tamponamento de todos os móveis do ambiente que você está orçando."
          image="https://i.imgur.com/CEu6Zr2.png"
        >
          {colorsAndTamponades && colorsAndTamponades.colors && (
            <Select
              menuDirection="auto"
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
        </Card>
      </div>
      <Button
        handleClick={() =>
          registerColorAndTamponde({
            colorId: selectedColor,
            tamponadeId: selectedTamponade,
          })
        }
      />
    </Container>
  );
};

export default Details;
