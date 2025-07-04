import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar() {
  // Initialize the current date, ensuring it reflects the correct date in UTC+5:45
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    // Adjust for UTC+5:45 (Nepal Time, 5 hours 45 minutes ahead of UTC)
    const offsetMinutes = 5 * 60 + 45; // 345 minutes ahead of UTC
    const utcDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000)); // Convert to UTC
    return new Date(utcDate.getTime() + (offsetMinutes * 60000)); // Adjust to UTC+5:45
  });
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const now = new Date();
    const adjustedNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (5 * 60 + 45) * 60000);
    setIsPrevDisabled(
      currentDate.getMonth() === adjustedNow.getMonth() &&
      currentDate.getFullYear() === adjustedNow.getFullYear()
    );
  }, [currentDate]);

  const goToPrevMonth = () => {
    if (!isPrevDisabled) {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    }
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    const adjustedNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (5 * 60 + 45) * 60000);
    setCurrentDate(adjustedNow);
  };

  const generateDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(currentYear, currentMonth - 1, day);
      days.push(createDayElement(date, true));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push(createDayElement(date));
    }

    let nextMonthDay = 1;
    while (days.length < 42) {
      const date = new Date(currentYear, currentMonth + 1, nextMonthDay);
      days.push(createDayElement(date, false, true));
      nextMonthDay++;
    }

    return days;
  };

  const createDayElement = (date, isPrevMonth = false, isNextMonth = false) => {
    const day = date.getDate();
    const now = new Date();
    const today = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (5 * 60 + 45) * 60000);
    const isToday = date.toDateString() === today.toDateString();
    const isDisabled = !isToday;

    const handleClick = () => {
      if (isDisabled) return;
      if (isPrevMonth) goToPrevMonth();
      if (isNextMonth) goToNextMonth();
    };

    return (
      <div
        key={date.toISOString()}
        onClick={handleClick}
        className={`h-10 border border-gray-100 flex items-center justify-center
          transition-all duration-300 ease-in-out 
          ${isPrevMonth || isNextMonth ? 'text-gray-500' : ''}
          ${isToday ? 'bg-orange-50' : ''}
          ${isDisabled ? 
            'cursor-not-allowed opacity-50' : 
            'cursor-pointer hover:bg-gray-50 hover:ring-2 hover:ring-orange-400 hover:ring-inset'}`}
      >
        <span className={`${isToday ? 'font-bold text-[#FBBC05]' : ''}`}>
          {day}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-[#FFA52C] text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={goToPrevMonth}
              disabled={isPrevDisabled}
              className={`p-1 rounded ${
                isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FBBC05]'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToToday}
              className="px-2 py-1 text-xs bg-[#FBBC05] rounded hover:bg-orange-400"
            >
              Today
            </button>
            <button
              onClick={goToNextMonth}
              className="p-1 rounded hover:bg-[#FBBC05]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map(day => (
            <div key={day} className="text-center font-medium text-[#FBBC05] text-sm py-2">
              {day}
            </div>
          ))}
          {generateDays()}
        </div>
      </div>
    </div>
  );
}