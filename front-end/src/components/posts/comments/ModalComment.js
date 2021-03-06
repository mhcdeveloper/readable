import React from 'react';
import Modal from 'react-modal';

const ModalComment = ({ isOpen, closeModal, comment, insertComment, handleChange }) => {
    return (
        <div>
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={isOpen}>
                
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cadastro de Comment</h5>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <form onSubmit={insertComment}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="hidden" name="id" value={comment.id} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="body">Body</label>
                                        <input type="text" name="body" className="form-control" id="body" placeholder="Descrição" value={comment.body} onChange={handleChange} required/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="author">Author</label>
                                        <input type="text" name="author" className="form-control" id="author" placeholder="Author" value={comment.author} onChange={handleChange} required/>
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

export default ModalComment;