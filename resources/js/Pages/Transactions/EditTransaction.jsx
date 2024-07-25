import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function EditTransaction({ account, transaction }) {
    let {
        data,
        setData,
        put,
        errors,
        processing,
        isDirty,
        cancel,
        setDefaults,
        reset,
        defaults,
    } = useForm({
        amount: transaction.amount,
        description: transaction.description,
    });

    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg] = useState(flash.message);

    setTimeout(() => {
        setFlashMsg(null);
    }, 2000);

    function submit(e) {
        e.preventDefault();
        put(`/accounts/${account.id}/transactions/${transaction.id}`, {
            onFinish: () => {
                setDefaults({
                    amount: data.amount,
                    description: data.description,
                });
                setData({
                    amount: data.amount,
                    description: data.description,
                });
            },
        });
    }

    console.log(usePage().props);
    console.log(flashMsg);
    return (
        <>
            {flashMsg && (
                <div className="toast toast-top toast-start">
                    <div className="alert alert-info">
                        <span>{flashMsg}</span>
                    </div>
                </div>
            )}
            <form>
                <div className="flex flex-row w-full border-b">
                    <div
                        className="p-4 flex flex-col w-full"
                        key={transaction.id}
                    >
                        <input
                            type="text"
                            defaultValue={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className={`input input-ghost w-full max-w-xs font-medium text-lg text-blue-950 p-0 h-fit ${
                                errors.description ? "!input-error" : ""
                            }`}
                        />
                        <div className="max-w-screen-lg items-center">
                            <span className="text-gray-800 p-0 font-medium">
                                ₱
                            </span>
                            <input
                                className={`input input-ghost w-full max-w-xs text-gray-600 p-0 h-fit ${
                                    errors.amount ? "!input-error" : ""
                                }`}
                                defaultValue={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    {isDirty && (
                        <div className="my-auto mx-5 flex flex-row justify-end w-full">
                            <Link
                                as="button"
                                className="btn btn-accent mx-2"
                                onClick={submit}
                            >
                                Update
                            </Link>
                            <Link
                                as="button"
                                className="btn btn-error mx-2"
                                onClick={cancel}
                            >
                                Cancel
                            </Link>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
}
