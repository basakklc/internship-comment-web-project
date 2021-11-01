import React, { useEffect, useState } from 'react';
import Input from '../components/Input';

import {login} from '../api/apiCalls'

import ButtonWithProgress from '../components/ButtonWithProgress'
import { useApiProgress, withApiProgress } from '../shared/ApiProgress';
import {useDispatch} from 'react-redux'
import {loginHandler, loginSuccess} from '../redux/authActions'


const LoginPage = (props) => {
    
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const dispatch = useDispatch()
   
    useEffect(()=> {
        setError(undefined)

    },[username,password])


    const onClickLogin = async event =>{
        event.preventDefault();
        const creds = {
            username: username,
            password: password
        }
        

        const { history } = props
        const { push } = history

        setError(null)
        try{
           await dispatch(loginHandler(creds))      
           push('/')
        }catch(apiError){ //axios un ürettiği bir obje
            setError(apiError.response.data.message)  
        }
        
    }

  

        const pendingApiCall  = useApiProgress('/api/1.0/auth')
       
        const buttonEnabled = username && password;

        return (
            <div className="container">
                <h1 className="text-center">Login</h1>
                <form>
                    <Input label="Username" name="username" onChange={(event) => { setUserName(event.target.value)}} />
                    <Input label="Password" name="password" type="password"onChange ={ (event)=> {setPassword(event.target.value)}} />
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <div className="text-center">
                        <ButtonWithProgress 
                            onClick={onClickLogin} 
                            disabled={!buttonEnabled || pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text="Login"/>
                         
                    </div>
                    
                </form>
            </div>
        );
    }

const mapDispatchToProps = (dispatch) =>{
    return{
        onLoginSuccess: (authState)=>{
            return dispatch(loginSuccess(authState))
        }
    }
}
export default LoginPage