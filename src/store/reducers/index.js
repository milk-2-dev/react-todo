import {combineReducers} from 'redux'
import todoItems from './todo'
import user from './users'
import todoTopics from './topics'
import filteredBy from './filter'

export const rootReducer = combineReducers({
  todoItems,
  user,
  todoTopics,
  filteredBy
})