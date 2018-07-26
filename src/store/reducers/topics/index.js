import types from '../../actions/types'

const initialState  = []

const todoTopics = (state = initialState, action) => {
  debugger

  switch(action.type){
    case types.topic.createNewTopic.value:
      return [...state, action.payload]

    default:
      return [ ...state ]
  }
}

export default todoTopics