import { Head, useForm, usePage } from "@inertiajs/react";

export default function Edit({ account }) {
    const { data, setData, put, errors, processing } = useForm({
        name: account.name,
        balance: account.balance,
    });

    function submit(e) {
        e.preventDefault();
        put(`/accounts/${account.id}`);
    }

    const { component } = usePage();

    return (
        <>
            <Head title={component} />
            <h1 className="font-bold">Update Account</h1>

            <div className="w-1/2 mx-auto">
                <form onSubmit={submit}>
                    <span>Name: {data.name}</span>
                    <textarea
                        rows="2"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={errors.name ? "!ring-red-500" : ""}
                    ></textarea>
                    <span>Amount</span>
                    <textarea
                        rows="2"
                        value={data.balance}
                        onChange={(e) => setData("balance", e.target.value)}
                        className={errors.balance ? "!ring-red-500" : ""}
                    ></textarea>

                    {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                    )}
                    {errors.balance && (
                        <p className="text-red-500">{errors.balance}</p>
                    )}

                    <button className="primary-btn mt-5" disabled={processing}>
                        Update account
                    </button>
                </form>
            </div>
        </>
    );
}
