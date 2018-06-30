import { ACTION_CREATE_NEW_TODO,
  ACTION_CREATE_NEW_TOPIC,
  ACTION_CHANGE_VOTE,
  ACTION_SAVE_FILTER,
  ACTION_CHANGE_LABEL_FILTER_STATUS,
  ACTION_CHANGE_TODO_FILTER_STATUS } from '../index';

export const createNewTodo = (newWallet) => {
    return {
        type: ACTION_CREATE_NEW_TODO,
        payload: newWallet
    }
};

export const createNewTopic = (newTopic) => {
    return {
        type: ACTION_CREATE_NEW_TOPIC,
        payload: newTopic
    }
};

export const changeVote = (newTodoVotes, todoKey) => {
    return {
        type: ACTION_CHANGE_VOTE,
        payload: newTodoVotes,
        todoKey: todoKey
    }
};

export const saveFilters = (newFilters) => {
    return {
        type: ACTION_SAVE_FILTER,
        payload: newFilters
    }
};

export const changeLabelFilterStatus = (labelKey) => {
    return {
        type: ACTION_CHANGE_LABEL_FILTER_STATUS,
        labelKey: labelKey
    }
};

export const changeTodoFilterStatus = (filteredBy) => {//labelKey
    return {
        type: ACTION_CHANGE_TODO_FILTER_STATUS,
        filteredBy: filteredBy
    }
};