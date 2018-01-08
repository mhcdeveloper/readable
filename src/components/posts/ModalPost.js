import React from 'react';
import Modal from 'react-modal';

const ModalPost = ({ isOpen, closeModal, post, insertPost, handleChange }) => {
    return (
        <div>
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={isOpen}>
                
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cadastro de Post</h5>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <form onSubmit={insertPost}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="titulo">Titulo</label>
                                        <input type="text" name="titulo" className="form-control" id="titulo" placeholder="Titulo" value={post.titulo} onChange={handleChange.bind(this)} required/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="corpo">Corpo</label>
                                        <input type="text" name="corpo" className="form-control" id="corpo" placeholder="Corpo" value={post.corpo} onChange={handleChange.bind(this)} required/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="autor">Autor</label>
                                        <input type="text" name="autor" className="form-control" id="autor" placeholder="Autor" value={post.autor} onChange={handleChange.bind(this)} required/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div>
                                        <button type="button" className="btn btn-info" onClick={closeModal}>Cancelar</button>
                                        <button className="btn btn-primary">Salvar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ModalPost;