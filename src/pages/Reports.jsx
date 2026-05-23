import ExpenseChart from "../components/dashboard/ExpenceChart";
import SummaryCards from "../components/dashboard/SummaryCards";

export default function Reports() {
    return(
        <div>
            <h1>
                Reports & Analytics
            </h1>
            <SummaryCards/>

            <div className="chart-grid">
                <ExpenseChart/>
                <ExpenseChart/>
            </div>
        </div>
    )
}