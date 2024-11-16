'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const abbreviateFirstWord = (name: string) => {
    const words = name.split(' ');
    if (words[0] === 'Election' || words[0] === 'Élection') {
        words[0] = 'E.';
    } else if (words[0] === 'Commission') {
        words[0] = 'C.';
    } else if (words[0] === 'Conseil') {
        words[0] = 'C.';
    } else if (words[0] === 'Comité') {
        words[0] = 'C.';
    } else if (words[0] === 'Vote') {
        words[0] = 'V.';
    } else if (words[0] === 'Représentants') {
        words[0] = 'R.';
    }
    return words.join(' ');
};

const allData = [
    {
        name: abbreviateFirstWord('Élection Présidentielle'),
        electeurs: 230,
        participation: 86,
        date: '2024-05-01',
        status: 'en_cours',
        vainqueur: 'En cours'
    },
    {
        name: abbreviateFirstWord('Comité Exécutif'),
        electeurs: 180,
        participation: 75,
        date: '2024-04-15',
        status: 'en_cours',
        vainqueur: 'En cours'
    },
    {
        name: abbreviateFirstWord('Représentants Régionaux'),
        electeurs: 230,
        participation: 90,
        date: '2024-03-01',
        status: 'termine',
        vainqueur: 'Kouassi Patrice'
    },
    {
        name: abbreviateFirstWord('Commission Technique'),
        electeurs: 150,
        participation: 82,
        date: '2024-06-10',
        status: 'a_venir',
        vainqueur: 'À venir'
    },
    {
        name: abbreviateFirstWord('Commission Arbitres'),
        electeurs: 200,
        participation: 100,
        date: '2024-02-15',
        status: 'termine',
        vainqueur: 'Koné Ibrahim'
    },
    {
        name: abbreviateFirstWord('Conseil Discipline'),
        electeurs: 175,
        participation: 78,
        date: '2024-07-20',
        status: 'a_venir',
        vainqueur: 'À venir'
    },
    {
        name: abbreviateFirstWord('Commission Marketing'),
        electeurs: 160,
        participation: 88,
        date: '2024-08-05',
        status: 'a_venir',
        vainqueur: 'À venir'
    },
    {
        name: abbreviateFirstWord('Commission Jeunes'),
        electeurs: 190,
        participation: 95,
        date: '2024-04-01',
        status: 'termine',
        vainqueur: 'Touré Aminata'
    },
    {
        name: abbreviateFirstWord('Commission Médicale'),
        electeurs: 140,
        participation: 85,
        date: '2024-09-15',
        status: 'a_venir',
        vainqueur: 'À venir'
    }
];

const data = allData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const item = data.find(d => d.name === label);
        return (
            <div className="bg-secondary/80 backdrop-blur-sm p-4 rounded-md shadow-lg border border-gray-200">
                <p className="font-medium text-sm text-gray-600 mb-2">{label}</p>
                <p className="text-sm text-gray-600">
                    Nombre d'électeurs: {payload[0].value}
                </p>
                <p className="text-sm text-emerald-600">
                    Taux de participation: {payload[1].value}%
                </p>
                <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600">
                        Vainqueur: <span className="text-gray-900">{item?.vainqueur}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export function DashboardChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 15,
                    left: 0,
                    bottom: 5
                }}
                barGap={8}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                />
                <XAxis
                    dataKey="name"
                    interval={0}
                    tick={{
                        fill: '#64748b',
                        fontSize: 11,
                        fontWeight: 500
                    }}
                    height={35}
                    dy={10}
                />
                <YAxis
                    yAxisId="left"
                    orientation="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: '#64748b',
                        fontSize: 11
                    }}
                    domain={[0, 'dataMax + 20']}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fill: '#64748b',
                        fontSize: 11
                    }}
                    domain={[0, 100]}
                />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }}
                />
                <Legend
                    wrapperStyle={{
                        paddingTop: '10px'
                    }}
                    iconType="circle"
                    margin={{ top: 0 }}
                />
                <Bar
                    yAxisId="left"
                    dataKey="electeurs"
                    name="Nombre d'électeurs"
                    fill="#94a3b8"
                    radius={[2, 2, 0, 0]}
                    opacity={0.8}
                />
                <Bar
                    yAxisId="right"
                    dataKey="participation"
                    name="Taux de participation (%)"
                    fill="#22c55e"
                    radius={[2, 2, 0, 0]}
                    opacity={0.8}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}