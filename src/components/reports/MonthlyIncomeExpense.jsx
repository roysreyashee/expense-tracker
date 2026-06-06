import { useContext } from "react"
import { ExpenseContext } from "../../globalcontext/ExpenseContext"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MonthlyIncomeExpense() {

    const { transactions } = useContext(ExpenseContext);

    console.log('transaction data ', transactions)

    const groupedData = transactions.reduce((acc, transaction) => {

        //Exptracting the month value
        const month = new Date(transaction.date).toLocaleString("default", {
            month: "short"
        })

        //finding whether the month selected is matching with the transaction from transactions data
        const existing = acc.find((item) =>
            (item.month === month)
        )

        //If the month exists then add the expense or income amount based on the type accordingly
        if (existing) {
            if (transaction.type === 'Income') {
                existing.income += transaction.amount
            } else {
                existing.expense += transaction.amount
            }
        } else {
            acc.push({
                month,
                income: transaction.type === 'Income' ? transaction.amount : 0,
                expense: transaction.type === 'Expense' ? transaction.amount : 0,
            })
        }

        return acc;

    }, [])
    console.log('grp data', groupedData);
    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Income vs Expense
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                        Monthly financial comparison
                    </p>
                </div>

                <select className="border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none">
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>

            {/* Chart */}
            <div className="h-[350px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={groupedData}
                        barGap={8}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#f1f5f9"
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "16px",
                                border: "none",
                                boxShadow:
                                    "0px 8px 30px rgba(0,0,0,0.08)",
                            }}
                        />

                        <legend />

                        <Bar
                            dataKey="income"
                            fill="#10b981"
                            radius={[10, 10, 0, 0]}
                            name="Income"
                        />

                        <Bar
                            dataKey="expense"
                            fill="#ef4444"
                            radius={[10, 10, 0, 0]}
                            name="Expense"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
