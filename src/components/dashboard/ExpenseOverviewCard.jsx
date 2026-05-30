import { useCallback, useContext, useMemo, useState } from "react"
import { ExpenseContext } from "../../globalcontext/ExpenseContext";
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ExpenseOverviewCard(){

    const {transactions} = useContext(ExpenseContext)
    //Filter state for the chart 
    const [filter, setFilter] = useState('This Month');

   const filteredTransactions = useMemo(() => {

  const now = new Date()

  return transactions.filter((item) => {

    // Skip invalid dates
    if (!item.date) return false

    const transactionDate = new Date(item.date)

    // Invalid date check
    if (isNaN(transactionDate)) return false

    // THIS MONTH
    if (filter === "This Month") {

      return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear()
      )
    }

    // LAST MONTH
    if (filter === "Last Month") {

      const lastMonthDate = new Date()

      lastMonthDate.setMonth(
        now.getMonth() - 1
      )

      return (
        transactionDate.getMonth() ===
          lastMonthDate.getMonth() &&
        transactionDate.getFullYear() ===
          lastMonthDate.getFullYear()
      )
    }

    // THIS YEAR
    if (filter === "This Year") {

      return (
        transactionDate.getFullYear() ===
        now.getFullYear()
      )
    }

    return true
  })

}, [transactions, filter])

    //Filtering only expense transactions
    const expenseTransactions = filteredTransactions.filter((item) => 
        
            item.type === 'Expense'
       
    )
//console.log(expenseTransactions)
    //Calculating the total expense 
    const totalExpense = expenseTransactions.reduce((acc,item) => {
        return(
             acc + item.amount
        )
       
    },0)

    //Grouping data for chart 
    // Example output : [{ date: 'May 1' , amount : '200'}]
    const chartDataMap = {}

    expenseTransactions.forEach((item) => {
        
        const formattedDate = new Date(item.date).toLocaleDateString(
            "en-IN",
            {
                month: "short",
                day: "numeric"
            }
        )

        if(!chartDataMap[formattedDate]){
            chartDataMap[formattedDate] = {
                date: formattedDate,
                amount: 0
            }
        }

        //Add expense amount
        chartDataMap[formattedDate].amount += item.amount
    })
    //Convert object to array 
    const chartData = Object.values(chartDataMap)

    //Highest expense calculation
    const highestExpense = Math.max(
        ...chartData.map((item) => item.amount), 0
    )

    //Percentage change 
    const percentage = highestExpense > 0 
                            ? ((totalExpense/highestExpense) * 10).toFixed(1)
                            : 0


//     console.log("Transactions:", transactions)

// console.log("Expense Transactions:", expenseTransactions)

// console.log("Chart Map:", chartDataMap)

// console.log("Chart Data:", chartData)

    return(
        <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        p-6
        w-full
      "
    >

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Expense Overview
          </h2>

          <p className="text-gray-500 mt-1">
            Track your spending analytics
          </p>

        </div>

        {/* FILTER DROPDOWN */}
        <select

          value={filter}

          onChange={(e) =>
            setFilter(e.target.value)
          }

          className="
            border
            border-gray-200
            rounded-xl
            px-4
            py-2
            text-sm
            outline-none
          "
        >

          <option>This Month</option>

          <option>Last Month</option>

          <option>This Year</option>

        </select>

      </div>

      {/* ======================================
          TOTAL EXPENSE SECTION
      ====================================== */}

      <div className="mb-6">

        <h3 className="text-gray-500 text-sm">
          Total Expenses
        </h3>

        <div className="flex items-center gap-3 mt-2">

          {/* TOTAL EXPENSE */}
          <h1 className="text-4xl font-bold text-gray-900">
            ₹{totalExpense}
          </h1>

          {/* PERCENTAGE BADGE */}
          <span
            className="
              bg-red-100
              text-red-500
              text-sm
              px-3
              py-1
              rounded-full
            "
          >
            +{percentage}%
          </span>

        </div>

      </div>

      {/* ======================================
          CHART SECTION
      ====================================== */}

      <div className="h-[300px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={chartData}>

            {/* Gradient */}
            <defs>

              <linearGradient
                id="expenseGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            {/* X Axis */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            {/* Y Axis */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.08)",
              }}
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#22c55e"
              strokeWidth={4}
              fill="url(#expenseGradient)"
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#22c55e",
              }}
              activeDot={{
                r: 8,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
    )
}