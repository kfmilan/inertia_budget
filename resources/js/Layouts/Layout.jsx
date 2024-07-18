import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <>
            <header>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="accounts/create">Create</Link>
                </nav>
            </header>

            <main class="max-w-screen-2xl mx-auto">{children}</main>
        </>
    );
}
