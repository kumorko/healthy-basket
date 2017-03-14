import * as types from '../constants/ActionTypes';

export function editItemCount(id, count) {
  return { type: types.EDIT_ITEM_COUNT, id, count};
}

export function normalizeItemCount(id, count) {
  return { type: types.NORMALIZE_ITEM_COUNT, id, count};
}
