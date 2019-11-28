import Link from 'next/link';

export default props => (
    <div>
        <Link href={`/margin`} as={`${props.contextPath}/margin`}>
            <a>margin</a>
        </Link>
        <Link href={`/skeleton`} as={`${props.contextPath}/skeleton`}>
            <a>hoc</a>
        </Link>
    </div>
);
