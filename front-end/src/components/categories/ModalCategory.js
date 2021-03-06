import React from 'react';
import Modal from 'react-modal';

const ModalCategory = ({ isOpen, closeModal, category, insertCategory, handleChange }) => {
    return (
        <div>
            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={isOpen}>
                
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cadastro de Category</h5>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <form onSubmit={insertCategory}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Name" value={category.name} onChange={handleChange.bind(this)} required/>
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

export default ModalCategory;