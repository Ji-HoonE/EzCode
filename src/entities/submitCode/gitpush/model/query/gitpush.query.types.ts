export type TGetReposResponse = IGitRepo[];

interface IGitRepo {
  repoName: string;
  defaultBranch: string;
}

export interface IGitPushAutoToggleResponse {
  message: string;
  gitPushStatus: boolean;
}
