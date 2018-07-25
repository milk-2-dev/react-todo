import types from '../../actions/types'


const initialState  = {

    userName: 'Trahtenberg',
    userKey:  1,
    id:       1,

};

const User = (state = {...initialState}, action) => {
  const {payload, type} = action

  switch(type){
    case types.users.changeUser.value:
      return Object.assign({}, state, {
        state:{
          user:{
            id: payload.id,
            userName: payload.userName,
            userKey: payload.userKey
          }
        }
      })
    default:
      return { ...state }
  }
}

export default User
