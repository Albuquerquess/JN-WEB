export interface IResponseGetRooms {
  id: number;
  roomName: string;
  description: string;
  createAt: Date;
  updatedAt: Date;
}

export interface IRequestUpdateRoom {
  id: number;
  name?: string;
  description?: string;
  status?: boolean;
}
