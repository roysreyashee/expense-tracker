import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

export default function ExpenseChart(){
    const data = [
        {name: 'Food', value: 400},
        {name: 'Shopping', value: 300},
        {name: 'Travel', value: 200},
        {name: 'Bills', value: 250}
    ]

    const COLORS = ['#22c55e', '#3b82f6', '#f97316', '#ef4444']
    return(
        <div className="chart-card">
            <h3>Expenses By Category</h3> 
            <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                    <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
            dataKey='value'
                    >

                        {data.map((entry,index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                        )
                        )}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}