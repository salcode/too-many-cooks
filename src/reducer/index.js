export default function reducer(state, action) {
  switch (action.type) {
    case 'setDatabaseValue': {
      return {
        ...state,
        databaseValue: action.value,
      };
    }
    default:
      return state;
  }
}
