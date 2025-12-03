"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface TodoItem {
  id: string;
  title: string;
  category: string;
  time: string;
  iconBg: string;
  route?: string;
}

const todoItems: TodoItem[] = [
  {
    id: '1',
    title: 'Graphic Design Fundamentals',
    category: 'Course',
    time: '08:00 AM',
    iconBg: '#E2ECFF',
    route: '/course/1'
  },
  {
    id: '2',
    title: 'Logo Redesign Challenge',
    category: 'Challenge',
    time: '10:00 AM',
    iconBg: '#FFE2EF',
    route: '/challenges'
  },
  {
    id: '3',
    title: 'Apply 5 Jobs',
    category: 'Job',
    time: '12:00 AM',
    iconBg: '#E1FFDE',
    route: '/jobs'
  },
  {
    id: '4',
    title: 'UI/UX Workshop',
    category: 'Course',
    time: '02:00 PM',
    iconBg: '#E2ECFF',
    route: '/skills'
  },
  {
    id: '5',
    title: 'Portfolio Review',
    category: 'Challenge',
    time: '04:00 PM',
    iconBg: '#FFE2EF',
    route: '/challenges'
  },
  {
    id: '6',
    title: 'Client Meeting',
    category: 'Job',
    time: '05:00 PM',
    iconBg: '#E1FFDE',
    route: '/jobs'
  }
];

function TodoItemCard({ item }: { item: TodoItem }) {
  const router = useRouter();
  
  const getIcon = (category: string) => {
    switch(category) {
      case 'Course':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" stroke="#4A83F0" strokeWidth="1.5"/>
            <path d="M2 7H18" stroke="#4A83F0" strokeWidth="1.5"/>
            <path d="M6 3V7" stroke="#4A83F0" strokeWidth="1.5"/>
          </svg>
        );
      case 'Challenge':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="2" stroke="#D96570" strokeWidth="1.5"/>
            <circle cx="10" cy="10" r="3" stroke="#D96570" strokeWidth="1.5"/>
          </svg>
        );
      case 'Job':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="7" width="14" height="10" rx="2" stroke="#4CAF50" strokeWidth="1.5"/>
            <path d="M7 7V5C7 3.89543 7.89543 3 9 3H11C12.1046 3 13 3.89543 13 5V7" stroke="#4CAF50" strokeWidth="1.5"/>
            <path d="M10 11V13" stroke="#4CAF50" strokeWidth="1.5"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 border border-[#EDEDED] rounded-[16px] bg-white cursor-pointer hover:shadow-md transition-all hover:border-[#3D80F8]"
         onClick={() => item.route && router.push(item.route)}>
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: item.iconBg }}
      >
        {getIcon(item.category)}
      </div>
      <div className="flex-1">
        <h4 className="text-[14px] font-bold leading-[20px] tracking-[-0.02em] text-[#1A1A1A]">
          {item.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-[#F6F6F6] text-[#1A1A1A] text-[10px] font-medium px-2 py-0.5 rounded">
            {item.category}
          </span>
          <span className="text-[10px] text-[#676767]">{item.time}</span>
        </div>
      </div>
    </div>
  );
}

export default function TodoList() {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.02em] text-[#1A1A1A]">
        To-Do
      </h2>
      <div className="space-y-3">
        {todoItems.map((item) => (
          <TodoItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
