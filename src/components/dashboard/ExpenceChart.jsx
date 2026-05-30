// Importing useContext hook
// This hook allows us to access global state
// from ExpenseContext
import { useContext } from 'react'

// Importing Recharts components
import {
  PieChart,             // Main chart container
  Pie,                  // Pie graph itself
  Cell,                 // Individual pie slice styling
  Tooltip,              // Tooltip shown on hover
  ResponsiveContainer   // Makes chart responsive
} from 'recharts'
import { ExpenseContext } from '../../globalcontext/ExpenseContext'

// Importing global Expense Context
// Gives access to transactions data


// Colors for pie chart slices
// Each category will get a different color
const COLORS = [
  '#22c55e', // Emerald
  '#3b82f6', // Blue
  '#f97316', // Orange
  '#ef4444'  // Red
]

export default function ExpenseChart() {

  // Accessing transactions from Context API
  const { transactions } = useContext(ExpenseContext)
 // console.log('Transaction', transactions)
  // =====================================================
  // FILTER ONLY EXPENSE TRANSACTIONS
  // =====================================================

  // We only want expense data for this chart
  // Income transactions are ignored
  const expenseTransactions = transactions.filter(

    // Keep only transactions whose type is Expense
    (item) => item.type === 'Expense'
  )

  // =====================================================
  // CREATE CATEGORY MAP
  // =====================================================

  // This object will store:
  // {
  //   Food: 500,
  //   Travel: 200,
  //   Shopping: 300
  // }

  const categoryMap = {}

  // Loop through every expense transaction
  expenseTransactions.forEach((item) => {

    // If category already exists
    if (categoryMap[item.category]) {

      // Add amount to existing category total
      categoryMap[item.category] += item.amount

    } else {

      // Otherwise create new category
      categoryMap[item.category] = item.amount
    }
  })

  // =====================================================
  // CONVERT OBJECT INTO ARRAY FORMAT
  // REQUIRED BY RECHARTS
  // =====================================================

  // Converts:
  // {
  //   Food: 500
  // }

  // Into:
  // [
  //   { name: 'Food', value: 500 }
  // ]

  const data = Object.keys(categoryMap).map((key) => ({

    // Category name
    name: key,

    // Total amount for that category
    value: categoryMap[key]
  }))

  // =====================================================
  // COMPONENT UI
  // =====================================================

  return (

    // Main chart card container
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-200'>

      {/* Chart Heading */}
      <div className='flex items-center justify-between mb-6'>

        <div>
          <h3 className='text-xl font-semibold text-slate-800'>
            Expenses by Category
          </h3>

          <p className='text-sm text-slate-500 mt-1'>
            Visual breakdown of your spending
          </p>
        </div>
      </div>

      {/* Responsive chart wrapper */}
      <ResponsiveContainer
        width='100%'
        height={300}
      >

        {/* Pie Chart Container */}
        <PieChart>

          {/* Pie Graph */}
          <Pie

            // Chart data
            data={data}

            // Radius of pie chart
            outerRadius={100}

            // Which property contains values
            dataKey='value'

            // Center positioning
            cx='50%'
            cy='50%'

            // Add spacing between slices
            paddingAngle={3}
          >

            {/* Loop through chart data */}
            {data.map((entry, index) => (

              // Individual pie slice
              <Cell

                // Unique key
                key={index}

                // Dynamic color assignment
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* Tooltip shown on hover */}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Category Legends */}
      <div className='flex flex-wrap gap-4 mt-6 justify-center'>

        {data.map((item, index) => (

          <div
            key={index}
            className='flex items-center gap-2'
          >

            {/* Color Indicator */}
            <div
              className='w-3 h-3 rounded-full'
              style={{
                backgroundColor:
                  COLORS[index % COLORS.length]
              }}
            />

            {/* Category Name */}
            <span className='text-sm text-slate-600'>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}