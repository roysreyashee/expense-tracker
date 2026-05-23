export default function TransactionForm() {
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
      <form className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter title (e.g. Grocery Shopping)"
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
              placeholder="Enter amount"
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
            <button
              type="button"
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
              Income
            </button>

            {/* Expense Button */}
            <button
              type="button"
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-slate-300
                text-slate-600
                font-medium
                hover:bg-slate-100
                transition
              "
            >
              Expense
            </button>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Category
          </label>

          <select
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