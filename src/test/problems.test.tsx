import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';

import '@testing-library/jest-dom';
import ProblemsList from '@/app/(user)/(auth)/(navigationsBarLayout)/problems/page';

jest.mock('@/entities/problems/model/query', () => ({
  useProblemListQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    refresh: jest.fn(),
  }),
}));

const mockUseProblemListQuery = require('@/entities/problems/model/query').useProblemListQuery;

describe('ProblemsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('필터와 검색 버튼을 눌렀을 때 목록이 업데이트되는지 확인', async () => {
    mockUseProblemListQuery.mockReturnValue({
      data: {
        result: {
          content: [
            {
              id: 236,
              creator: 'EZCODE',
              categories: [],
              title: '점프 점프',
              score: 40,
              difficulty: 'LV3',
              reference: 'ORIGINAL',
              totalSubmissions: 3,
              correctSubmissions: 2,
            },
          ],
          totalPages: 236,
        },
      },
      isLoading: false,
    });

    render(<ProblemsList />);

    // 카테고리 필터 열기 (버튼 클릭)
    fireEvent.click(screen.getByRole('button', { name: /카테고리/i }));
    // 카테고리 메뉴에서 'BFS' 선택
    fireEvent.click(screen.getByText('BFS'));

    // 난이도 필터 열기
    fireEvent.click(screen.getByRole('button', { name: /난이도/i }));
    // 난이도 메뉴에서 'LV2' 선택
    fireEvent.click(screen.getByText('LV2'));

    // 검색어 입력
    const searchInput = screen.getByPlaceholderText('문제 제목 또는 번호 검색');
    fireEvent.change(searchInput, { target: { value: '그래프' } });

    // 검색 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /검색/i }));

    await waitFor(() => {
      expect(mockUseProblemListQuery).toHaveBeenCalledWith(1, 10, '', 'BFS', 'LV2', '그래프');
    });
  });

  it('엔터 입력 시에도 검색이 실행되는지 확인', async () => {
    mockUseProblemListQuery.mockReturnValue({
      data: {
        result: {
          content: [
            {
              id: 236,
              creator: 'EZCODE',
              categories: [],
              title: '점프 점프',
              score: 40,
              difficulty: 'LV3',
              reference: 'ORIGINAL',
              totalSubmissions: 3,
              correctSubmissions: 2,
            },
          ],
          totalPages: 236,
        },
      },
      isLoading: false,
    });

    render(<ProblemsList />);

    const searchInput = screen.getByPlaceholderText('문제 제목 또는 번호 검색');
    fireEvent.change(searchInput, { target: { value: 'DFS 문제' } });

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockUseProblemListQuery).toHaveBeenCalledWith(1, 10, '', '', '', 'DFS 문제');
    });
  });

  it('선택된 필터 태그가 표시되는지 확인', () => {
    mockUseProblemListQuery.mockReturnValue({
      data: {
        result: {
          content: [
            {
              id: 236,
              creator: 'EZCODE',
              categories: [],
              title: '점프 점프',
              score: 40,
              difficulty: 'LV3',
              reference: 'ORIGINAL',
              totalSubmissions: 3,
              correctSubmissions: 2,
            },
          ],
          totalPages: 236,
        },
      },
      isLoading: false,
    });

    render(<ProblemsList />);

    fireEvent.click(screen.getByRole('button', { name: /카테고리/i }));
    fireEvent.click(screen.getByText('DFS'));

    // 난이도 필터 열기
    fireEvent.click(screen.getByRole('button', { name: /난이도/i }));
    fireEvent.click(screen.getByText('LV3'));

    // 선택된 필터 태그가 표시되는 컨테이너 요소 찾기 (필터 태그가 담긴 div 등)
    // 여기서 '선택된 필터 태그가 렌더되는 영역'의 역할(role)이나 test-id가 있으면 더 정확하게 찾을 수 있습니다.
    // 예시로, role="region" 혹은 aria-label로 찾거나, testid가 있으면 getByTestId 활용
    // 없으면 상위 특정 요소를 쓸 수도 있음

    // 예: 필터 태그가 <section aria-label="선택된 필터"> 안에 있다면

    // 그 영역 안에서만 텍스트 검색
    const selectedFilterSection = screen.getByTestId('selected-filters');
    const { getByText } = within(selectedFilterSection);

    expect(getByText('DFS')).toBeInTheDocument();
    expect(getByText('LV3')).toBeInTheDocument();
  });
});
