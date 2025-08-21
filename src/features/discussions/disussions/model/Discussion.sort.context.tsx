'use client';
import { INITIAL_PARAMS, IParams } from '@/shared/model/query/paramsQueryKey';
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';

type Ctx = {
  params: IParams;
  setParams: Dispatch<SetStateAction<IParams>>;
};

const SortContext = createContext<Ctx | null>(null);

export function DiscussionsParamsProvider({
  initialParams = INITIAL_PARAMS,
  children,
}: {
  initialParams?: IParams;
  children: React.ReactNode;
}) {
  const [params, setParams] = useState<IParams>(initialParams);
  const value = useMemo(() => ({ params, setParams }), [params]);
  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
}
export function useDiscussionParams() {
  const ctx = useContext(SortContext);
  if (!ctx) throw new Error('useDiscussionSort을  <DiscussionsSortProvider> 안에서 사용하세요');

  return ctx;
}
