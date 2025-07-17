export interface ProblemList {
  content: ProblemsContent[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface ProblemsContent {
  id: number;
  creator: string;
  categories: string[];
  title: string;
  score: number;
  difficulty: string;
  reference: string;
  totalSubmissions: number;
  correctSubmissions: number;
}

export interface ProblemListWithSearch {
  content: ProblemsContent[];
  totalPages: number;
}
