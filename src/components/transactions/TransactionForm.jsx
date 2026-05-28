import { useContext, useEffect, useState } from "react"
import { ExpenseContext } from "../../globalcontext/ExpenseContext"

export default function TransactionForm() {

    //Extracting addTransaction function from global context 
    const {addTransaction, editTransactions, updateTransaction} = useContext(ExpenseContext);

    //local state for storing form input values
    const [formData, setFormData] = useState({
        //Transaction title
        title: '',
        //Transaction amount 
        amount: '',
        // default Transaction type
        type: 'Income',
        //default transaction category
        category: '',
        
        //Transaction date
        date: '',
    })

    //Prefill form data
    useEffect(()=> {

        if(editTransactions){
            setFormData(editTransactions)
        }
    
    },[editTransactions])

    //Function to update form fields dynamically
    const handleChange = (e) => {
        setFormData({
            //Keep previous values
            ...formData,

            //Dynamically update input fields
              [e.target.name]: e.target.value
        }
        )
    }

    //Form submit handler
    const handleSubmit = (e) => {

        //Prevents page reload
       e.preventDefault()

        const newTransaction = {

            //unique ID using timestamp
            id: editTransactions
  ? editTransactions.id
  : Date.now(),
            //Spread all data of formData
            ...formData,

            //Convert amount string to number
            amount: Number(formData.amount),
           
    }
    //  //Adding transaction to the context API state
    //  addTransaction(newTransaction);

     //Edit Mode 
     if(editTransactions){
            updateTransaction(newTransaction);
     }else{
        //Add mode
        addTransaction(newTransaction);
     }

     //Clear the state after submission
     setFormData({
        title: '',
        type: 'Income',
        category: '',
        amount: '',
        date: ''

     })
    }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl">
      
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Add New Transaction
        </h2>

        <p className="text-slate-500 mt-2">
          Fill in the details of your transaction
        </p>
      </div>

      {/* Form */}
      <form 
      onSubmit={handleSubmit}
      className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter title (e.g. Grocery Shopping)"
            value= {formData?.title}
            //Update state on typing
            onChange={handleChange}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              focus:border-emerald-500
              transition
            "
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Amount
          </label>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-400">
              $
            </span>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              className="
                w-full
                pl-8
                pr-4
                py-3
                rounded-xl
                border
                border-slate-300
                outline-none
                focus:ring-2
                focus:ring-emerald-500
                focus:border-emerald-500
                transition
              "
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block mb-3 text-sm font-semibold text-slate-700">
            Type
          </label>

          <div className="flex gap-4">
            
            {/* Income Button */}
            <select
              type="button"
              name="type"
              value={formData?.type}
              onChange={handleChange}
              className="
                px-5
                py-2.5
                rounded-xl
                bg-emerald-500
                text-white
                font-medium
                hover:bg-emerald-600
                transition
              "
            >
             <option>Income</option>
             <option>Expense</option> 
            </select>

            
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Category
          </label>

          <select
          value={formData?.category}
          name="category"
          onChange={handleChange}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              focus:border-emerald-500
              transition
              bg-white
            "
          >
            <option>Select category</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Entertainment</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData?.date}
            onChange={handleChange}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              focus:border-emerald-500
              transition
            "
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Notes (Optional)
          </label>

          <textarea
            rows="4"
            placeholder="Add a note..."
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              outline-none
              resize-none
              focus:ring-2
              focus:ring-emerald-500
              focus:border-emerald-500
              transition
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          
          <button
            type="button"
            className="
              px-6
              py-3
              rounded-xl
              border
              border-slate-300
              text-slate-600
              font-medium
              hover:bg-slate-100
              transition
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              px-6
              py-3
              rounded-xl
              bg-emerald-500
              text-white
              font-semibold
              hover:bg-emerald-600
              transition
              shadow-sm
            "
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  )
}