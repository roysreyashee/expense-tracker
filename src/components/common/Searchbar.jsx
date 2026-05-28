export default function Searchbar({
    search,
    setSearch
}) {

    return (
        <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
            }}
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
        />

    )
}