'use strict'

import * as types from './types'

export const addNewfilter = (newFilter) => {
  return {
    type: types.addNewfilter.value,
    payload: newFilter
  }
}
