export default function SummaryCards() {
    const cards = [

        {
            title: 'Total Balance',
            amount: '$5730.50'
        },
        {
            title: 'Total Income',
            amount: '$8500.00'
        },
        {
            title: 'Total Expense',
            amount: '$2769.50'
        }

    ]
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {cards.map((card,index)=> (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h4 className="text-slate-500 mb-3">
                            {card?.title}
                        </h4>
                        <h2 className="text-3xl font-bold text-slate-800">
                            {card?.amount}
                        </h2>
                    </div>
                )
                        
                ) }
        </div>
    )
}