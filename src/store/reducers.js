import { ACTION_CREATE_NEW_TODO, ACTION_CREATE_NEW_TOPIC, ACTION_CHANGE_VOTE, ACTION_CHANGE_LABEL_FILTER_STATUS, ACTION_CHANGE_TODO_FILTER_STATUS } from '../index'

const initialState  = {
    user:{
        userName: 'Trahtenberg',
        userKey: 1123
    },

    todoItems: [
        // {
        //     todoTitle: 'test',
        //     todoDesc: 'test desc',
        //     todoAuthor: 'Kolia',
        //     todoLabels: [
        //         {
        //             id: 1,
        //             label: 'Development',
        //             labelIcon: 'glyphicon glyphicon-cog',
        //             value: false
        //         },
        //         {
        //             id: 2,
        //             label: 'Data science',
        //             labelIcon: 'glyphicon glyphicon-cog',
        //             value: false
        //         }
        //     ],
        //     todoVotes: {
        //         value:0,
        //         votedUsers: []
        //     },
        //     todoDate: 1529760093896,
        //     todoKey: 91198,
        //     filterActive: false
        // }
    ],

    filteredBy:[
        //labelId
    ],

    todoTopics:[
        // {
        //     id: 1,
        //     label: 'Development',
        //     labelIcon: 'glyphicon glyphicon-cog',
        //     value: false,
        //     filteredByLabel:false
        // }
    ]
};

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION_CREATE_NEW_TODO:
            return {
                ...state,
                todoItems: [...state.todoItems, action.payload]
            };
        case ACTION_CREATE_NEW_TOPIC:
            return {
                ...state,
                todoTopics: [...state.todoTopics, action.payload]
            };
        case ACTION_CHANGE_VOTE:
            // return {
            //     ...state,
            //     todoItems: state.todoItems.map((item) =>
            //     {
            //         if (item.todoKey === action.todoKey)
            //         {
            //             return  item, {
            //                 todoVotes: action.payload
            //             }
            //         }
            //         return item
            //     })
            // };
            return Object.assign({}, state, {
                todoItems: state.todoItems.map((item) => {
                    // debugger
                    if (item.todoKey === action.todoKey) {
                        return Object.assign({}, item, {
                            todoVotes: action.payload
                        })
                    }
                    return item
                })
            });

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
                    filteredBy: [state.filteredBy, action.labelKey]
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
                            action.filteredBy.forEach(function(itemFilter) {
                                debugger
                                var test = todoItem.todoLabels.some(function(labelItem){return labelItem.id === itemFilter});

                                if(test){
                                    todoItem.filterActive = true;
                                    return
                                }

                                todoItem.filterActive = false;
                                return

                            });
                        }

                        return todoItem
                    }),
                    filteredBy: action.filteredBy
                });

        default:
            return { ...state }
    }
}