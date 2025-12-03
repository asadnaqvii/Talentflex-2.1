"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Schedule() {
  const router = useRouter();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
  ];

  // Get week dates based on current week
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);
  
  const days = weekDates.map(date => ({
    short: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
    fullDate: date,
    isToday: date.toDateString() === new Date().toDateString(),
    isSelected: selectedDate?.toDateString() === date.toDateString()
  }));

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  // Navigate to next week
  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  // Go to current week
  const goToToday = () => {
    setCurrentWeek(new Date());
    setSelectedDate(new Date());
  };

  // Sample events with dynamic dates
  const generateEvents = () => {
    const eventTemplates = [
      { title: 'Logo Redesign Challenge', type: 'Challenge' },
      { title: 'Graphic Design Fundamentals', type: 'Course' },
      { title: 'Moonlight Creatives', type: 'Interview' },
      { title: 'Creative Vision', type: 'Interview' },
      { title: 'UI/UX Workshop', type: 'Course' },
      { title: 'Portfolio Review', type: 'Challenge' }
    ];

    const events: { id: number; title: string; type: string; date: Date; startTime: string; endTime: string; position: { top: number; height: number; left: string; width: string } }[] = [];
    const positions = [
      { top: 8, height: 64, dayIndex: 0, hour: 8 },
      { top: 72, height: 64, dayIndex: 1, hour: 10 },
      { top: 8, height: 64, dayIndex: 2, hour: 9 },
      { top: 136, height: 64, dayIndex: 3, hour: 11 },
      { top: 72, height: 64, dayIndex: 4, hour: 10 },
      { top: 200, height: 64, dayIndex: 5, hour: 13 },
      { top: 8, height: 128, dayIndex: 6, hour: 8 }
    ];

    positions.forEach((pos, index) => {
      const template = eventTemplates[index % eventTemplates.length];
      const dayWidth = 100 / 7; // percentage width for each day
      events.push({
        ...template,
        id: index,
        date: weekDates[pos.dayIndex],
        startTime: `${pos.hour.toString().padStart(2, '0')}:00`,
        endTime: `${(pos.hour + Math.floor(pos.height / 48)).toString().padStart(2, '0')}:00`,
        position: {
          top: pos.top,
          height: pos.height,
          left: `${pos.dayIndex * dayWidth}%`,
          width: `${dayWidth - 0.5}%`
        }
      });
    });

    return events;
  };

  const events = generateEvents();

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[24px] min-h-[355px] overflow-hidden">
      <div className="p-4 lg:p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.02em] text-[#1A1A1A]">
              Roadmap/Sprint
            </h2>
            <div className="flex bg-[#EDEDED] rounded-[8px] p-1">
              <button className="bg-white text-[#1A1A1A] font-bold text-[12px] px-3 py-1 rounded">
                Weekly
              </button>
              <button className="text-[#676767] text-[12px] px-3 py-1">
                Monthly
              </button>
            </div>
          </div>
          <button 
            onClick={() => router.push('/roadmap')}
            className="text-[14px] font-normal leading-[20px] tracking-[-0.02em] text-[#676767] hover:text-[#1A1A1A] transition-colors"
          >
            View All
          </button>
        </div>

        {/* Schedule Grid - Scrollable on mobile */}
        <div className="relative flex-1 overflow-x-auto">
          {/* Day Headers */}
          <div className="flex gap-2 mb-2 min-w-[600px]">
            <div className="w-8"></div> {/* Spacer for time column */}
            {days.map((day, index) => (
              <div 
                key={index} 
                className="flex-1 text-center"
              >
                <div className="text-[12px] font-bold text-[#1A1A1A]">
                  {day.short}
                </div>
                <div className="text-[10px] text-[#676767]">
                  {day.date}
                </div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="relative min-w-[600px]" style={{ height: '240px' }}>
            {/* Time Labels */}
            <div className="absolute left-0 top-0">
              {timeSlots.map((time, index) => (
                <div 
                  key={index} 
                  className="absolute text-[10px] text-[#676767] w-8"
                  style={{ 
                    top: `${index * 30}px`,
                    transform: 'translateY(-50%)'
                  }}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Grid Lines */}
            <div className="absolute left-[46px] top-0 right-0 bottom-0">
              {/* Horizontal lines */}
              {timeSlots.map((_, index) => (
                <div 
                  key={index} 
                  className="absolute border-t border-[#D3D3D3] w-full"
                  style={{ top: `${index * 30}px` }}
                />
              ))}
              
              {/* Vertical lines */}
              {Array.from({ length: 8 }, (_, index) => (
                <div 
                  key={index} 
                  className="absolute border-l border-[#D3D3D3] h-full"
                  style={{ left: `${(index / 7) * 100}%` }}
                />
              ))}
            </div>

            {/* Events */}
            <div className="absolute left-[46px] top-0 right-0">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`absolute rounded-[8px] p-2 cursor-pointer transition-all hover:shadow-md hover:z-10 ${
                    event.type === 'Course' ? 'bg-[#E2ECFF]' :
                    event.type === 'Challenge' ? 'bg-[#F6F6F6]' :
                    'bg-[#C5DAFF]'
                  }`}
                  style={{
                    top: `${event.position.top}px`,
                    height: `${event.position.height}px`,
                    left: event.position.left,
                    width: event.position.width
                  }}
                >
                  <div className="text-[10px] font-bold text-[#1A1A1A] truncate">
                    {event.title}
                  </div>
                  <div className="text-[#676767] text-[8px] mt-0.5">
                    {event.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
