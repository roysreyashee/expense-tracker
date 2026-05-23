import { Children, createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext()
export default function ExpenseProvider({children}) {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions')

        return saved ? JSON.parse(saved) : []
    })

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

    return(
        <ExpenseContext.Provider
        value={{
            transactions,
            addTransaction,
            deleteTransaction
        }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}