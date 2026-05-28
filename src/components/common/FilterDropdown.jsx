export default function FilterDropdown(
    { filter,
        setFilter
    }
) {

    return (
        <select
        placeholder="Filter Here..."
            value={filter}
            onChange={(e) =>
                setFilter(e.target.value)
            }
            className="
            w-full
        md:w-80
        px-4
        py-3
        rounded-xl
        border
        border-slate-300
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-500
            "
        >
            <option value='All'>
                All
            </option>

            <option value="Income">
                Income
            </option>

            <option value='Expense'>
                Expense
            </option>
            </select>

    )
}