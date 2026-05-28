import { Children, createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext()
export default function ExpenseProvider({children}) {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions')

        return saved ? JSON.parse(saved) : []
    })

    const [editTransactions, setEditTransactions] = useState(null)

    

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions))
    }, [transactions])

    const addTransaction = (transaction) => {
        setTransactions((prev) => [transaction, ...prev])
    }

    const deleteTransaction = (id) => {
        setTransactions((prev) => 
            prev.filter((item) => item.id !== id )
        )
    }

    const updateTransaction = (updatedItem) => {
            const updateTransaction = transactions.map((item) => 
                item.id === updatedItem.id
                ? updatedItem
                : item
            )

            setTransactions(updateTransaction);

            //clear edit state
            setEditTransactions(null)
    }

    return(
        <ExpenseContext.Provider
        value={{
            transactions,
            addTransaction,
            deleteTransaction,
            updateTransaction,
            editTransactions,
            setEditTransactions,
        }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}