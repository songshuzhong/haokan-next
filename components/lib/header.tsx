import Head from 'next/head';

export default (props) => (
    <div>
        <Head>
            <meta charSet="UTF-8"/>
            {
                props.metas.map(({name, content}, index) => <meta key={index} name={name} content={content}/>)
            }
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"/>
            <meta name="format-detection" content="telephone=no,email=no,adress=no"/>
            <title>{props.title || ''}</title>
            <link rel="dns-prefetch" href="//sv.bdstatic.com"/>
            <link rel="dns-prefetch" href="//vv.bdstatic.com"/>
            <link rel="shortcut icon" href="https://vv.bdstatic.com/static/videoui/img/favicon-4_f4b9465.ico" type="image/x-icon"/>
            <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
                (function flexible (window, document) {
                    var docEl = document.documentElement
                    var dpr = window.devicePixelRatio || 1
                    var maxWidth = 828;
                    // adjust body font size
                    function setBodyFontSize () {
                    if (document.body) {
                    document.body.style.fontSize = (12 * dpr) + 'px'
                    document.body.style.maxWidth = maxWidth + 'px';
                    document.body.style.margin = '0 auto';
                }
                    else {
                    document.addEventListener('DOMContentLoaded', setBodyFontSize)
                }
                }
                    setBodyFontSize();
                    // set 1rem = viewWidth / 10
                    function setRemUnit () {
                    var clientWidth = docEl.clientWidth > maxWidth ? maxWidth : docEl.clientWidth;
                    var rem = clientWidth / 10
                    docEl.style.fontSize = rem + 'px'
                }
                    setRemUnit()
                    // reset rem unit on page resize
                    window.addEventListener('resize', setRemUnit)
                    window.addEventListener('pageshow', function (e) {
                    if (e.persisted) {
                    setRemUnit()
                }
                })
                    // detect 0.5px supports
                    if (dpr >= 2) {
                    var fakeBody = document.createElement('body')
                    var testElement = document.createElement('div')
                    testElement.style.border = '.5px solid transparent'
                    fakeBody.appendChild(testElement)
                    docEl.appendChild(fakeBody)
                    if (testElement.offsetHeight === 1) {
                    docEl.classList.add('hairlines')
                }
                    docEl.removeChild(fakeBody)
                }
                }(window, document))
               ` }} />
            {
                props.scripts && props.scripts.map((script, index) => <script key={index} type='text/javascript' src={script} />)
            }
            {
                props.styles && props.styles.map((style, index) => <link key={index} rel='stylesheet' type='text/css' href={style} />)
            }
        </Head>
    </div>
)
