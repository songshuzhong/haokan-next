import React, {Component} from 'react';

export default class LazyImg extends Component<any, any> {
    private ref = null;
    constructor(props) {
        super(props);
        this.state = {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559998138555&di=b689ed7dfc64136bf6e892204042a827&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170720%2Fcd59c28a4c6d49bc8b4ecfcdffbc04f1_th.png',
            loaded: false
        }

    }

    loadImg = () => {
        if(!this.props.src) {
            return
        }
        this.setState({
            src: this.props.src,
            loaded: true
        });
    }

    componentDidMount() {
        if(this.ref.getBoundingClientRect().top < window.innerHeight) {
            this.loadImg();
        }

        window.addEventListener('scroll', () => {
            if(this.state.loaded) return;
            if(this.ref.getBoundingClientRect().top < window.innerHeight) {
                this.loadImg()
            }
        }, true);

    }

    render() {
        const {
            src,
            ...listprop

        } = this.props;

        return <img src={src} {...listprop} ref={ref => this.ref = ref} />
    }

}
