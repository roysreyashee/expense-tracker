import { useContext, useMemo } from "react"
import { ExpenseContext } from "../../globalcontext/ExpenseContext"
import { Lightbulb, Sparkles, TrendingUp, Wallet } from "lucide-react";

export default function SpendingInsightsCard() {

    const { transactions } = useContext(ExpenseContext);

    //current date 
    const now = new Date();

    //This Month Transaction 
    const thisMonthTransaction = useMemo(() => {

        return transactions.filter((item) => {
            if (!item.date) return false;

            const transactionDate = new Date(item.date)

            return (
                transactionDate.getMonth() === now.getMonth() &&
                transactionDate.getFullYear() === now.getFullYear()
            )
        })
    }, [transactions])

    //Last month transaction
    const lastMonthTransaction = useMemo(() => {

        const lastMonthDate = new Date()

        lastMonthDate.setMonth(
            now.getMonth() - 1
        )
        return transactions.filter((item) => {
            if (!item.date) return false;

            const transactionDate = new Date(item.date)

            return (
                transactionDate.getMonth() === lastMonthDate.getMonth()
                && transactionDate.getFullYear() === lastMonthDate.getFullYear()
            )
        })
    }, [transactions])

    //Only expenses 
    //This month expenses filter
    const thisMonthExpense = thisMonthTransaction.filter((item) =>
        item.type === 'Expense'
    )

   // console.log('this month exp', thisMonthExpense)
    //Last month expense filter
    const lastMonthExpense = lastMonthTransaction.filter((item) =>
        item.type === 'Expense'
    )

    //Total expenses 
    //Current expense calculate
    const currentExpense = thisMonthExpense.reduce((acc, item) =>
        acc + Number(item.amount)
        , 0)

    //Previous expenses calculate
    const previousExpense = lastMonthExpense.reduce((acc, item) =>
        acc + Number(item.amount)
        , 0)

       // console.log('curr exp', currentExpense);
      //  console.log('prev exp', previousExpense)
    //Percentage change 
const expenseDifference =
  previousExpense > 0
    ? Number(
        (
          (currentExpense -
            previousExpense) /
          previousExpense
        ) * 100
      ).toFixed(0)
    : 0
    // console.log('expenseDiff', expenseDifference)
    //Category Analytics
    const categoryMap = {}

    thisMonthExpense.forEach((item) => {

        
        if (categoryMap[item.category]) {
            categoryMap[item.category] += Number(item.amount)
        } else {
            categoryMap[item.category] = Number(item.amount)
        }
    })

    //Top Spending category
    const keys = Object.keys(categoryMap);
   // console.log('Keys', keys);

    const topCategory = keys.reduce((highest, current) => {

        if (categoryMap[highest] > categoryMap[current]) {

            return highest
        } else {

            return current
        }
    }, keys[0])

    //Highest spending day
    const dayMap = {}
    thisMonthExpense.forEach((item) => {

    const day =
      new Date(item.date)
        .toLocaleDateString(
          "en-IN",
          {
            weekday: "long",
          }
        )

    if (dayMap[day]) {

      dayMap[day] +=
        Number(item.amount)

    } else {

      dayMap[day] =
        Number(item.amount)
    }
  })
  const topDay =
    Object.keys(dayMap).reduce(
      (a, b) =>
        dayMap[a] > dayMap[b]
          ? a
          : b,
      Object.keys(dayMap)[0]
    )

    
    //Saving insights 
    const savedMore = expenseDifference < 0;
 //sconsole.log('savedmore', savedMore)
    //Insights Array
    const insights = [
        {
            id: 1,
            title: savedMore
                ? `You spent ${Math.abs(
                    expenseDifference
                )}% less this month`
                : `Your spending increases by ${expenseDifference}%`,

            description: savedMore ? "Excellent budgeting habits this month" : "Monitor recurring expenses carefully.",

            icon: TrendingUp,

            bg: savedMore ? "bg-green-50"
                : "bg-red-50",
            
            iconBg: savedMore
                ? "bg-green-100"
                : "bg-red-100",

            iconColor: savedMore
                ? "text-green-600"
                : "text-red-500",

            border: savedMore
                ? "border-green-100"
                : "border-red-100",
        },

        //Top Category Insight 
        {
            id: 2,
            title: topCategory
                ? `${topCategory} is your highest expense category`
                : "No category insights available",

            description: topCategory
                ? `You spent ₹${categoryMap[
                    topCategory
                ]?.toLocaleString()} on ${topCategory}.`
                : "Add more transactions to generate insights.",

            icon: Wallet,

            bg: "bg-orange-50",

            iconBg: "bg-orange-100",

            iconColor: "text-orange-500",

            border: "border-orange-100",
        },

        //Highest Spending day
        {
      id: 3,

      title: topDay
        ? `${topDay} is your highest spending day`
        : "No spending day insights",

      description: topDay
        ? `You tend to spend more on ${topDay}s.`
        : "Track daily spending patterns.",

      icon: Lightbulb,

      bg: "bg-purple-50",

      iconBg: "bg-purple-100",

      iconColor: "text-purple-600",

      border: "border-purple-100",
    },

    ]

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
          mb-6
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
            Spending Insights
          </h2>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            AI-powered financial insights
          </p>

        </div>

        {/* ICON */}
        <div
          className="
            w-11
            h-11
            rounded-2xl
            bg-purple-100
            flex
            items-center
            justify-center
          "
        >

          <Sparkles
            className="
              text-purple-600
              w-5
              h-5
            "
          />

        </div>

      </div>

      {/* =====================================
          INSIGHTS
      ===================================== */}

      <div className="space-y-4">

        {insights.map((item) => {

          const Icon = item.icon

          return (

            <div

              key={item.id}

              className={`
                ${item.bg}
                ${item.border}
                border
                rounded-2xl
                p-4
                transition-all
                hover:scale-[1.01]
              `}
            >

              <div className="flex gap-4">

                {/* ICON */}
                <div
                  className={`
                    ${item.iconBg}
                    w-12
                    h-12
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    shrink-0
                  `}
                >

                  <Icon
                    className={`
                      ${item.iconColor}
                      w-6
                      h-6
                    `}
                  />

                </div>

                {/* CONTENT */}
                <div>

                  <h3
                    className="
                      font-semibold
                      text-gray-900
                      leading-6
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    {item.description}
                  </p>

                </div>

              </div>

            </div>
          )
        })}

      </div>

      {/* =====================================
          FOOTER BUTTON
      ===================================== */}

      <button
        className="
          mt-6
          w-full
          bg-gradient-to-r
          from-green-500
          to-emerald-500
          hover:opacity-90
          transition-all
          text-white
          font-semibold
          py-4
          rounded-2xl
          shadow-sm
        "
      >
        View Detailed Insights
      </button>

    </div>
  )
        
    
}