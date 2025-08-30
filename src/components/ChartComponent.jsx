// import { BarChart, PieChart } from "lucide-react";
// import { Bar, CartesianGrid, Cell, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// const ChartComponent = {
//     createChart: (type, data, config = {}) => {
//         switch (type) {
//             case 'bar':
//                 return (
//                     <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={data}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Bar dataKey="value" fill="#3b82f6" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 );
//             case 'pie':
//                 return (
//                     <ResponsiveContainer width="100%" height={300}>
//                         <PieChart>
//                             <Pie
//                                 data={data}
//                                 cx="50%"
//                                 cy="50%"
//                                 labelLine={false}
//                                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                                 outerRadius={80}
//                                 fill="#8884d8"
//                                 dataKey="value"
//                             >
//                                 {data.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 );
//             default:
//                 return <div>Unsupported chart type</div>;
//         }
//     }
// };

// export default ChartComponent;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                <p className="text-gray-800">{`${label}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

// Bar Chart Component
export const CustomBarChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
        </ResponsiveContainer>
    );
};

// Pie Chart Component
export const CustomPieChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    // Generate colors for pie chart
    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
        '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C',
        '#8DD1E1', '#D084D0', '#87D068', '#FFB347'
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    );
};