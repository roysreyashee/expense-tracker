import ExpenseChart from "../components/dashboard/ExpenceChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
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

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        <ExpenseChart />
        <ExpenseChart />
      </div>

      <RecentTransactions/>
        </div>
    )
}