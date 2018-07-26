import {combineReducers} from 'redux'
import todoItems from './todo'
import user from './users'
import todoTopics from './topics'
import filteredBy from './filter'
import oldReducer from './old_reducers'

export const rootReducer = combineReducers({
  todoItems,
  user,
  oldReducer,
  todoTopics,
  filteredBy
})