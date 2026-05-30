import { useContext, useMemo, useState } from "react"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { ExpenseContext } from "../../globalcontext/ExpenseContext"

export default function ExpenseByCategoryCard() {

  // =========================================
  // GETTING TRANSACTIONS FROM CONTEXT API
  // =========================================

  const { transactions } =
    useContext(ExpenseContext)

  // =========================================
  // FILTER STATE
  // =========================================

  const [filter, setFilter] =
    useState("This Month")

  // =========================================
  // CATEGORY COLORS
  // =========================================

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f97316",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#f59e0b",
  ]

  // =========================================
  // FILTERING TRANSACTIONS
  // =========================================

  const filteredTransactions = useMemo(() => {

    const now = new Date()

    return transactions.filter((item) => {

      // Ignore invalid dates
      if (!item.date) return false

      const transactionDate =
        new Date(item.date)

      // THIS MONTH
      if (filter === "This Month") {

        return (
          transactionDate.getMonth() ===
            now.getMonth() &&

          transactionDate.getFullYear() ===
            now.getFullYear()
        )
      }

      // LAST MONTH
      if (filter === "Last Month") {

        const lastMonthDate =
          new Date()

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

  // =========================================
  // ONLY EXPENSE TRANSACTIONS
  // =========================================

  const expenseTransactions =
    filteredTransactions.filter(
      (item) =>
        item.type === "Expense"
    )

  // =========================================
  // GROUPING CATEGORY TOTALS
  // =========================================

  const categoryMap = {}

  expenseTransactions.forEach((item) => {

    if (categoryMap[item.category]) {

      categoryMap[item.category] +=
        Number(item.amount)

    } else {

      categoryMap[item.category] =
        Number(item.amount)
    }
  })

  // =========================================
  // TOTAL EXPENSE
  // =========================================

  const totalExpense =
    Object.values(categoryMap).reduce(
      (acc, value) => acc + value,
      0
    )

  // =========================================
  // CONVERTING TO CHART DATA
  // =========================================

  const data = Object.keys(categoryMap).map(
    (key, index) => {

      const value = categoryMap[key]

      // Percentage calculation
      const percentage =
        totalExpense > 0
          ? (
              (value / totalExpense) *
              100
            ).toFixed(0)
          : 0

      return {
        name: key,
        value,
        percentage: `${percentage}%`,
        color:
          COLORS[index % COLORS.length],
      }
    }
  )

  return (

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

      {/* =====================================
          HEADER
      ===================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          mb-8
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            Expenses by Category
          </h2>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Track where your money goes
          </p>

        </div>

        {/* FILTER */}
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

      {/* =====================================
          CONTENT
      ===================================== */}

      <div
        className="
          flex
          flex-col
          xl:flex-row
          items-center
          gap-8
        "
      >

        {/* =====================================
            CHART
        ===================================== */}

        <div
          className="
            relative
            w-full
            xl:w-[320px]
            h-[320px]
          "
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Tooltip />

              <Pie

                data={data}

                dataKey="value"

                innerRadius={80}

                outerRadius={100}

                paddingAngle={4}

                cornerRadius={8}

              >

                {data.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={entry.color}
                    />

                  )
                )}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

          {/* =====================================
              CENTER CONTENT
          ===================================== */}

          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
            "
          >

            <p
              className="
                text-gray-500
                text-sm
              "
            >
              Total
            </p>

            <h2
              className="
                text-3xl
                font-bold
                text-gray-900
              "
            >
              ₹
              {totalExpense.toLocaleString()}
            </h2>

          </div>

        </div>

        {/* =====================================
            CATEGORY LIST
        ===================================== */}

        <div
          className="
            flex-1
            w-full
            space-y-5
          "
        >

          {data.map((item, index) => (

            <div

              key={index}

              className="
                flex
                items-center
                justify-between
              "
            >

              {/* LEFT */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                {/* COLOR DOT */}
                <div
                  className="
                    w-3
                    h-3
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      item.color,
                  }}
                />

                {/* CATEGORY NAME */}
                <span
                  className="
                    text-gray-700
                    font-medium
                  "
                >
                  {item.name}
                </span>

              </div>

              {/* RIGHT */}
              <div
                className="
                  flex
                  items-center
                  gap-8
                "
              >

                {/* PERCENTAGE */}
                <span
                  className="
                    text-gray-500
                    text-sm
                  "
                >
                  {item.percentage}
                </span>

                {/* AMOUNT */}
                <span
                  className="
                    font-semibold
                    text-gray-900
                    min-w-[90px]
                    text-right
                  "
                >
                  ₹
                  {item.value.toLocaleString()}
                </span>

              </div>

            </div>

          ))}

          {/* =====================================
              BUTTON
          ===================================== */}

          <button
            className="
              mt-6
              w-full
              bg-blue-50
              hover:bg-blue-100
              transition-all
              text-blue-600
              font-semibold
              py-3
              rounded-2xl
            "
          >
            View Full Report →
          </button>

        </div>

      </div>

    </div>
  )
}