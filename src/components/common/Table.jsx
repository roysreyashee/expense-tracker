export default function Table({
    columns,
    data,
    renderRow,
}) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    {/* Table Head */}
                    <thead>
                        <tr className="border-b border-slate-200">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="text-left py-4 px-2 text-sm font-semibold text-slate-500"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>

                            {/* Table Body */}
                    <tbody>
                        {data?.length > 0 ?
                            (
                                data.map((item, index) =>
                                    renderRow(item, index)
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center py-10 text-slate-400"
                                    >
                                        No Data Found
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}