import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";

export default function Transactions() {
    return(
        <>
        <div className="page-header">
            <h1 className="text-4xl font-bold text-slate-800">All Transactions</h1>

            <TransactionTable/>
           
        </div>
        </>
    )
}