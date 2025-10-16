import React, { useState } from "react";

const events = [
  { date: "2025-10-05", title: "Team Meeting", description: "Monthly strategy sync." },
  { date: "2025-10-12", title: "Project Deadline", description: "Submit final project." },
  { date: "2025-10-16", title: "Client Call", description: "Discuss feedback and next steps." },
  { date: "2025-10-25", title: "Hackathon", description: "24-hour coding marathon." },
];

export default function CalendarEvents() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday

  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day).toISOString().split("T")[0];
    setSelectedDate(clickedDate);
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => event.date === date);
  };

  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    const isSelected = dateStr === selectedDate;
    days.push(
      <div
        key={day}
        onClick={() => handleDateClick(day)}
        className={`cursor-pointer p-2 text-center rounded-xl transition-all duration-200
          ${isSelected ? "bg-blue-500 text-white font-semibold" : "hover:bg-blue-100"}
        `}
      >
        {day}
      </div>
    );
  }

  const eventsForSelectedDate = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold text-center mb-4">
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>
      <div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-600 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">{days}</div>

      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Events on {new Date(selectedDate).toLocaleDateString()}
          </h3>
          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((event, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-3 mb-2 bg-gray-50 shadow-sm"
              >
                <h4 className="font-bold text-blue-600">{event.title}</h4>
                <p className="text-sm text-gray-700">{event.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No events for this date.</p>
          )}
        </div>
      )}
    </div>
  );
}
