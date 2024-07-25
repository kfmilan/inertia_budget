import Layout from "@/Layouts/Layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useState } from "react";

export default function Home({ accounts }) {
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
            <div className="w-full font-bold text-xl">
                <h1 className="w-fit mx-auto">Accounts</h1>
            </div>
            {flashMsg && (
                <div className="toast toast-top toast-start">
                    <div className="alert alert-info">
                        <span>{flashMsg}</span>
                    </div>
                </div>
            )}

            <div>
                {accounts.data.length == 0 ? (
                    <div className="w-1/2 mx-auto flex flex-col items-center">
                        <p className="text-gray-600">No accounts found</p>
                        <Link
                            href={route("accounts.create")}
                            className="text-blue-600 font-semibold text-sm"
                        >
                            Create Account
                        </Link>
                    </div>
                ) : (
                    accounts.data.map((account) => (
                        <div key={account.id} className="p-4 border-b">
                            <div className="text-gray-700 text-sm">
                                <span>Created on: </span>
                                <span>
                                    {new Date(
                                        account.created_at
                                    ).toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="font-medium">
                                {account.name} : {account.balance}
                            </p>
                            <Link
                                href={route("accounts.show", account)}
                                className="text-blue-600 font-semibold text-sm"
                            >
                                Open Account
                            </Link>
                        </div>
                    ))
                )}
            </div>

            <div className="py-10 w-full mx-auto flex content-center">
                {accounts.links.map((link) =>
                    link.url ? (
                        <Link
                            preserveScroll
                            key={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`p-1 mx-1 ${
                                link.active ? "text-blue-500 font-bold" : ""
                            }`}
                        />
                    ) : (
                        <span
                            key={link.label}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="p-1 mx-1 text-slate-300"
                        ></span>
                    )
                )}
            </div>
        </>
    );
}
