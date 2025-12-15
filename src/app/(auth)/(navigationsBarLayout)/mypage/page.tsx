'use client';
import { useState } from 'react';
import { SideNavigation } from './SideNavigation';
import { Mine } from './tab/Mine';
import { Solved } from './tab/Solved';
import { Report } from './tab/Report';
import { ChangePassword } from './tab/ChangePassword';
import { useMyInfoQuery } from '@/entities/mypage/model/query';

const Mypage = () => {
  const [tab, setTab] = useState('mine');
  const { data } = useMyInfoQuery();

  const baseTabs = {
    mine: <Mine />,
    solved: <Solved />,
    report: <Report />,
  } as const;

  // 소셜로그인은 비밀번호 변경 탭 안보이게
  const tabComponents = data?.data.result.userAuthTypes.includes('EMAIL')
    ? { ...baseTabs, password: <ChangePassword /> }
    : baseTabs;
  return (
    <div className="w-full  flex h-full">
      <SideNavigation tab={tab} setTab={setTab} authType={data?.data.result?.userAuthTypes || []} />
      <div className="p-10 flex-1 h-full overflow-y-auto">{tabComponents[tab as 'mine']}</div>
    </div>
  );
};

export default Mypage;
