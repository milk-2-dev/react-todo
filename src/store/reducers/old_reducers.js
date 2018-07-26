import {
  ACTION_CHANGE_LABEL_FILTER_STATUS,
  ACTION_CHANGE_TODO_FILTER_STATUS
} from '../../index'

const initialState  = {
    filteredBy:[],
    todoTopics:[]
};

const oldReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTION_CHANGE_LABEL_FILTER_STATUS:
      return Object.assign({}, state, {
        todoTopics: state.todoTopics.map((item) => {
          if (item.id === action.labelKey) {
            return Object.assign({}, item, {
              filteredByLabel: !item.filteredByLabel
            })
          }
          return item
        }),
      });
    case ACTION_CHANGE_TODO_FILTER_STATUS:
      return Object.assign({}, state, {
        todoItems: state.todoItems.map((todoItem) => {
          if( action.filteredBy.length === 0 ){
            return Object.assign({}, todoItem, {
              filterActive: 'showAll'
            })
          }
          else {
            let result = []
            action.filteredBy.forEach(function(itemFilter){
              var isLabelInPost = todoItem.todoLabels.some(function(labelItem){return labelItem.id === itemFilter});

              if(isLabelInPost){
                result.push(true)
              }
              else{
                result.push(false)
              }
            });

            let isPostFiltered = result.some(function(resultItem){return resultItem === true})

            if(isPostFiltered){
              return Object.assign({}, todoItem, {
                filterActive: true
              })
            }
            else{
              return Object.assign({}, todoItem, {
                filterActive: false
              })
            }
          }

          return todoItem
        }),
      });
    default:
      return { ...state }
  }
}

export default oldReducer