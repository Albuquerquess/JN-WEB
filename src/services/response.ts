import { AxiosResponse } from 'axios';

interface IResponse {
  error: boolean;
  data: any | null;
  message: string[] | null;
  additionalInfo: string[] | null;
}

class Response {
  good(response: AxiosResponse): IResponse {
    return {
      error: false,
      data: response.data,
      message: null,
      additionalInfo: null,
    };
  }
  bad(error: any): IResponse {
    if (error.isAxiosError) {
      const message = error.response.data;
      const additionalInfo = error.response.data;
      return {
        error: true,
        data: null,
        message,
        additionalInfo,
      };
    }
    return {
      error: true,
      data: null,
      message: ['Ops, ocorreu um erro interno. Por favor, tente novamente!'],
      additionalInfo: null,
    };
  }
}

export default new Response();
