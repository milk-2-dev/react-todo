import types from '../../actions/types'


const initialState  = []

const todoItems = (state = {...initialState}, action) => {
  const {payload, type} = action

  switch(type){
    case types.todo.createNewTodo.value:
      return [
        ...state, payload
      ]

    case types.todo.changeVote.value:
      return Object.assign({}, state, {
        todoItems: state.todoItems.map((item) => {
          if (item.todoKey === action.todoKey) {
            return Object.assign({}, item, {
              todoVotes: action.payload
            })
          }
          return item
        })
      });
    default:
      return [...state]
  }
}

export default todoItems
