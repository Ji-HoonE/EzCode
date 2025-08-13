export type sortType = '최신순' | '인기순' | '추천순';

/** select의 value : '실제 리스폰스로 가야하는 값' */
export const formattedSort: Record<sortType, string> = {
  인기순: 'best',
  최신순: 'latest',
  추천순: 'upvote',
};

export const INITIAL_PARAMS: IParams = {
  page: '0',
  size: '8',
  sort: '인기순',
  sortBy: '인기순',
};

export interface IParams {
  page?: string;
  size?: string;
  sort: sortType;
  sortBy: sortType;
}

export const paramsQueryKeys = {
  key: (key: string, id: string, params: IParams) => [key, id, { ...params }] as const,
};
