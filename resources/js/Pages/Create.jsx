import { Head, useForm, usePage } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        balance: "",
    });

    const { component } = usePage();

    function submit(e) {
        e.preventDefault();
        post("/accounts");
    }

    console.log(errors);

    return (
        <>
            <Head title={component} />
            <h1 class="font-bold">Create new Account</h1>

            <div class="w-1/2 mx-auto">
                <form onSubmit={submit}>
                    <span>Name: {data.name}</span>
                    <textarea
                        rows="4"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={errors.name ? "!ring-red-500" : ""}
                    ></textarea>
                    <span>Initial Amount</span>
                    <textarea
                        rows="4"
                        value={data.balance}
                        onChange={(e) => setData("balance", e.target.value)}
                        className={errors.balance ? "!ring-red-500" : ""}
                    ></textarea>

                    {errors.name && <p class="text-red-500">{errors.name}</p>}
                    {errors.balance && (
                        <p class="text-red-500">{errors.balance}</p>
                    )}

                    <button class="primary-btn mt-5" disabled={processing}>
                        Create account
                    </button>
                </form>
            </div>
        </>
    );
}
