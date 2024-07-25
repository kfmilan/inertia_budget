import { Link } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";

export default function Layout({ children }) {
    const route = useRoute();

    return (
        <>
            <header>
                <nav>
                    <Link href={route("home")}>Home</Link>
                    <Link href="/accounts/create">Create</Link>
                </nav>
            </header>

            <main className="w-full mx-auto">{children}</main>
        </>
    );
}
