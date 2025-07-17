'use client';
interface IProps {
  tab: string;
  setTab: (tab: string) => void;
}

export const SideNavigation = ({ tab, setTab }: IProps) => {
  const topNav = [
    { id: 'mine', name: '내 정보 확인' },
    { id: 'solved', name: '푼 문제 목록' },
    { id: 'inquiry', name: '문의하기' },
    { id: 'report', name: '신고하기' },
  ];
  return (
    <div className="`min-w-[200px] h-full flex flex-col justify-between pt-25 pb-6 px-4 bg-[#00000033] text-white rounded-[25px] ">
      <div className="flex flex-col justify-center items-center">
        <ul className="space-y-6 text-sm font-semibold">
          {topNav.map(({ id, name }) => (
            <li
              key={id}
              className={`cursor-pointer py-2 px-3 text-center rounded-md ${
                tab === id
                  ? 'text-green-400 font-extrabold text-lg'
                  : 'text-white text-base font-light'
              }`}
              onClick={() => setTab(id)}
            >
              {tab === id ? `· ${name}` : name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ul className="text-xl font-semibold">
          <li
            className={`cursor-pointer py-2 px-3 text-center rounded-md ${
              tab === 'changePassword'
                ? 'text-green-400 font-extrabold text-lg'
                : 'text-white text-base font-light'
            }`}
            onClick={() => {
              setTab('changePassword');
            }}
          >
            비밀번호 변경
          </li>
        </ul>
      </div>
    </div>
  );
};
