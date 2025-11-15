import WeekCalendar from "../../assets/components/WeekCalendar";

export default function Home() {
  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">📅 Semana actual</h2>
      <WeekCalendar />
      <div className="col-span-full">
      </div>
    </div>
  );
}
