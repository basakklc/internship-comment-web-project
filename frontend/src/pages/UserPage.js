import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard'
import {getUser} from '../api/apiCalls'
import {useApiProgress} from '../shared/ApiProgress'
import SpinnerComponent from '../components/Spinner';

const UserPage = props => {

    const [user,setUser] = useState({});
    const [notFound, setNotFound] = useState (false)
    const { username } = props.match.params

    const pendingApiCall = useApiProgress('/api/1.0/users/'+username)

    useEffect(()=>{
        const loadUser = async() => {
            try{
               const response = await getUser(username)
               setUser(response.data)
               setNotFound(false)
            }catch(error){
                setNotFound(true)
            }
        }
        loadUser()
     
    },[username])
    if(pendingApiCall){
        return(
           <SpinnerComponent/>
        )

    }

    if(notFound){
        return (
            <div className="alert alert-danger">
                User not found
            </div>
        )
    }

 
        
    
    return (
        <div className="container">
            <ProfileCard user={user} />

        </div>
    );
};

export default UserPage;