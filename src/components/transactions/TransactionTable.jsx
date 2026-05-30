import { useContext, useState } from "react"
import Table from "../common/Table"
import { ExpenseContext } from "../../globalcontext/ExpenseContext"
import Searchbar from "../common/Searchbar";
import FilterDropdown from "../common/FilterDropdown";
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

    const { transactions, deleteTransaction,
        setEditTransactions } = useContext(ExpenseContext);

    const [search, setSearch] = useState('')

    const [filter, setFilter] = useState('All')

    const filteredTransactions = transactions.filter((item) => {

        //Search matching
        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase())

        //Filter matching
        const matchesFilter =
            filter === 'All'
                ? true
                : item.type === filter

        return (
            matchesSearch && matchesFilter
        )
    }
    )

    const columns = [
        'Title',
        'Category',
        'Type',
        'Amount',
        'Actions'
    ]
    return (
        <>
            <div className="flex justify-between mb-6 items-center mt-4">
                <div className="flex gap-3 ">
                    <Searchbar
                        search={search}
                        setSearch={setSearch}

                    />

                    <FilterDropdown
                        filter={filter}
                        setFilter={setFilter}
                    />

                    
                </div>
            </div>
            <Table
                columns={columns}
                data={filteredTransactions}
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
                        <td className="py-4 px-2 flex gap-2">

                            {/* Edit Button */}
                            <button

                                onClick={() =>{
                                   // console.log('EDIT BUTTON WORKING')
                                    setEditTransactions(item)}
                                }

                                className="
                             bg-blue-100
                                text-blue-500
                                px-4
                                py-2
                                rounded-lg
                                hover:bg-blue-200
                                transition
                                "
                            >
                                Edit
                            </button>

                            {/* Delete Button */}
                            <button

                                onClick={() =>
                                    deleteTransaction(item.id)
                                }

                                className="
                                bg-red-100
                                text-red-500
                                px-4
                                py-2
                                rounded-lg
                                hover:bg-red-200
                                transition
                                "
                            >
                                Delete
                            </button>

                        </td>
                    </tr>
                )}
            >

            </Table>
        </>
    )
}