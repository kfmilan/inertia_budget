import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";
import EditTransaction from "../Transactions/EditTransaction";

export default function Show({ account, transactions }) {
    const { delete: destroy } = useForm();
    const route = useRoute();

    const { component } = usePage();

    function submit(e) {
        e.preventDefault();
        destroy(route("accounts.destroy", account));
    }
    return (
        <>
            <Head title={component} />

            <div key={account.id} className="p-4 border-b">
                <div className="text-gray-700 text-sm"></div>
                <p className="text-2xl font-bold">{account.name}</p>
                <p className="text-lg text-gray-600">
                    Php{" "}
                    {Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                    }).format(account.balance)}
                </p>

                <div className="flex items-center justify-end gap-2">
                    <Link
                        href={route("accounts.transactions.create", account)}
                        className="bg-blue-800 text-white px-4 py-2 rounded-md"
                    >
                        Add Transaction
                    </Link>
                    <Link
                        href={route("accounts.edit", account)}
                        className="bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                        Update
                    </Link>
                    <form onSubmit={submit}>
                        <button className="bg-red-700 text-white px-4 py-2 rounded-md">
                            Delete
                        </button>
                    </form>
                </div>
            </div>

            <div>
                {transactions.map((transaction) => (
                    <EditTransaction
                        account={account}
                        transaction={transaction}
                        key={transaction.id}
                    />
                ))}
            </div>
        </>
    );
}
