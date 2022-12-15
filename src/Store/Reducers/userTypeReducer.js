const reducer = ( state="None",action ) =>{
    switch (action.type){
        case "setUserType":
            return action.payload
        default:
            return state
    }
}

export default reducer