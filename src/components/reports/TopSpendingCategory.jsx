import { useContext } from "react";
import { ExpenseContext } from "../../globalcontext/ExpenseContext";

export default function TopSpendingCategoryCard({}){

    const {transactions} = useContext(ExpenseContext);

    //Expense transactions only 
    const expenseTransactions = transactions.filter((transaction) => transaction.type === 'Expense')

    console.log('expenseTransactions', expenseTransactions)
    //Total Expenses 
    const totalExpense = expenseTransactions.reduce((acc,curr) => 
        acc + curr.amount,
        0
    )

    //Group By Category 
    const categoryData = expenseTransactions.reduce((acc, transaction) => {
        const category = transaction.category;

        if(acc[category]){
            acc[category] += transaction.amount
        }else{
            acc[category] = transaction.amount
        }

        return acc;
    },
    {}
)
    console.log('Category data', categoryData)

    //convert object to array
    const formattedCategories = Object.entries(
    categoryData
  )
    .map(([category, amount]) => ({
      category,
      amount,
      percentage:
        totalExpense > 0
          ? ((amount / totalExpense) * 100).toFixed(1)
          : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

    console.log('Formatted categories', formattedCategories)

    //Get category by color 
    const getCategoryColor = (category) => {
        switch(category) {
            case "Food":
        return "bg-orange-500";

      case "Travel":
        return "bg-blue-500";

      case "Bills":
        return "bg-red-500";

      case "Shopping":
        return "bg-green-500";

      case "Entertainment":
        return "bg-purple-500";

      default:
        return "bg-slate-500";
        }
    }
    console.log('Get Category by color', getCategoryColor)
   
        return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900">
          Top Spending Categories
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Highest expense categories this month
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {formattedCategories.map((item, index) => (
          <div key={item.category}>
            {/* Top Row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-700 w-5">
                  #{index + 1}
                </span>

                <div
                  className={`w-3 h-3 rounded-full ${getCategoryColor(
                    item.category
                  )}`}
                />

                <span className="font-medium text-slate-800">
                  {item.category}
                </span>
              </div>

              <div className="text-right">
                <h4 className="font-bold text-slate-900">
                  ₹{item.amount.toLocaleString()}
                </h4>

                <p className="text-xs text-slate-500">
                  {item.percentage}%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getCategoryColor(
                  item.category
                )}`}
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 mt-8 pt-4">
        <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
          View Detailed Breakdown →
        </button>
      </div>
    </div>
  );
    

}