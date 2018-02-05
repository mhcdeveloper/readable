import React from 'react';
import { Link } from 'react-router-dom';

const PageError = () => {
    return (
        <div className="card">
            <div className="card-block">
                <div className="btn-card-post">
                    <Link to="/" className="btn btn-primary"><i className="glyphicon glyphicon-arrow-left"></i></Link>
                </div>
                <div className="card-page-error">
                    <h3 className="card-title">Não existe o post com esse id</h3>
                </div>
            </div>
        </div>           
    )
}

export default PageError;