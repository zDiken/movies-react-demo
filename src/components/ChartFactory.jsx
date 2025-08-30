// import { BarChart, PieChart } from "lucide-react";
// import { Bar, CartesianGrid, Cell, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// export const ChartFactory = {
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
import React from 'react';
import { CustomBarChart, CustomPieChart } from './ChartComponent';

export const ChartFactory = {
    createChart: (type, data, config = {}) => {
        // Validate data
        if (!data || !Array.isArray(data) || data.length === 0) {
            return (
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">No data available for chart</p>
                </div>
            );
        }

        // Ensure data has proper structure
        const validData = data.filter(item =>
            item &&
            typeof item === 'object' &&
            item.name !== undefined &&
            item.value !== undefined
        );

        if (validData.length === 0) {
            return (
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Invalid data format for chart</p>
                </div>
            );
        }

        switch (type) {
            case 'bar':
                return <CustomBarChart data={validData} {...config} />;
            case 'pie':
                return <CustomPieChart data={validData} {...config} />;
            default:
                return (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500">Unsupported chart type: {type}</p>
                    </div>
                );
        }
    }
};