import React from 'react';
import logo from '../assets/geeks.jpg'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../redux/authActions';
const TopBar = (props) =>  {

        const { username, isLoggedIn } = useSelector(store => {
            return{
                isLoggedIn: store.isLoggedIn,
                username: store.username
        
            }
        })

        const dispatch = useDispatch();

        const onLogoutSuccess = () => {
            dispatch(logoutSuccess())
        }
   

                let links = (
                    <ul className="navbar-nav ml-auto">
                    <li>
                        <Link className="nav-link" to="/login">
                        Login</Link></li>
                    <li>
                        <Link className="nav-link" to="/signup">
                        Sign Up</Link></li>
                    </ul>
                )
        
                if(isLoggedIn){
                    links = (
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-link" to ={"/user/" + username} >{username}</Link>
                            <li className="nav-link" onClick={onLogoutSuccess} style = {{cursor: 'pointer'}}>Logout</li>
                        </ul>
                    )
                }
        
                return (
                    <div className="shadow-sm bg-light mb-2">
                     <nav className="navbar navbar-light bg-light container navbar-expand">
                            <Link className="navbar-brand" to="/">
                                <img src={logo} width="60"/>Yorumla</Link>
                            {links}
                     </nav> 
                </div>
                );


    
}

// const mapStateToProps = (store) => { // redux store = state bilgisini top bar component. almayı sağlar.
//     return{
//         isLoggedIn: store.isLoggedIn,
//         username: store.username

//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onLogoutSuccess:() => dispatch(logoutSuccess())
//     }
// }
export default TopBar;
