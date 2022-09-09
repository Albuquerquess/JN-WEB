import { AxiosResponse } from 'axios';

interface IResponse {
  error: boolean;
  data: any | null;
  messages: string[] | null;
  additionalInfo: string[] | null;
}

class Response {
  good(response: AxiosResponse): IResponse {
    return {
      error: false,
      data: response.data,
      messages: null,
      additionalInfo: null,
    };
  }
  bad(error: any): IResponse {
    if (error.isAxiosError) {
      console.log(error);
      const { messages } = error.response.data;
      const additionalInfo = error.response.data;
      return {
        error: true,
        data: null,
        messages,
        additionalInfo,
      };
    }
    return {
      error: true,
      data: null,
      messages: ['Ops, ocorreu um erro interno. Por favor, tente novamente!'],
      additionalInfo: null,
    };
  }
}

export default new Response();
