import Link from 'next/link';

export default props => (
    <div>
        <Link href={`/margin`} as={`${props.basename}/margin`}>
            <a>margin</a>
        </Link>
        <Link href={`/skeleton`} as={`${props.basename}/skeleton`}>
            <a>hoc</a>
        </Link>
    </div>
);
