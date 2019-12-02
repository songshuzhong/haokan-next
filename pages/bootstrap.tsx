import {ProgressiveImage} from '../src/components/author/progressive';
import '../src/styles/bootstrap.less';
const SM = 'https://farm2.staticflickr.com/1853/42944460370_e749cd18eb_b.jpg';
const MD = 'https://farm2.staticflickr.com/1867/30884025408_7e6907d2e4_b.jpg';
const LG = 'https://farm2.staticflickr.com/1875/42944459590_170ddf9fc8_b.jpg';
const Bootstrap = () => (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <ProgressiveImage src={MD} srcSetData={{srcSet: `${SM} 320w, ${MD} 700w, ${LG} 2000w`, sizes: '(max-width: 2000px) 100vw, 2000px'}}>
                    {(image, loading, srcSetData) => {
                        console.log(loading);
                        return (
                            <img
                                style={{height: '100vh', minWidth: '100%'}}
                                src={image}
                                srcSet={srcSetData.srcSet}
                                sizes={srcSetData.sizes}
                            />
                        );
                    }}
                </ProgressiveImage>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-6'>6</div>
            <div className='col-md-6'>6</div>
        </div>
        <div className='row'>
            <div className='col-md-4'>4</div>
            <div className='col-md-4'>4</div>
            <div className='col-md-4'>4</div>
        </div>
        <div className='row'>
            <div className='col-md-3'>3</div>
            <div className='col-md-3'>3</div>
            <div className='col-md-3'>3</div>
            <div className='col-md-3'>3</div>
        </div>
    </div>
);

export default Bootstrap;