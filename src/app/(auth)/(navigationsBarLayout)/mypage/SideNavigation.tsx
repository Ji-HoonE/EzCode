'use client';

import Password from './../../../../../public/icons/mypage/password.svg';
import Image from 'next/image';
import { User, MessageSquare, Flag, History } from 'lucide-react';
interface IProps {
  tab: string;
  setTab: (tab: string) => void;
}
type MenuItem = 'mine' | 'solved' | 'inquiry' | 'report' | 'password';
export const SideNavigation = ({ tab, setTab }: IProps) => {
  const menuItems = [
    { id: 'mine' as MenuItem, label: '내 정보 확인', icon: User },
    { id: 'report' as MenuItem, label: '신고', icon: Flag },
    { id: 'solved' as MenuItem, label: '문제 푼 기록', icon: History },
    { id: 'inquiry' as MenuItem, label: '문의하기', icon: MessageSquare },
  ];
  const bottomMenuItem = [{ id: 'password' as MenuItem, label: '비밀번호 변경', icon: Password }];
  return (
    <div className="w-64 border-r border-gray-700/50 p-6 flex h-full flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">마이페이지</h1>
        <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#00d084' }}></div>
      </div>

      <div className="flex flex-col justify-between h-full">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  tab === item.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/8'
                }`}
                style={{
                  backgroundColor: tab === item.id ? '#214d35' : 'transparent',
                }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <nav className="space-y-2 border-t border-gray-700/50">
          {/* 하단 메뉴 (비밀번호 변경) */}
          {bottomMenuItem.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  tab === item.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/8'
                }`}
                style={{
                  backgroundColor: tab === item.id ? '#214d35' : 'transparent',
                }}
              >
                <Image src={item.icon} alt="menuIcon" width={20} height={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
