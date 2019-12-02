import Link from 'next/link';

export default props => (
    <div>
        <Link href={`/margin`} as={`${props.pageProps.basename}/margin`}>
            <a>margin</a>
        </Link>
        <Link href={`/skeleton`} as={`${props.pageProps.basename}/skeleton`}>
            <a>hoc</a>
        </Link>
    </div>
);
