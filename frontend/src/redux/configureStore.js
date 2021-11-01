import {createStore, applyMiddleware, compose } from 'redux'
import authReducer from './authReducer'
import SecureLS from 'secure-ls'
import thunk from 'redux-thunk'
const secureLs = new SecureLS()


const getStateFromStorage = ()=>{
    
    const yorumAuth = secureLs.get('yorum-auth')

    let stateLocalStorage = {
        isLoggedIn: false,
        username : undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }
    if(yorumAuth){

        return  yorumAuth
    }
    return stateLocalStorage
}

const updateStateStorage = newState => {
    secureLs.set('yorum-auth',newState)
    
}

  const configureStore = ()=>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer,getStateFromStorage(),composeEnhancers(applyMiddleware(thunk)))
    store.subscribe(()=>{
        updateStateStorage(store.getState())
    })
    return store    
}
  export default configureStore