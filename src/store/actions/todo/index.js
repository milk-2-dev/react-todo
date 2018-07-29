'use strict'

import * as types from './types'

export const createNewTodo = (newTodo) => {
  return {
    type: types.createNewTodo.value,
    payload: newTodo
  }
}

export const changeVote = (newTodoVotes, todoKey) => {
  return {
    type: types.changeVote.value,
    payload: {
      newTodoVotes: newTodoVotes,
      todoKey: todoKey
    }
  }
}

export const changeTodoFilterStatus = (filteredBy) => {
  return {
    type: types.changeTodoFilterStatus.value,
    payload: filteredBy
  }
};