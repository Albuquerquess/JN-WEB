import axios from 'axios';

import {
  IRequestUpdateFurnitureStatus,
  IParamsFurniturePage,
  IRequestUpdateFurniture,
  IRequestCreateFurniture,
  IRequestDeleteFurniture,
  IRequestSaveSelectedFurniture,
  IParamsGetFurnituresByRoomId,
} from '../types/furnitures';
import {
  IRequestUpdateRoom,
  IRequestCreateRoom,
  IRequestUpdateRoomStatus,
} from '../types/rooms';
import {
  IRequestCreateVariation,
  IRequestFindVariationsByFurnitureId,
  IRequestUpdateVariationStatus,
  IUpdateVariation,
} from '../types/variations';
import Response from './response';

export const Api = axios.create({
  baseURL: process.env.REACT_APP_WEB_API,
});

class Requests {
  /* Auth admin  */
  async authAdmin(username: string, password: string) {
    try {
      const response = await Api.post('admin/auth', {
        username,
        password,
      });

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }
  /* Rooms */
  async createRoom({ name, description, file }: IRequestCreateRoom) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('description', description);

      const response = await Api.post('room', formData);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async getActiveRooms() {
    try {
      const response = await Api.get('room/active');

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }
  async getAllRooms() {
    try {
      const response = await Api.get('room/all');

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async deleteRoom(id: number) {
    try {
      const response = await Api.delete(`room/${id}`);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async updateRoom({
    name,
    description,
    id,
    status,
    file,
  }: IRequestUpdateRoom) {
    const formData = new FormData();

    if (name) {
      formData.append('name', name);
    }
    if (description) {
      formData.append('description', description);
    }
    if (status) {
      formData.append('status', String(status));
    }

    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await Api.put(`room/${id}`, {
        name,
        description,
        status,
      });

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async updateRoomStatus({ id, status }: IRequestUpdateRoomStatus) {
    try {
      const response = await Api.patch(`room/${id}/${status}`);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }
  /* Furnitures */

  async createFurniture({ roomId, name }: IRequestCreateFurniture) {
    try {
      const response = await Api.post('furniture', {
        roomId,
        name,
      });

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async getFurnituresByRoomId({
    roomId,
    getActive,
  }: IParamsGetFurnituresByRoomId) {
    try {
      const response = await Api.get(`furniture/findByRoom/${roomId}`, {
        params: {
          getActive,
        },
      });

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async getFurnituresById({ furnitureId, roomId }: IParamsFurniturePage) {
    try {
      const response = await Api.get(`furniture/${furnitureId}/${roomId}`);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async updateFurniture({ id, roomId, name }: IRequestUpdateFurniture) {
    try {
      const response = await Api.put('furniture', {
        id,
        roomId,
        name,
      });

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async updateFurnitureStatus({
    furnitureId,
    status,
  }: IRequestUpdateFurnitureStatus) {
    try {
      const response = await Api.patch(`furniture/${furnitureId}/${status}`);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async deleteFurniture({ id, roomId }: IRequestDeleteFurniture) {
    try {
      const response = await Api.delete(`furniture/${id}/${roomId}`);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }
  /* Variation */

  async createVariation({
    title,
    value,
    description,
    priceIndex,
    furnitureId,
    roomId,
    file,
  }: IRequestCreateVariation) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('value', value.toString());
      formData.append('description', description);
      formData.append('roomId', roomId.toString());
      formData.append('priceIndex', priceIndex.toString());
      formData.append('furnitureId', furnitureId.toString());

      const response = await Api.post('variation', formData);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async deleteVariation(id: number) {
    try {
      const response = await Api.delete(`variation/${id}`);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async getVariationsByFurnitureId({
    furnitureId,
    roomId,
  }: IRequestFindVariationsByFurnitureId) {
    try {
      const response = await Api.get(`variation/${furnitureId}/${roomId}`);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async updateVariation({
    id,
    title,
    description,
    priceIndex,
    value,
  }: IUpdateVariation) {
    try {
      const response = await Api.put('variation/', {
        id,
        title,
        description,
        priceIndex,
        value,
      });

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async updateVariationStatus({ id, status }: IRequestUpdateVariationStatus) {
    try {
      const statusFormated = status ? 'enable' : 'disable';
      const response = await Api.patch(`variation/${id}/${statusFormated}`);

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  async saveSelectFurniture({
    furnitureName,
    roomName,
    variationName,
  }: IRequestSaveSelectedFurniture) {
    try {
      const response = await Api.post('selectedFurniture', {
        furnitureName,
        roomName,
        variationName,
      });

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }

  /* Color and tamponade */
  async getColorAndTamponade() {
    try {
      const response = await Api.get('/colors-and-tamponade/index');

      return Response.good(response);
    } catch (error) {
      return Response.bad(error);
    }
  }
}

export default new Requests();
