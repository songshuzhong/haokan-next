import React from 'react';
import { createPortal } from 'react-dom';

import '../src/styles/protal.less';

class Modal extends React.Component<any, any> {
    public element;
    constructor(props) {
        super(props);
        this.element = document.createElement('div');
    }

    componentDidMount(): void {
        const modal = document.createElement('div');
        modal.setAttribute('id', 'modal');
        modal.appendChild(this.element);
        document.body.appendChild(modal);
    }

    componentWillUnmount(): void {
        document.getElementById('modal').removeChild(this.element);
    }

    render() {
        return createPortal(this.props.children, this.element)
    }
}

export default class Index extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    toggleModal = () => this.setState({showModal: !this.state.showModal})

    render() {
        const { showModal } = this.state;

        return (
            <React.Fragment>
                <button className='modal-toggle-button' onClick={this.toggleModal}>
                  {!showModal ? 'open' : 'close'}
                </button>
                {
                    showModal ?
                        <Modal>
                            <h1>Heading</h1>
                            <button className='modal-close' onClick={this.toggleModal}>*</button>
                        </Modal> : null
                }
            </React.Fragment>
        );
    }
}
