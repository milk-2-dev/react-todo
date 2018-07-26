import types from '../../actions/types'


const initialState  = []

const filteredBy = (state = {...initialState}, action) => {
  const {payload, type} = action

  switch(type){
    case types.filter.addNewfilter.value:
      return [
        ...state, payload
      ]
    default:
      return [...state]
  }
}

export default filteredBy
