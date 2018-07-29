'use strict'

import * as types from './types'

export const createNewTopic = (newTopic) => {
  return {
    type: types.createNewTopic.value,
    payload: newTopic
  }
};

export const changeLabelFilterStatus = (labelKey) => {
  return {
    type: types.changeLabelFilterStatus.value,
    payload: labelKey
  }
};