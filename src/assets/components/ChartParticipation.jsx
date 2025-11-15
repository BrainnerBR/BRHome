// ChartParticipation.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

export default function ChartParticipation({ weekData = [], users = [] }) {
  // asegurarnos que weekData es array
  const dataArray = Array.isArray(weekData) ? weekData : Object.values(weekData || []);

  // calcular cantidad por usuario
  const counts = users.map((u) => ({
    name: u,
    count: dataArray.filter((d) => d && d.user === u).length,
  }));

  return (
    <div className="bg-gray-900 p-4 rounded-2xl mt-8 shadow-lg">
      <h2 className="text-white text-center mb-4 text-lg font-semibold">Participación Semanal</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={counts}>
          <XAxis dataKey="name" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#06b6d4">
            <LabelList dataKey="count" position="top" />
          </Bar>``
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}