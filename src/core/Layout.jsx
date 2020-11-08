import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { isAuth, signOut } from '../auth/Helpers';

const Layout = ({ children, match, history }) => {

    const isActive = (path) => {
        if (match.path === path) {
            return { color: "#000" }
        } else {
            return { color: "#fff" }
        }
    }

    const nav = () => (
        <Fragment>
            <ul className="nav nav-tabs bg-primary mr-auto p-2 justify-content-between">
                <li className="nav-item rounded">
                    <Link to="/" className='nav-link' style={isActive('/')}>Home</Link>
                </li>

                {!isAuth() && (
                    <div className="nav">
                        <li className="nav-item rounded">
                            <Link to="/signup" className='nav-link' style={isActive('/signup')}>SignUp</Link>
                        </li>
                        <li className="nav-item rounded">
                            <Link to="/signin" className='nav-link' style={isActive('/signin')}>SignIn</Link>
                        </li>
                    </div>
                )}

                {isAuth() && (
                    <div className="nav">
                        <li className="nav-item rounded">
                            <Link className='nav-link' to={isAuth().role === 'admin' ? '/admin' : '/private'} style={{ cursor: "pointer", color: "#fff" }, isActive(isAuth().role === 'admin' ? '/admin' : '/private')}>{isAuth().name}</Link>
                        </li>
                        <li className="nav-item rounded">
                            <span className='nav-link' style={{ cursor: "pointer", color: "#fff" }} onClick={() => {
                                signOut(() => {
                                    history.push('/');
                                })
                            }}>SignOut</span>
                        </li>
                    </div>
                )}
            </ul>
        </Fragment>
    );

    return (
        <Fragment>
            {nav()}
            <div className="container">
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);
