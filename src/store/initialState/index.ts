const CONTACT_INITIAL_STATE = {
  contact: {
    name: '',
    email: '',
    phone: '',
  },
};

const DETAIL_INITIAL_STATE = {
  colorId: '1',
  tamponadeId: '1',
};

const FURNITURE_INITIAL_STATE = {
  selected: [{ variationId: '', furnitureId: '', roomId: '', length: 0 }],
  room: {
    id: '',
    name: '',
  },
};
export { CONTACT_INITIAL_STATE, DETAIL_INITIAL_STATE, FURNITURE_INITIAL_STATE };
