"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 7, 1)); // August 2023
  const [selectedDate, setSelectedDate] = useState(11);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, isPrevMonth: true });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, isPrevMonth: false });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false, isPrevMonth: false });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[16px] p-3 mt-6">
      <div className="space-y-2">
        {/* Date Selector */}
        <div className="flex justify-between items-center bg-[#F6F6F6] rounded-[8px] px-3 py-2">
          <button 
            onClick={goToPreviousMonth}
            className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-3 h-3 text-[#1A1A1A]" strokeWidth={2} />
          </button>
          <span className="text-[14px] font-semibold text-[#1A1A1A]">
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </span>
          <button 
            onClick={goToNextMonth}
            className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-3 h-3 text-[#1A1A1A]" strokeWidth={2} />
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {dayLabels.map((day, index) => (
            <div key={index} className="text-[12px] font-semibold text-[#969699] py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((dayObj, index) => (
            <div
              key={index}
              onClick={() => dayObj.isCurrentMonth && setSelectedDate(dayObj.day)}
              className={`
                text-[12px] py-1.5 rounded-[6px] cursor-pointer transition-colors
                ${dayObj.isCurrentMonth 
                  ? dayObj.day === selectedDate 
                    ? 'bg-[#3D80F8] text-white font-semibold' 
                    : 'text-[#1A1A1A] hover:bg-gray-100'
                  : 'text-[#D3D3D3] cursor-default'
                }
              `}
            >
              {dayObj.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}