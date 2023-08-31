"use client"

import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts'

interface OverViewProps{
    data : any[]
}


const Overview:React.FC<OverViewProps> = ({data}) => {
    return (
        <ResponsiveContainer width="100%"height={350}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke='#6B7280'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke='#6B7280'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value)=> `${value}MAD`}
                    />
                    <Bar 
                        dataKey="total"
                        fill='#adfa1d'
                        radius={[4,4,0,0]}
                    />
                </BarChart>
        </ResponsiveContainer>
    )
}

export default Overview  