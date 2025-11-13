import { useState, useEffect, useRef } from "react";
import { PlusCircle, CheckCircle } from "lucide-react";

export default function WeekCalendar() {
  const [weekData, setWeekData] = useState([
  { day: "Lunes", user: null, time: null },
  { day: "Martes", user: null, time: null },
  { day: "Miércoles", user: null, time: null },
  { day: "Jueves", user: null, time: null },
  { day: "Viernes", user: null, time: null },
  { day: "Sábado", user: null, time: null },
  { day: "Domingo", user: null, time: null },
  ]);

  const users = ["Sophia", "Brainner", "Luis", "Maria"];

  const [selectingIndex, setSelectingIndex] = useState(null);

  const selectRef = useRef(null);

  const handleSelectUser = (index, user) => {
    const newData = [...weekData];
    newData[index] = {
      ...newData[index],
      user,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setWeekData(newData);
    setSelectingIndex(null);
  };

  // 🔹 Cerrar select cuando se hace clic afuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setSelectingIndex(null);
      }
    }

    if (selectingIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectingIndex]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {weekData.map((day, index) => (
        <div
          key={day.day}
          className="bg-gray-800 rounded-2xl p-4 text-center text-white shadow-lg hover:shadow-teal-500/10 transition relative"
        >
          <h3 className="text-lg font-semibold mb-2 text-teal-400">
            {day.day}
          </h3>

          {day.user ? (
            <div className="flex flex-col items-center mt-4">
              <CheckCircle className="text-green-400 mb-1" size={24} />
              <p className="text-sm">{day.user}</p>
              <p className="text-xs text-gray-400">{day.time}</p>
            </div>
          ) : selectingIndex === index ? (
            <div ref={selectRef} className="mt-4">
              <select
                className="bg-gray-700 w-full text-white text-sm p-2 rounded-xl"
                onChange={(e) => handleSelectUser(index, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccionar usuario
                </option>
                {users.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <button
              onClick={() => setSelectingIndex(index)}
              className="flex flex-col items-center justify-center text-gray-400 hover:text-teal-400 transition mt-6 mx-auto"
            >
              <PlusCircle size={32} />
              <span className="text-xs mt-1">Registrar</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}