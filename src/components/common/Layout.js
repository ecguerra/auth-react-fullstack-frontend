import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, logOut } from '../../services/auth.services'

const Layout = props => {
    const [showAdminBoard, setShowAdminBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)

        useEffect(() => {
            // grab getCurrentUser from the auth service
            const user = getCurrentUser()
            console.log(user)

            if(user) {
                // set current user to the currentUser state
                setCurrentUser(user)
                // check if the user has an admin role // return true or false
                setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
            }
        },[])

    // remove the user from local storage
    const logout = () => {
        logOut()
    }

    return (
        <div>
            <nav className='navbar navbar-expand navbar-dark bg-dark'>
                <Link to='/' className='navbar-brand'>Wooo</Link>
                <div className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link to={'/home'} className='nav-link'>
                            Home
                        </Link>
                    </li>
                    {showAdminBoard && (
                        <li className='nav-item'>
                            <Link to={'/admin'} className='nav-link'>
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className='nav-item'>
                            <Link to={'/user'} className='nav-link'>
                                User
                            </Link>
                        </li>
                    )}
                </div>
                {currentUser ? (
                <div className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <Link to={'/profile'} className='nav-link'>
                            {currentUser.username}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <a href='/login' className='nav-link' onClick={logout}>Logout</a>
                    </li>
                </div> )
                : (
                <div className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <Link to={'/login'} className='nav-link'>
                            Login
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={'/signup'} className='nav-link'>
                            Sign Up
                        </Link>
                    </li>
                </div>
                )}
            </nav>

            <div className='container mt-3'>{props.children}</div>
        </div>
    )
}

export default Layout