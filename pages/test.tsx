import Head from "next/head";
import Link from "next/link";

export default function test() {
    return (
        <div>
            <Head>
                <title>Tom Test</title>
            </Head>
            <h1>My Big Test</h1>
            <Link href={"/"}>
                <h2>Return Home</h2>
            </Link>
        </div>
    )
}