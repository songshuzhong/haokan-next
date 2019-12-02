import React from 'react';

export class ProgressiveImage extends React.Component<any, any> {
    image: HTMLImageElement;
    constructor(props) {
        super(props);
        this.state = {
            image: props.placeholder,
            loading: true,
            srcSetData: { srcSet: '', sizes: '' }
        };
    }

    componentDidMount() {
        const { src, srcSetData } = this.props;
        this.loadImage(src, srcSetData);
    }

    componentDidUpdate(prevProps) {
        const { src, placeholder, srcSetData } = this.props;
        if (src !== prevProps.src) {
            this.setState({ image: placeholder, loading: true }, () => {
                this.loadImage(src, srcSetData);
            });
        }
    }

    componentWillUnmount() {
        if (this.image) {
            this.image.onload = null;
            this.image.onerror = null;
        }
    }

    loadImage = (src, srcSetData) => {
        if (this.image) {
            this.image.onload = null;
            this.image.onerror = null;
        }
        const image = new Image();
        this.image = image;
        image.onload = this.onLoad;
        image.onerror = this.onError;
        image.src = src;
        if (srcSetData) {
            image.srcset = srcSetData.srcSet;
            image.sizes = srcSetData.sizes;
        }
    };

    onLoad = () => {
        if (this.props.delay) {
            this.setImageWithDelay();
        } else {
            this.setImage();
        }
    };

    setImageWithDelay = () => {
        setTimeout(() => {
            this.setImage();
        }, this.props.delay);
    };

    setImage = () => {
        this.setState({
            image: this.image.src,
            loading: false,
            srcSetData: {
                srcSet: this.image.srcset || '',
                sizes: this.image.sizes || ''
            }
        });
    };

    onError = (errorEvent: Event) => {
        const { onError } = this.props;
        if (onError) {
            onError(errorEvent);
        }
    };

    render() {
        const { image, loading, srcSetData } = this.state;
        const { children } = this.props;

        if (!children || typeof children !== 'function') {
            throw new Error(`ProgressiveImage requires a function as its only child`);
        }

        return children(image, loading, srcSetData);
    }
}