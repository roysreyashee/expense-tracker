import { useContext } from "react"
import ExpenseChart from "./ExpenceChart"
import { ExpenseContext } from "../../globalcontext/ExpenseContext"

export default function SummaryCards() {

    const {transactions} = useContext(ExpenseContext);
    console.log(transactions)

    const income = transactions.filter((item) => item.type === 'Income').reduce((acc,curr) => acc + curr.amount,0)

    const expense = transactions.filter((item) => item.type === 'Expense').reduce((acc,curr) => acc + curr.amount, 0)

    const balance = income - expense

    const cards = [

        {
            title: 'Balance',
            amount: `$${balance}`,
            color: "text-slate-800"
        },
        {
            title: 'Income',
            amount: `$${income}`,
            color: "text-emerald-500"
        },
        {
            title: 'Expense',
            amount: `$${expense}`,
            color: "text-red-500"
        }

    ]
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {cards.map((card,index)=> (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h4 className="text-slate-500 mb-3">
                            {card?.title}
                        </h4>
                        <h2 className="text-3xl font-bold text-slate-800">
                            {card?.amount}
                        </h2>
                    </div>
                )
                        
                ) }
        </div>
    )
}