import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";

export default function Show({ account }) {
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
            <div key={account.id} class="p-4 border-b">
                <div class="text-gray-700 text-sm">
                    <span>Created on: </span>
                    <span>
                        {new Date(account.created_at).toLocaleTimeString()}
                    </span>
                </div>
                <p class="font-medium">
                    {account.name} : {account.balance}
                </p>

                <div class="flex items-center justify-end gap-2">
                    <form onSubmit={submit}>
                        <button class="bg-red-700 text-white px-4 py-2 rounded-md">
                            Delete
                        </button>
                    </form>
                    <Link
                        href={route("accounts.edit", account)}
                        class="bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                        Update
                    </Link>
                </div>
            </div>
        </>
    );
}
