'use strict'

import * as types from './types'

export const createNewTodo = (newWallet) => {
  return {
    type: types.createNewTodo.value,
    payload: newWallet
  }
};

export const changeVote = (newTodoVotes, todoKey) => {
  return {
    type: types.changeVote.value,
    payload: newTodoVotes,
    todoKey: todoKey
  }
};
