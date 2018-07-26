'use strict'

import * as types from './types'

export const createNewTopic = (newTopic) => {
  return {
    type: types.createNewTopic.value,
    payload: newTopic
  }
};
