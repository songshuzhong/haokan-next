import React from "react";
import {Renderer} from '../../scripts/decorator';
import "./index.less";

interface IProps {
    show?: boolean;
    children?: any;
    onOK(): void;
    onClose(): void;
}

interface IState {
    okText?: string;
    title?: string;
    closeText: string;
}

// @ts-ignore
@Renderer({test: 'modal'})
class Modal extends React.Component<IProps, IState> {
    private ref = null;
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            okText: props.okText || "确认",
            closeText: props.closeText || "取消"
        };
    }

    componentDidMount() {
        console.log(this.ref);
        this.ref.addEventListener('touchmove', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }, false);
        this.ref.addEventListener('scroll', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }, false);
    }

    render() {
        const { show, onOK, onClose, children } = this.props;
        const { title, okText, closeText } = this.state;
        const mapChild =
            Object.prototype.toString.call(children) === "[object Object]";

        return (
            <div
                ref={ref => this.ref = ref}
                className="modal-wrapper"
                style={{ display: show ? "block" : "none" }}
            >
                <div className="modal-mask">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{title}</h3>
                            <span className="close-modal-btn" onClick={onClose}>
                ×
              </span>
                        </div>
                        <div className="modal-body">
                            {mapChild ? (
                                React.Children.map(children, child => React.cloneElement(child))
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: children }} />
                            )}
                        </div>
                        <div className="modal-footer">
                            <div className="btn-cancel" onClick={onClose}>
                                {closeText}
                            </div>
                            <div className="btn-continue" onClick={onOK}>
                                {okText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { Modal };
export default Modal;
