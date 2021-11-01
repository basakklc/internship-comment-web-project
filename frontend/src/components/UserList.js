import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/apiCalls'
import UserListItem from './UserListItem'
import {useApiProgress} from '../shared/ApiProgress'
import SpinnerComponent from './Spinner';

const UserList = () => {

    const [page, setPage]= useState({
            content: [],
            number:0,
            size:3
    })
    const [loadFailure, setLoadFailure]= useState(false)
    const pendingApiCall = useApiProgress('/api/1.0/users?page')

    useEffect(()=>{
        loadUsers()
    },[])

  const onClickNext = () =>{
        const nextPage = page.number+1
        loadUsers(nextPage)
    }
  const onClickPrevious = () => {
        const previousPage = page.number-1
        loadUsers(previousPage)
    }

  const  loadUsers = async page => {
    setLoadFailure(false)
      try{
        const response = await getUsers(page)
        setPage(response.data)
      }catch(error){
        setLoadFailure(true)
      }
    }

    const { content:users, last, first } = page
    let actionDiv = (
        <div>
                {last ==false && <button className="btn btn-sm btn-light float-right" onClick={onClickNext}>Next</button>}
                {first ==false && <button className="btn btn-sm btn-light" onClick={onClickPrevious}>Previous</button>}

            </div>
            
    )
    if(pendingApiCall){
        actionDiv = (
            <SpinnerComponent/>
        )
    }
    return (
        <div className="card">
            <h3 className ="card-header text-center">Users</h3>
            <div className="list-group-flush">
            { users.map(user => (
                <UserListItem className="list-group-item list-group-item-action" user = {user} />
            ))}
            </div>
            {actionDiv}
            {loadFailure && <div className="text-center text-danger">Load Failure</div>}
            
        </div>
    );  
    
}

export default UserList;