import { useContext } from "react";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Target,
} from "lucide-react";

import { ExpenseContext } from "../../globalcontext/ExpenseContext";

export default function MonthlySummaryCard() {
  const { transactions } = useContext(ExpenseContext);

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const savings = income - expense;

  const savingsRate =
    income > 0
      ? ((savings / income) * 100).toFixed(1)
      : 0;

  const summaryItems = [
    {
      title: "Income",
      value: income,
      icon: TrendingUp,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Expense",
      value: expense,
      icon: TrendingDown,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      title: "Savings",
      value: savings,
      icon: PiggyBank,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  const getSavingsStatus = () => {
    if (savingsRate >= 40)
      return {
        text: "Excellent",
        color:
          "bg-emerald-100 text-emerald-600",
      };

    if (savingsRate >= 20)
      return {
        text: "Good",
        color: "bg-blue-100 text-blue-600",
      };

    return {
      text: "Needs Improvement",
      color:
        "bg-orange-100 text-orange-600",
    };
  };

  const status = getSavingsStatus();

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Monthly Summary
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Overview of your financial health
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${status.color}`}
        >
          {status.text}
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-slate-50 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`
                    w-12 h-12 rounded-2xl
                    flex items-center justify-center
                    ${item.iconBg}
                  `}
                >
                  <Icon
                    className={item.iconColor}
                    size={22}
                  />
                </div>
              </div>

              <p className="text-slate-500 text-sm">
                {item.title}
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-1">
                ₹{item.value.toLocaleString()}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Savings Rate */}
      <div className="bg-slate-50 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target
              size={18}
              className="text-emerald-600"
            />

            <span className="font-medium text-slate-700">
              Savings Rate
            </span>
          </div>

          <span className="font-bold text-slate-900">
            {savingsRate}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(
                savingsRate,
                100
              )}%`,
            }}
          />
        </div>

        <p className="text-sm text-slate-500 mt-3">
          You saved ₹
          {savings.toLocaleString()} this month.
        </p>
      </div>
    </div>
  );
}