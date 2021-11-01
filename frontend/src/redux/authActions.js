import {login, signup} from '../api/apiCalls'

export const logoutSuccess = ()=>{
    return{
        type:'logout-success'
    }
}

export const loginSuccess = (authData) => {
    return{
        type: 'login-success',
        payload:authData
    }
}

export const signupHandler = (user) =>{
    return async function(dispatch){
        const response = await signup(user)
        await dispatch(loginHandler(user))
        return response
    }
}

export const loginHandler = (credentials) => {
    return async function(dispatch){
        const response = await login(credentials)
        const authState = {
            ...response.data,
            password: credentials.password          
        }
       dispatch(loginSuccess(authState))
       return response
    }
}