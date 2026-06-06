import ExpenseByCategoryCard from "../components/dashboard/ExpenseByCategory";
import ExpenseOverviewCard from "../components/dashboard/ExpenseOverviewCard";
import SpendingInsightsCard from "../components/dashboard/SpendingInsights";
import SummaryCards from "../components/dashboard/SummaryCards";
import MonthlyIncomeExpense from "../components/reports/MonthlyIncomeExpense";
import MonthlySummaryCard from "../components/reports/MonthlySummary";
import TopSpendingCategoryCard from "../components/reports/TopSpendingCategory";

export default function Reports() {
    return(
        <div>
            <h1>
                Reports & Analytics
            </h1>
            <SummaryCards/>

             <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                    <MonthlyIncomeExpense/>
                    <TopSpendingCategoryCard/>
                  </div>
             <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                    <ExpenseOverviewCard/>
                    <ExpenseByCategoryCard/>
                  </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                    <MonthlySummaryCard/>
                    <SpendingInsightsCard/>
            </div>
        </div>
    )
}