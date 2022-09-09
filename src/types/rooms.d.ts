export interface IResponseGetRooms {
  id: string;
  roomName: string;
  description: string;
  status: 1 | 0;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRequestUpdateRoom {
  id: number;
  name: string | false;
  description?: string;
  status?: boolean;
  file: File | null;
}
export interface IRequestUpdateRoomStatus {
  id: number;
  status: 'enable' | 'disable';
}

export interface IRequestCreateRoom {
  name: string;
  description: string;
  file: File;
}
