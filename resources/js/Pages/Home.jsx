import Layout from "@/Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useState } from "react";

function Home({ accounts }) {
    const route = useRoute();
    const { flash } = usePage().props;
    const { component } = usePage();

    const [flashMsg, setFlashMsg] = useState(flash.message);

    setTimeout(() => {
        setFlashMsg(null);
    }, 2000);

    return (
        <>
            <Head title={component} />
            {flashMsg && <p>{flashMsg}</p>}
            <div>
                {accounts.data.map((account) => (
                    <div key={account.id} class="p-4 border-b">
                        <div class="text-gray-700 text-sm">
                            <span>Created on: </span>
                            <span>
                                {new Date(
                                    account.created_at
                                ).toLocaleTimeString()}
                            </span>
                        </div>
                        <p class="font-medium">
                            {account.name} : {account.balance}
                        </p>
                        <Link
                            href={route("accounts.show", account)}
                            class="text-blue-600 font-semibold text-sm"
                        >
                            Open Account
                        </Link>
                    </div>
                ))}
            </div>

            <div class="py-10">
                {accounts.links.map((link) =>
                    link.url ? (
                        <Link
                            preserveScroll
                            key={link.url}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            class={`p-4 mx-1 ${
                                link.active ? "text-blue-500 font-bold" : ""
                            }`}
                        />
                    ) : (
                        <span
                            key={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            class="p-1 mx-1 text-slate-300"
                        ></span>
                    )
                )}
            </div>
        </>
    );
}

Home.layout = (page) => <Layout children={page} />;

export default Home;
