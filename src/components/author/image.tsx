import React, {useState, useEffect, useRef} from 'react';

const Image = props => {
    const {src, ...other} = props;
    const currentRef = useRef<HTMLInputElement>();
    const [loaded, setLoaded] = useState(false);
    const [url, setUrl] = useState('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559998138555&di=b689ed7dfc64136bf6e892204042a827&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170720%2Fcd59c28a4c6d49bc8b4ecfcdffbc04f1_th.png');

    const loadImg = () => {
        setUrl(src);
        setLoaded(true);
    };

    useEffect(() => {
        if (currentRef.current.getBoundingClientRect().top < window.innerHeight) {
            loadImg();
        }

        window.addEventListener('scroll', () => {
            if (loaded) return;
            if (currentRef.current.getBoundingClientRect().top < window.innerHeight) {
                loadImg();
            }
        }, true);
    }, []);

    return (<img src={url} {...other} ref={currentRef} />);
};

export {Image};
