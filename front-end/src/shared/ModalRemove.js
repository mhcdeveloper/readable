import React from 'react';
import Modal from 'react-modal';

const ModalRemove = ({ isOpen, closeModalRemove, removerRegistro, registro }) => {
    return (
        <div>
        <Modal
            className="Modal__Bootstrap modal-dialog"
            closeTimeoutMS={150}
            isOpen={isOpen}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Exclusão de registro!</h5>
                </div>
                <div className="modal-body">
                    <span>Deseja realmente excluir o registro ?</span>
                    <div className="modal-footer">
                        <button className="btn btn-info" onClick={() => closeModalRemove()}>Cancelar</button>
                        <button className="btn btn-primary" onClick={() => removerRegistro(registro)}>Remover</button>
                    </div>
                </div>
            </div>
        </Modal>
        </div>
    );
}

export default ModalRemove;