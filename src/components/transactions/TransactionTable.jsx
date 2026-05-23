import { useContext } from "react"
import Table from "../common/Table"
import { ExpenseContext } from "../../globalcontext/ExpenseContext"
const data = [
    {
        title: "Groceries",
        category: "Food",
        type: "Expense",
        amount: "-$60",
    },
    {
        title: "Clothes",
        category: "Shopping",
        type: "Expense",
        amount: "-$100",
    },
    {
        title: "Salary",
        category: "Income",
        type: "Income",
        amount: "+$5000",
    },
]

export default function TransactionTable() {

    const { transactions, deleteTransaction } = useContext(ExpenseContext);



    const columns = [
        'Title',
        'Category',
        'Type',
        'Amount'
    ]
    return (
        <Table
            columns={columns}
            data={transactions}
            renderRow={(item, index) => (
                <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                    <td className="py-4 px-2 font-medium text-slate-700">
                        {item.title}
                    </td>
                    <td className="py-4 px-2">
                        <span className="bg-emerald-100 text-emerald-600 text-xs px-3 py-1 rounded-full font-medium">
                            {item.category}
                        </span>
                    </td>
                    <td className="py-4 px-2">
                        {item.type}
                    </td>
                    <td
                        className={`py-4 px-2 font-semibold ${item.type === 'Expense'
                                ? 'text-red-500'
                                : 'text-emerald-500'
                            }`}
                    >
                        ${item.amount}
                    </td>
                    <td className="py-4 px-2">

                        <button
                            onClick={() => deleteTransaction(item.id)}
                            className="bg-red-100 text-red-500 py-2 px-4 rounded-lg hover:bg-red-200 transition"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            )}
        >

        </Table>
    )
}