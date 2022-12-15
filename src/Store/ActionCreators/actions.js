export const logUser = (user) =>{
    return((dispatch)=>{
        dispatch({
            type:"logUser",
            payload:user
        })
    })
}
export const setUserType = (type) =>{
    return((dispatch)=>{
        dispatch({
            type:"setUserType",
            payload:type

        })
    })
}