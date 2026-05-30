import { useContext } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { ExpenseContext } from "../../globalcontext/ExpenseContext";

export default function SummaryCards() {
  const { transactions } = useContext(ExpenseContext);

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      icon: Wallet,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
      amountColor: "text-slate-900",
      subtitle: "Available Balance",
    },
    {
      title: "Income",
      amount: income,
      icon: TrendingUp,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      amountColor: "text-emerald-600",
      subtitle: "Money Received",
    },
    {
      title: "Expenses",
      amount: expense,
      icon: TrendingDown,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      amountColor: "text-red-500",
      subtitle: "Money Spent",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="
              bg-white
              rounded-3xl
              p-6
              border
              border-slate-100
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-500 text-sm font-medium">
                  {card.title}
                </p>

                <h2
                  className={`text-3xl font-bold mt-2 ${card.amountColor}`}
                >
                  ₹{card.amount.toLocaleString()}
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`
                  w-14 h-14
                  rounded-2xl
                  flex items-center justify-center
                  ${card.iconBg}
                `}
              >
                <Icon
                  size={28}
                  className={card.iconColor}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-500">
                This Month
              </span>

              <span
                className={`text-sm font-semibold ${
                  card.title === "Expenses"
                    ? "text-red-500"
                    : "text-emerald-500"
                }`}
              >
                {card.title === "Expenses"
                  ? "↗ Spending"
                  : "↗ Growth"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}