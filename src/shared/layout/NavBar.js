import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
                <Link to='/' className="navbar-brand">Readable</Link> 
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to='/posts' className="nav-link">Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/categories' className="nav-link">Category</Link>
                    </li>
                </ul>
            </div>
        </nav>    
    )
}

export default NavBar;