'use client';
import { useState } from 'react';
import { SideNavigation } from './SideNavigation';
import { Mine } from './tab/Mine';
import { Solved } from './tab/Solved';
import { Report } from './tab/Report';
import { Inquiry } from './tab/Inquiry';

const Mypage = () => {
  const [tab, setTab] = useState('mine');
  const tabComponents = {
    mine: <Mine />,
    solved: <Solved />,
    report: <Report />,
    inquiry: <Inquiry />,
  } as const;
  return (
    <div className="w-full h-full pt-[114px] px-10 py-[34px] flex">
      <div className="flex-[1]">
        <SideNavigation tab={tab} setTab={setTab} />
      </div>

      <div className="flex-[4] px-10">{tabComponents[tab as 'mine']}</div>
    </div>
  );
};

export default Mypage;
