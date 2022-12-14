/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import downloadIcon from '../../assets/svg/download.svg';
import Button from '../../components/button';
import Title from '../../components/title';
import URLs from '../../helpers/URLs';
import { Api } from '../../services/api';
import { IAppState, IAppStateContacts } from '../../store/types';
import { IFurnitureStorage } from '../../store/types/rooms';
import { Container } from './styles';

type IBudgetDetails = {
  colorName: string;
  tamponadeName: string;
};

type IColorAndTamponade = {
  colorId: string;
  tamponadeId: string;
};

type IBudgetFurniture = {
  furnitureName: string;
  furnitureId: string;
  length: number;
  variationName: number;
};

interface IResponseBudgetFurnitures {
  details: IBudgetDetails;
  furnitures: IBudgetFurniture[];
  fullValue: number;
}

const Budget: React.FC = () => {
  const navigate = useNavigate();

  const [budgetData, setbudgetData] = React.useState<IResponseBudgetFurnitures>(
    {
      details: {
        colorName: '',
        tamponadeName: '',
      },
      furnitures: [],
      fullValue: 0,
    },
  );
  const todayDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
  }).format(new Date());

  const detailsStored = useSelector((state: IAppState) => state.details);
  const contactStoreds = useSelector((state: IAppState) => state.contacts);
  const furnituresStored = useSelector((state: IAppState) => state.furnitures);
  const currentRoomStored = useSelector(
    (state: IAppState) => state.furnitures.room,
  );
  const { addToast } = useToasts();

  function downloadPDF(pdf: Buffer, title: string) {
    const url = window.URL.createObjectURL(new Blob([pdf]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.pdf`);
    document.body.appendChild(link);
    link.click();
  }

  function getFurnituresByCurrentRoom(): IFurnitureStorage[] {
    if (
      furnituresStored.selected &&
      furnituresStored.room &&
      furnituresStored.room.id &&
      detailsStored.colorAndTamponade
    ) {
      const furnituresByCurrentRoom = furnituresStored.selected.filter(
        furnitures => furnitures.roomId === furnituresStored.room.id,
      );

      return furnituresByCurrentRoom;
    }
    return [];
  }
  function getColorsAndTamponates(): IColorAndTamponade | false {
    if (detailsStored.colorAndTamponade) {
      return detailsStored.colorAndTamponade;
    }
    return false;
  }
  function getClient(): IAppStateContacts | false {
    if (contactStoreds) {
      return contactStoreds;
    }
    return false;
  }
  async function getBudgetInfos() {
    const furnituresByCurrentRoom = getFurnituresByCurrentRoom();

    if (furnituresByCurrentRoom.length === 0) {
      return addToast(
        'Parece que você não selecionou nenhum móvel. Vocẽ será redirecionado para a página.',
        {
          appearance: 'warning',
          autoDismiss: true,
          onDismiss: () => {
            navigate('/moveis');
          },
        },
      );
    }
    try {
      const response = await Api.post(URLs.getFurnituresInfos, {
        furnitures: furnituresByCurrentRoom,
        colorAndTamponades: detailsStored.colorAndTamponade,
      });

      if (response.data.furnitures.length === 0) {
        addToast(
          'Parece que você não selecionou nenhum móvel. Vocẽ será redirecionado para a página inicial.',
          {
            appearance: 'warning',
            autoDismiss: true,
            onDismiss: () => {
              navigate('/moveis');
            },
          },
        );
      }
      return setbudgetData(response.data);
    } catch (error) {
      return addToast(
        'Não foi possível gerar o orçamento. Por favor, contate o suporte!',
        {
          appearance: 'warning',
          autoDismiss: true,
          onDismiss: () => {
            setTimeout(() => window.location.reload(), 2000);
          },
        },
      );
    }
  }

  async function generatePDF() {
    addToast('Baixando PDF...', { appearance: 'info', autoDismiss: true });

    const furnituresByCurrentRoom = getFurnituresByCurrentRoom();
    const colorAndTamponade = getColorsAndTamponates();
    const client = getClient();

    if (furnituresByCurrentRoom.length <= 0) {
      return addToast(
        'Parece que você não selecionou nenhum móvel. Vocẽ será redirecionado para a página inicial.',
        {
          appearance: 'warning',
          autoDismiss: true,
          onDismiss: () => {
            navigate('/moveis');
          },
        },
      );
    }

    if (!colorAndTamponade) {
      return addToast(
        'Parece que você não adicionou a cor e o tamponamento dos seus móveis. Selecione e volte para esta página!',
        {
          appearance: 'warning',
          autoDismiss: true,
          onDismiss: () => {
            navigate('/detalhes');
          },
        },
      );
    }

    if (!client) {
      return addToast(
        'Parece que você não adicionou as suas informações de contato. Adicione e volte para esta paǵina!',
        {
          appearance: 'warning',
          autoDismiss: true,
          onDismiss: () => {
            navigate('/contatos');
          },
        },
      );
    }

    const response = await Api.post(
      URLs.generateBudgetPDF,
      {
        furnitures: furnituresByCurrentRoom,
        details: colorAndTamponade,
        roomId: currentRoomStored.id,
        client,
      },
      {
        responseType: 'blob',
      },
    );

    if (response.status !== 201) {
      return addToast(
        'Não foi possível gerar o orçamento. Por favor, contate o suporte!',
        {
          appearance: 'warning',
          autoDismiss: true,
          onDismiss: () => {
            window.location.reload();
          },
        },
      );
    }

    return downloadPDF(response.data, response.headers['x-file-name']);
  }

  React.useEffect(() => {
    getBudgetInfos();
  }, []);

  return (
    <Container>
      <Title title="Orçamento" subtitle="Resumo do que foi orçado." />

      {budgetData && (
        <>
          <main id="budget">
            <section id="budget-infos">
              <section id="budget-client" className="box">
                <p className="budget-text">
                  <strong>Cliente: </strong>
                  {contactStoreds.name}
                </p>
                <p className="budget-text">
                  <strong>Projetista: </strong>
                  Cristiane Alcântara
                </p>
              </section>

              <section id="budget-details" className="box">
                <h2 className="budget-title">
                  Características gerais dos móveis
                </h2>
                <p className="budget-text">
                  <strong>Cor: </strong>
                  {budgetData.details.colorName}
                </p>
                <p className="budget-text">
                  <strong>Tamponamento: </strong>
                  {budgetData.details.tamponadeName}
                </p>
                <p className="budget-text">
                  <strong>Ferragens: </strong>
                  Blum e Cermag
                </p>
                <p className="budget-text">
                  <strong>Garatia: </strong>
                  Vitalicia
                </p>
              </section>

              <section id="budget-details" className="box">
                <h2 className="budget-title">Itens do orçamento</h2>
                {budgetData.furnitures.map(furniture => (
                  <p className="budget-text">
                    <strong>{furniture.furnitureName}: </strong>
                    {furniture.length}m.
                  </p>
                ))}
              </section>
              <section className="box">
                <p className="budget-text" id="final-price">
                  <strong>Preço final</strong>{' '}
                  {new Intl.NumberFormat('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 2,
                  }).format(budgetData.fullValue)}
                </p>
              </section>
            </section>
            <aside>
              <img
                src="https://lush-rate-597.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0aebbf26-e7a4-412c-91ee-8ab4d22b3f24%2Filustration.svg?table=block&id=1e5f3911-bf8f-47fa-9d2f-7d8f41cc3c46&spaceId=d1e2c5f7-b1ee-45d3-9c91-3e3a1610b991&userId=&cache=v2"
                alt="JN - Orçamento express"
              />
            </aside>
          </main>
          <section id="budget-buttons-wrapper">
            <Button navigateTo="/obrigado" />

            <button type="button" id="budget-download" onClick={generatePDF}>
              <img src={downloadIcon} alt="Baixar o PDF do orçamento" />
              <p>Baixar orçamento</p>
            </button>
          </section>
        </>
      )}
    </Container>
  );
};

export default Budget;
