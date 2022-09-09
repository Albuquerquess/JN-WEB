import React from 'react';
import { useToasts } from 'react-toast-notifications';

import Requests from '../../services/api';
import SwitchButtom from '../switchButtom';
import TrashButton from '../trashButton';
import { Container } from './styles';

interface IPropsItem {
  id: number;
  roomId: number | undefined;
  name: string;
  status: boolean;
  refresh: boolean;
  disabled: boolean;
  handleClick(): void;
  onChangeName: (
    value: string,
  ) => void | React.Dispatch<React.SetStateAction<string>> | undefined;
  setRefresh(value: boolean): void;
  type: 'room' | 'furniture' | 'variation';
  mode: 'create' | 'edit';
  onChangeStatus: (
    value: boolean,
  ) => void | React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const Item: React.FC<IPropsItem> = ({
  id,
  mode,
  type,
  name,
  status,
  roomId,
  refresh,
  disabled,
  setRefresh,
  handleClick,
  onChangeName,
  onChangeStatus,
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
        if (roomId) {
          deleted = await furniture.del({ id, roomId });
        }
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
    if (mode === 'edit') {
      switch (type) {
        case 'room':
          updated = await room.enable({ id, status: 'enable' });
          break;

        case 'furniture':
          updated = await furniture.enable({
            furnitureId: id,
            status: 'enable',
          });
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
        if (onChangeStatus) {
          onChangeStatus(true);
        }
        addToast(`${typeFormated[type]} Ativado(a) com sucesso!`, {
          appearance: 'success',
          autoDismiss: true,
        });
      }
      setRefresh(!refresh);
    } else if (onChangeStatus) {
      onChangeStatus(true);
    }
  }

  async function disable() {
    if (mode === 'edit') {
      let updated;

      switch (type) {
        case 'room':
          updated = await room.disable({ id, status: 'disable' });
          break;

        case 'furniture':
          updated = await furniture.disable({
            furnitureId: id,
            status: 'disable',
          });
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
        setRefresh(!refresh);

        if (onChangeStatus) {
          onChangeStatus(false);
        }
        addToast(`${typeFormated[type]} desativado(a) com sucesso!`, {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } else if (onChangeStatus) {
      onChangeStatus(false);
    }
  }

  const handleItemClick = () => {
    if (handleClick) {
      handleClick();
    }
  };

  const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    if (!disabled && onChangeName) {
      onChangeName(e.currentTarget.value);
    }
  };

  return (
    <Container disabled={disabled}>
      <input
        className="title"
        onClick={handleItemClick}
        onChange={handleChangeName}
        onKeyPress={handleItemClick}
        role="button"
        tabIndex={0}
        value={name}
        readOnly={disabled}
      />

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
