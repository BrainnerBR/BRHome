import { useState } from "react";
import { PlusCircle, CheckCircle } from "lucide-react";

export default function WeekCalendar() {
  const [weekData, setWeekData] = useState([
    { day: "Lunes", user: "Sophia", time: "2:00 PM" },
    { day: "Martes", user: "Brainner", time: "3:15 PM" },
    { day: "Miércoles", user: null, time: null },
    { day: "Jueves", user: "Sophia", time: "1:45 PM" },
    { day: "Viernes", user: null, time: null },
    { day: "Sábado", user: "Brainner", time: "12:30 PM" },
    { day: "Domingo", user: null, time: null },
  ]);

  const handleAdd = (index) => {
    const newData = [...weekData];
    newData[index] = {
      ...newData[index],
      user: "Brainner", // luego se puede abrir modal o selección de usuario
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setWeekData(newData);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {weekData.map((day, index) => (
        <div
          key={day.day}
          className="bg-gray-800 rounded-2xl p-4 text-center text-white shadow-lg hover:shadow-teal-500/10 transition"
        >
          <h3 className="text-lg font-semibold mb-2 text-teal-400">{day.day}</h3>
          {day.user ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="text-green-400 mb-1" size={24} />
              <p className="text-sm">{day.user}</p>
              <p className="text-xs text-gray-400">{day.time}</p>
            </div>
          ) : (
            <button
              onClick={() => handleAdd(index)}
              className="flex flex-col items-center text-gray-400 hover:text-teal-400 transition"
            >
              <PlusCircle size={28} />
              <span className="text-xs mt-1">Registrar</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
