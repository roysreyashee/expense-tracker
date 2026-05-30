//import BudgetCard from "../components/budget/budgetCard";
import ExpenseByCategoryCard from "../components/dashboard/ExpenseByCategory";
import ExpenseOverviewCard from "../components/dashboard/ExpenseOverviewCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import SpendingInsightsCard from "../components/dashboard/SpendingInsights";
import SummaryCards from "../components/dashboard/SummaryCards";

export default function Dashboard(){
    return(
        <div>
           <h1 className="text-4xl font-bold text-slate-800">
                Welcome back, John 👋
           </h1>
           <p className='text-slate-500 mt-2'>
          Here's your financial overview
        </p>

        <SummaryCards/>
       {/* <div className="mb-5">
        <BudgetCard/>
        </div> */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        <ExpenseOverviewCard/>
        <ExpenseByCategoryCard/>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                
            <RecentTransactions/>
            <SpendingInsightsCard/>
        </div>
      
        </div>
    )
}