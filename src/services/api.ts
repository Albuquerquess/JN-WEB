import axios from 'axios';

import { IRequestUpdateRoom } from '../types/rooms';
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

  async updateRoom({ name, description, id, status }: IRequestUpdateRoom) {
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
