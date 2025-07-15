export type TGetReposResponse = IGitRepo[];

interface IGitRepo {
  repoName: string;
  defaultBranch: string;
}
