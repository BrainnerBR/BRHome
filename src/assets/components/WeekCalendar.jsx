// WeekCalendar.jsx
import { useState, useEffect, useRef } from "react";
import { PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { db } from "../../firebase";
import { ref, onValue, set } from "firebase/database";
import ChartParticipation from "./ChartParticipation";

export default function WeekCalendar() {
  const defaultWeek = [
    { day: "Lunes", user: null, time: null },
    { day: "Martes", user: null, time: null },
    { day: "Miércoles", user: null, time: null },
    { day: "Jueves", user: null, time: null },
    { day: "Viernes", user: null, time: null },
    { day: "Sábado", user: null, time: null },
    { day: "Domingo", user: null, time: null },
  ];

  const [weekData, setWeekData] = useState(defaultWeek);
  const [selectingIndex, setSelectingIndex] = useState(null);
  const users = ["Heiner", "Brainner", "Yesenia"];
  const selectRef = useRef(null);

  // ⭐ 1. Escuchar cambios en Firebase (convertir a array si hace falta)
  useEffect(() => {
    const weekRef = ref(db, "weekData");

    const unsubscribe = onValue(weekRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // si Firebase devolvió un objeto (indexado) lo convertimos a array
        const arrayData = Array.isArray(data) ? data : Object.values(data);
        setWeekData(arrayData);
      } else {
        // si no existe, inicializamos la data (guardamos array)
        set(weekRef, defaultWeek);
        setWeekData(defaultWeek);
      }
    });

    return () => unsubscribe();
  }, []);

  // ⭐ 2. Guardar en Firebase al seleccionar usuario
  const handleSelectUser = (index, user) => {
    const updated = [...weekData];
    updated[index] = {
      ...updated[index],
      user,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // guardar el array tal cual
    set(ref(db, "weekData"), updated);
    setSelectingIndex(null);
  };

  // ⭐ 3. Quitar usuario seleccionado
  const removeUser = (index) => {
    const updated = [...weekData];
    updated[index] = { ...updated[index], user: null, time: null };
    set(ref(db, "weekData"), updated);
  };

  // ⭐ 4. Cerrar select al hacer clic afuera
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
    <>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {weekData.map((day, index) => (
          <div
            key={day.day}
            className="bg-gray-800 rounded-2xl p-4 text-center text-white shadow-lg hover:shadow-teal-500/10 transition relative"
          >
            <h3 className="text-lg font-semibold mb-2 text-teal-400">{day.day}</h3>

            {day.user ? (
              <div className="flex flex-col items-center mt-4">
                <CheckCircle className="text-green-400 mb-1" size={24} />
                <p className="text-sm">{day.user}</p>
                <p className="text-xs text-gray-400">{day.time}</p>

                {/* Botón de quitar */}
                <button
                  onClick={() => removeUser(index)}
                  className="mt-3 text-red-400 hover:text-red-600 transition"
                >
                  <XCircle size={20} />
                </button>
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

      {/* gráfico */}
      <ChartParticipation weekData={weekData} users={users} />
    </>
  );
}