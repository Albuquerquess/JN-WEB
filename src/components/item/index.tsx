import React from 'react';
import { useToasts } from 'react-toast-notifications';

import Requests from '../../services/api';
import SwitchButtom from '../switchButtom';
import TrashButton from '../trashButton';
import { Container } from './styles';

interface IPropsItem {
  name: string;
  id: number;
  status: boolean;
  type: 'room' | 'furniture' | 'variation';
  refresh: boolean;
  setRefresh(value: boolean): void;
  handleClick(): void;
}

const Item: React.FC<IPropsItem> = ({
  id,
  name,
  type,
  setRefresh,
  refresh,
  status,
  handleClick,
}) => {
  const { addToast } = useToasts();
  const typeFormated = {
    room: 'Ambiente',
    furniture: 'Móvel',
    variation: 'Variação',
  };

  const room = {
    del: Requests.deleteRoom,
    enable: Requests.updateRoomStatus,
    disable: Requests.updateRoomStatus,
  };

  const furniture = {
    del: Requests.deleteFurniture,
    enable: Requests.updateFurnitureStatus,
    disable: Requests.updateFurnitureStatus,
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

      case 'furniture':
        deleted = await furniture.del(id);
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
    setRefresh(!refresh);
  }

  async function enable() {
    let updated;

    switch (type) {
      case 'room':
        updated = await room.enable({ id, status: 'enable' });
        break;

      case 'furniture':
        updated = await furniture.enable({ id, status: 'enable' });
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
      addToast(`${typeFormated[type]} Ativado(a) com sucesso!`, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  }

  async function disable() {
    let updated;

    switch (type) {
      case 'room':
        updated = await room.disable({ id, status: 'disable' });
        break;

      case 'furniture':
        updated = await furniture.disable({ id, status: 'disable' });
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
      addToast(`${typeFormated[type]} desativado(a) com sucesso!`, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
  }

  function handleItemClick() {
    if (handleClick) {
      handleClick();
    }
  }

  return (
    <Container>
      <div
        className="title"
        onClick={handleItemClick}
        onKeyPress={handleItemClick}
        role="button"
        tabIndex={0}
      >
        {name}
      </div>
      <TrashButton
        handleClick={() => {
          del();
        }}
      />
      <SwitchButtom
        status={status}
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
