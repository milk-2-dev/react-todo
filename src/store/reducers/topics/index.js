import types from '../../actions/types'

const initialState  = []

const todoTopics = (state = initialState, action) => {
  const {payload, type} = action

  switch(type){
    case types.topic.createNewTopic.value:
      return [...state, payload]

    case types.topic.changeLabelFilterStatus.value:
      debugger
      return state.map((item) => {
        if (item.id === payload) {
          item.filteredByLabel = !item.filteredByLabel
          return item
        }
        return item
      })

    default:
      return [ ...state ]
  }
}

export default todoTopics