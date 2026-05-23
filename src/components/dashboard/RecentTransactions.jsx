const transactions = [
  {
    title: 'Groceries',
    category: 'Food',
    amount: '-$65'
  },
  {
    title: 'Salary',
    category: 'Income',
    amount: '+$5000'
  }
]

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-800">
          Recent Transactions
        </h3>

        <button className="text-emerald-500 font-medium hover:text-emerald-600">
          View All
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          
          {/* Table Head */}
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-4 px-2 text-sm font-semibold text-slate-500">
                Title
              </th>

              <th className="text-left py-4 px-2 text-sm font-semibold text-slate-500">
                Category
              </th>

              <th className="text-left py-4 px-2 text-sm font-semibold text-slate-500">
                Amount
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transactions.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 hover:bg-slate-50 transition"
              >
                {/* Title */}
                <td className="py-4 px-2 font-medium text-slate-700">
                  {item.title}
                </td>

                {/* Category */}
                <td className="py-4 px-2">
                  <span className="bg-emerald-100 text-emerald-600 text-xs px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`py-4 px-2 font-semibold ${
                    item.amount.includes('-')
                      ? 'text-red-500'
                      : 'text-emerald-500'
                  }`}
                >
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}