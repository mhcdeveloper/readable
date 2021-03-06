import React from 'react';
import Modal from 'react-modal';

const ModalPost =  ({ isOpen, closeModal, post, insertPost, handleChange, categories }) => {
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
                                        <input type="hidden" name="id" value={post.id} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" name="title" className="form-control" id="title" placeholder="Title" value={post.title} onChange={handleChange.bind(this)} required/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="body">Body</label>
                                        <textarea type="text" rows="3" name="body" className="form-control" id="body" placeholder="Body" value={post.body} onChange={handleChange.bind(this)} required/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="author">Author</label>
                                        <input type="text" name="author" className="form-control" id="author" placeholder="Author" value={post.author} onChange={handleChange.bind(this)} required/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12">
                                    <label htmlFor="category">Categories</label>
                                    <select className="form-control" id="category" name="category" value={post.category} onChange={handleChange.bind(this)} required>
                                        {categories.map((category) => {
                                            return (
                                                <option key={category.name} value={category.name}>{category.name}</option>
                                            );
                                        })}
                                    </select>
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
    )
}

export default ModalPost;