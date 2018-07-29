import types from '../../actions/types'


const initialState  = []

const todoItems = (state = initialState, action) => {
  const {payload, type} = action
  switch(type){
    case types.todo.createNewTodo.value:
      return [...state, payload]

    case types.todo.changeVote.value:
      debugger
      return state.map((item) => {
        if (item.todoKey === payload.todoKey) {
          item.todoVotes = payload.newTodoVotes
          return item
        }
        return item
      })

    case types.todo.changeTodoFilterStatus.value:
      return state.map((item) => {
        debugger
        if( payload.length === 0 ){
          return item.filterActive = 'showAll'
        }
        else {
          let result = []

          payload.forEach(function(itemFilter){
            debugger
            var isLabelInPost = item.todoLabels.some(function(labelItem){return labelItem.id === itemFilter});

            if(isLabelInPost){
              result.push(true)
            }
            else{
              result.push(false)
            }
          });

          let isPostFiltered = result.some(function(resultItem){return resultItem === true})

          if(isPostFiltered){
            return item.filterActive = true
          }
          else{
            return item.filterActive = false
          }
        }

        return item
      })

    default:
      return [...state]
  }
}

export default todoItems
