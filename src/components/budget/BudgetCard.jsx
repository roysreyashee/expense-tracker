import { useContext, useState } from "react";
import { ExpenseContext } from "../../globalcontext/ExpenseContext";

export default function BudgetCard(){
    const {budget, setBudget, transactions} = useContext(ExpenseContext)

    const [isEditing, setIsEditing] = useState(false)
    const [budgetInput, setBudgetInput] = useState(budget);

    //Total expense only 
    const totalExpense = transactions.filter((item) => item.type === 'Expense').reduce((acc, item) => acc + item.amount, 0) 

    //Remeaining budget
    const remaining = budget - totalExpense;

    //Progress
    const progress = Math.min((totalExpense/budget)*100 , 100)
    return(
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">
                        Monthly Budget
                    </h2>
                    <p className="text-slate-500 text-sm mt-1"> 
                        Track Your Spending Limit
                    </p>
                </div>
                <div>

    {!isEditing ? (

        <button
            onClick={() => setIsEditing(true)}
            className="
                bg-emerald-500
                text-white
                px-4
                py-2
                rounded-xl
                hover:bg-emerald-600
                transition
            "
        >
            Set Budget
        </button>

    ) : (

        <div className="flex gap-3">

            <input
                type="number"
                value={budgetInput}
                onChange={(e) =>
                    setBudgetInput(e.target.value)
                }
                placeholder="Enter budget"
                className="
                    w-32
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-slate-300
                    outline-none
                    focus:ring-2
                    focus:ring-emerald-500
                "
            />

            <button
                onClick={() => {
                    console.log('Budget saved')
                    setBudget(Number(budgetInput))

                    setIsEditing(false)
                }}
                className="
                    bg-blue-500
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-blue-600
                    transition
                "
            >
                Save
            </button>

        </div>
    )}
</div>

            </div>
                {/* Budget stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <p className="text-sm text-slate-500">
                        Budget
                    </p>
                    <h3 className="text-xl font-bold mt-1">
                        ${budget}
                    </h3>
                </div>

                 <div className="bg-red-100 rounded-xl p-4">
                    <p className="text-sm text-red-500">
                        Spent
                    </p>

                    <h3 className="text-xl font-bold mt-1 text-red-500">
                        ${totalExpense}
                    </h3>
                </div>

                <div className="bg-emerald-100 rounded-xl p-4">
                    <p className="text-sm text-emerald-600">
                        Remaining
                    </p>

                    <h3 className="text-xl font-bold mt-1 text-emerald-600">
                        ${remaining}
                    </h3>
                </div>

        </div>
    )
}