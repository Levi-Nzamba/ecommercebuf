const reducer =  (state = {},action) => {
    switch (action.type){
        case "logUser":
            return action.payload
        case "removeUser":
            return {}
        default:
            return state
    }
}

export default reducer