'use client';
import { useState } from 'react';
import { SideNavigation } from './SideNavigation';
import { Mine } from './tab/Mine';
import { Solved } from './tab/Solved';
import { Report } from './tab/Report';
import { Inquiry } from './tab/Inquiry';
import { ChangePassword } from './tab/ChangePassword';
import { useMyInfoQuery } from '@/entities/mypage/model/query';

const Mypage = () => {
  const [tab, setTab] = useState('mine');
  const { data } = useMyInfoQuery();
  console.log('data', data);
  const baseTabs = {
    mine: <Mine />,
    solved: <Solved />,
    report: <Report />,
    inquiry: <Inquiry />,
  } as const;
  console.log(['GOOGLE'].includes('EMAIL'));
  const tabComponents = ['GOOGLE'].includes('EMAIL')
    ? { ...baseTabs, password: <ChangePassword /> }
    : baseTabs;

  const tabComponents = data?.data.result.userAuthTypes.includes('EMAIL')
    ? { ...baseTabs, password: <ChangePassword /> }
    : baseTabs;

  return (
    <div className="w-full  flex h-full">
      <SideNavigation tab={tab} setTab={setTab} />
      <div className="p-10 flex-1 h-full overflow-y-auto">{tabComponents[tab as 'mine']}</div>
    </div>
  );
};

export default Mypage;
