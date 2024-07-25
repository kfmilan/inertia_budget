import { useForm } from "@inertiajs/react";
import Dropdown from "../Components/Dropdown";

export default function CreateTransaction({ account, accountList }) {
    const { data, setData, post, errors, processing, defaultValue } = useForm({
        account_id: `${account.id}`,
        account_id2: "",
        amount: "",
        description: "",
    });

    function submit(e) {
        e.preventDefault();
        post(`/accounts/${account.id}/transactions`);
    }

    console.log(accountList);
    console.log(data);
    return (
        <>
            <div>
                <h1 className="font-bold">Create new Transaction</h1>

                <div className="w-1/2 mx-auto">
                    <form onSubmit={submit}>
                        <div className="flex flex-col mb-4">
                            <Dropdown
                                name="account_id1"
                                label="Account"
                                options={accountList}
                                defaultValue={account.id}
                                onChange={(e) =>
                                    setData("account_id", e.target.value)
                                }
                            ></Dropdown>
                        </div>
                        <div className="flex flex-col mb-4">
                            <Dropdown
                                name="account_id2"
                                label="Account 2"
                                options={accountList}
                                defaultValue="message"
                                defaultMessage="Choose a second account"
                                onChange={(e) =>
                                    setData("account_id2", e.target.value)
                                }
                            ></Dropdown>
                        </div>
                        <div className="flex flex-col mb-4">
                            {" "}
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="text"
                                placeholder="Amount"
                                name="amount"
                                className={`input input-bordered w-full ${
                                    errors.amount ? "!ring-red-500" : ""
                                }`}
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                placeholder="Description"
                                name="description"
                                className={`input input-bordered w-full ${
                                    errors.description ? "!ring-red-500" : ""
                                }`}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                        </div>
                        {errors.account_id && (
                            <p className="text-red-500">{errors.account_id}</p>
                        )}
                        {errors.account_id2 && (
                            <p className="text-red-500">{errors.account_id2}</p>
                        )}
                        {errors.amount && (
                            <p className="text-red-500">{errors.amount}</p>
                        )}
                        {errors.description && (
                            <p className="text-red-500">{errors.description}</p>
                        )}
                        <button
                            className="primary-btn mt-5"
                            disabled={processing}
                        >
                            Create Transaction
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
