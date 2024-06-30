const initialState = {};

export default (state = initialState, actions: any) => {
  switch (actions.type) {
    case 'typeName':
      return {...state};

    default:
      return state;
  }
};
