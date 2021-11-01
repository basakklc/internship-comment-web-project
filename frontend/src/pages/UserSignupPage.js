import React, { useState } from 'react'
import {signup} from '../api/apiCalls'
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress'
import { useApiProgress } from '../shared/ApiProgress';
import {signupHandler} from '../redux/authActions'
import {useDispatch} from 'react-redux'
const UserSignupPage = (props) => {
    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    })
    
    const [errors, setErrors] = useState({})
    
    const dispatch = useDispatch()

    const onChange = event => {
        //const value = event.target.value //const name = event.target.name
        const{ name, value } = event.target
        const errorsCopy = {...errors}
        errorsCopy[name] = undefined
        
        setErrors(errorsCopy)
        const formCopy = {...form }
        formCopy[name] = value
        setForm(previousForm => {
            return {...previousForm,[name]:value}
        })
        
    }

    const onClickSignUp = async event => {
        event.preventDefault()
        const { history } = props
        const { push } = history
        const { username,displayName,password } = form
        const body = {
            username,
            displayName,
            password
        }

     
       
        try{
           await dispatch(signupHandler(body));
           push('/')
           
        }catch(error){
            if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors)
                // this.setState({ errors: error.response.data.validationErrors })
            }
           
      
        }
    }  
     
        
        const pendingApiCallSignup = useApiProgress('/api/1.0/users')
        const pendingApiCallLogin = useApiProgress('/api/1.0/auth')

        const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin
        const {username: usernameError, displayName:displayNameError, password:passwordError}= errors
        
        let passwordRepeatError
        if(form.password!=form.passwordRepeat){
            passwordRepeatError = 'Password mismatch'
        }

        return(
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input name="username" label="Username" error={usernameError} onChange={onChange}/>
                    <Input name="displayName" label="Display Name" error={displayNameError} onChange={onChange}/>
                    <Input name="password" label="Password" error={passwordError} onChange={onChange} type="password"/>
                    <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeatError} onChange={onChange} type="password"/>
                  
                    <div className="text-center">
                        <ButtonWithProgress 
                            onClick={onClickSignUp} 
                            disabled={pendingApiCall || passwordRepeatError != undefined}
                            pendingApiCall={pendingApiCall}
                            text="Sign up"/>
                            
                    </div>
                    

                </form>
            </div>
            

        )
    
}


export default UserSignupPage