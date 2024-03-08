import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="navbar bg-base-100">
                <Link className="btn btn-ghost text-xl" href="/">
                    Home
                </Link>
                <Link className="btn btn-ghost text-xl" href="/contact">
                    Contact
                </Link>
            </div>
        </>
    );
}
