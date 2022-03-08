import React from 'react';
import { useToasts } from 'react-toast-notifications';

import Requests from '../../services/api';
import SwitchButtom from '../switchButtom';
import TrashButton from '../trashButton';
import { Container } from './styles';

interface IPropsItem {
  name: string;
  id: number;
  type: 'room' | 'furniture' | 'variation';
  setRefresh(value: boolean): void;
}

const Item: React.FC<IPropsItem> = ({ id, name, type, setRefresh }) => {
  const { addToast } = useToasts();
  const typeFormated = {
    room: 'Ambiente',
    furniture: 'Móvel',
    variation: 'Variação',
  };

  const room = {
    del: Requests.deleteRoom,
    enable: Requests.updateRoom,
    disable: Requests.deleteRoom,
  };

  const furniture = {
    del: Requests.deleteRoom,
    enable: Requests.deleteRoom,
    disable: Requests.deleteRoom,
  };

  const variation = {
    del: Requests.deleteRoom,
    enable: Requests.deleteRoom,
    disable: Requests.deleteRoom,
  };

  async function del() {
    let deleted;

    switch (type) {
      case 'room':
        deleted = await room.del(id);
        break;

      default:
        return;
    }

    if (deleted && deleted.error) {
      addToast(deleted.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      addToast(`${typeFormated[type]} Deletado(a) com sucesso!`, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    setRefresh(true);
  }

  async function enable() {
    let updated;

    switch (type) {
      case 'room':
        updated = await room.enable({ id, status: true });
        break;

      default:
        return;
    }

    if (updated && updated.error) {
      addToast(updated.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      addToast(`${typeFormated[type]} Ativado(a)/desativado(a) com sucesso!`, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  }

  async function disable() {
    let updated;

    switch (type) {
      case 'room':
        updated = await room.enable({ id, status: false });
        break;

      default:
        return;
    }

    if (updated && updated.error) {
      addToast(updated.messages || 'Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      addToast(`${typeFormated[type]} Ativado(a)/desativado(a) com sucesso!`, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  }

  return (
    <Container>
      <p className="title">{name}</p>
      <TrashButton
        handleClick={() => {
          del();
        }}
      />
      <SwitchButtom
        handleOnActivate={() => {
          enable();
        }}
        handleOnDisable={() => {
          disable();
        }}
      />
    </Container>
  );
};

export default Item;
