
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';
import {updateUser} from '../api/apiCalls'
const ProfileCard = props => {

    const [inEditMode, setInEditMode] = useState(false)
    const [updatedDisplayName, setUpdatedDisplayName] = useState()
    const {username : loggedInUsername} = useSelector((store)=>({ username: store.username}))
    const [user, setUser] =  useState({})

    useEffect(() =>{
        setUser(props.user)
    },[props.user])
    // const { user } = props
    const {username, displayName, image} = user

    useEffect(()=>{
        if(!inEditMode){
            setUpdatedDisplayName(undefined)
        }else{
            setUpdatedDisplayName(displayName)
        }
    }, [inEditMode, displayName])

    const onClickSave = async () => {
        const body = {
            displayName: updatedDisplayName
        }
        try{
            const response = await updateUser(username, body)
            setInEditMode(false)
            setUser(response.data)

        }catch(error){

        }
       
    }

    const pathUserName = props.match.params.username
    let message= "we cannot edit"
    if(pathUserName == loggedInUsername){
        message= "we can edit"
    }
   
    return (
        <div className = "card  text-center">
            <div className="card-header">
                <ProfileImageWithDefault 
                    className="rounded-circle shadow"
                    width ="200"
                    height="200" 
                    alt={username + 'profile'} 
                    image={image}/>
            </div>
           <div className = "card-body">
               { !inEditMode && 
                <div>
                    <h3>{displayName}@{username}</h3>
                   <button className="btn btn-success" onClick = {()=>setInEditMode(true)}>Edit</button>
                </div>

                }
                { inEditMode && 
                <div>
                    <Input label="Change display name" defaultValue={displayName} onChange={(event)=>{setUpdatedDisplayName(event.target.value)}}/>
                    <div>
                        <button className="btn btn-primary" onClick ={onClickSave}>Save</button>
                        <button className="btn btn-light ml-1" onClick={()=>setInEditMode(false)}>Close</button>
                    </div>
                </div>

                }
           </div>
        </div>
    );
               
};


  
export default withRouter(ProfileCard);
