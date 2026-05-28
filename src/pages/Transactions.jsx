import { useContext } from "react";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";
import EditTransactionModal from "../components/common/EditTransactionModal";
import { ExpenseContext } from "../globalcontext/ExpenseContext";

export default function Transactions() {

    const {editTransactions , setEditTransactions} = useContext(ExpenseContext)
    return(
        <>
        <div className="page-header">
            <h1 className="text-4xl font-bold text-slate-800">All Transactions</h1>

            <TransactionTable/>
            <div>
                {editTransactions &&
                    <EditTransactionModal
                        onClose={() => {
                            setEditTransactions(null)
                        }}
                    >
                        <TransactionForm />
                    </EditTransactionModal>
                }
                </div>
        </div>
        </>
    )
}