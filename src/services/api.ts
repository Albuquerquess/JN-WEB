import axios from 'axios';

import {
  IRequestUpdateRoom,
  IRequestCreateRoom,
  IRequestUpdateRoomStatus,
} from '../types/rooms';
import Response from './response';

export const Api = axios.create({
  baseURL: process.env.REACT_APP_WEB_API,
});

class Requests {
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

  async getRooms() {
    try {
      const response = await Api.get('room');

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

  async deleteFurniture(id: number) {
    try {
      const response = await Api.delete(`furniture/${id}`);

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
}

export default new Requests();
