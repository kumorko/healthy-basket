import { EDIT_ITEM_COUNT, NORMALIZE_ITEM_COUNT } from '../constants/ActionTypes';

const initialState = [{
    id: 1,
    name: 'Apples',
    price: 25,
    everyNthFree: 0,
    count: 1
  },
  {
    id: 2,
    name: 'Oranges',
    price: 30,
    everyNthFree: 0,
    count: 1
  },
  {
    id: 3,
    name: 'Bananas',
    price: 15,
    everyNthFree: 0,
    count: 2
  },
  {
    id: 4,
    name: 'Papayas',
    price: 50,
    everyNthFree: 3,
    count: 4
  }];

export default function items(state = initialState, action) {
  switch (action.type) {
    case EDIT_ITEM_COUNT:
      return state.map(item =>
        item.id === Number(action.id) ?
          Object.assign({}, item, {count: action.count < 0 ? 0 : action.count}) :
          item
      );

      case NORMALIZE_ITEM_COUNT:
        return state.map(item =>
          item.id === Number(action.id) ?
            Object.assign({}, item, {count: action.count || 0}) :
            item
        );

    default:
      return state;
  }
}
