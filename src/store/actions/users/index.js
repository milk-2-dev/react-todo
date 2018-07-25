'use strict'

import * as types from './types'

export const changeUser = (userData) => {
  return {
    type: types.changeUser.value,
    payload: userData
  }
}
