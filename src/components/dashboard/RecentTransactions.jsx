import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useContext } from "react";
import { ExpenseContext } from "../../globalcontext/ExpenseContext";

// const transactions = [
//   {
//     id: 1,
//     title: "Swiggy",
//     category: "Food",
//     date: "Today • 1:20 PM",
//     amount: -450,
//   },
//   {
//     id: 2,
//     title: "Salary Credit",
//     category: "Income",
//     date: "Yesterday • 9:00 AM",
//     amount: 45000,
//   },
//   {
//     id: 3,
//     title: "Uber",
//     category: "Travel",
//     date: "May 28 • 7:45 PM",
//     amount: -320,
//   },
//   {
//     id: 4,
//     title: "Netflix",
//     category: "Entertainment",
//     date: "May 27 • 10:00 AM",
//     amount: -649,
//   },
//   {
//     id: 5,
//     title: "Electricity Bill",
//     category: "Bills",
//     date: "May 26 • 5:30 PM",
//     amount: -1850,
//   },
// ];


export default function RecentTransactions() {

    const {transactions} = useContext(ExpenseContext)
const getCategoryColor = (category) => {
  switch (category) {
    case "Food":
      return "bg-orange-100 text-orange-600";

    case "Travel":
      return "bg-blue-100 text-blue-600";

    case "Bills":
      return "bg-red-100 text-red-600";

    case "Entertainment":
      return "bg-purple-100 text-purple-600";

    case "Income":
      return "bg-green-100 text-green-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
};

    const recentTransactions = [...transactions]
  .sort(
    (a, b) =>
      new Date(b.date) - new Date(a.date)
  )
  .slice(0, 3);

   // console.log('exp transaction', recentTransactions)

 
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Transactions
          </h2>

          <p className="text-gray-500 mt-1">
            Latest account activity
          </p>
        </div>

        <button className="text-green-600 font-semibold hover:text-green-700">
          View All →
        </button>
      </div>

      {/* Search */}
      {/* <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search transaction..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div> */}

      {/* Transactions */}
      <div className="space-y-4">
        {recentTransactions.map((transaction) => {


          const isIncome = transaction.type === 'Income';

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isIncome
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {isIncome ? (
                    <ArrowDownLeft
                      className="text-green-600"
                      size={20}
                    />
                  ) : (
                    <ArrowUpRight
                      className="text-red-500"
                      size={20}
                    />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {transaction.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {transaction.date}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(
                    transaction.category
                  )}`}
                >
                  {transaction.category}
                </span>

                <h4
                  className={`font-bold ${
                    isIncome
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {isIncome ? "+" : "-"}₹
                  {Math.abs(
                    transaction.amount
                  ).toLocaleString()}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}