import {
  useGetGitHubRepo,
  useGitPushAutoToggleMutation,
  useGitRepoChoice,
} from '@/entities/submitCode';
import { useAutoGitPushStatus } from '@/entities/submitCode/gitpush/model/query/gitpush.query';
import { useEffect, useState } from 'react';
import useGitPushStatusStore from '../model/useGitPushStatus.store';
import { OptionType } from '@/shared/ui/select/Select';

const gitPushStatusToKor: Record<string, string> = {
  STARTED: '해당 repo에 push 중... ',
  SUCCESS: 'push에 성공했습니다!',
  FAILED: 'push에 실패 했습니다',
};

export default function useGitPush() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [reposOptions, setReposOptions] = useState<OptionType[]>([]);

  const { mutateAsync: pushAutoToggle } = useGitPushAutoToggleMutation();
  const { mutateAsync: choiceRepo } = useGitRepoChoice();
  const { data: userRepos } = useGetGitHubRepo();
  const { data: currentGitPushStatus } = useAutoGitPushStatus();
  const { gitPushStatus } = useGitPushStatusStore();

  useEffect(() => {
    if (userRepos) {
      if (currentGitPushStatus?.githubRepoName) {
        setCurrentRepo(currentGitPushStatus.githubRepoName);
      } else {
        setCurrentRepo(userRepos[0].repoName);
      }
      const options: OptionType[] = userRepos.map((repo) => ({
        label: `${repo.repoName} - default : ${repo.defaultBranch}`,
        value: repo.repoName,
      }));
      setReposOptions(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRepos, currentGitPushStatus]);

  const webSocketGitPushStatus = gitPushStatus ? gitPushStatusToKor[gitPushStatus] : null;

  return {
    pushAutoToggle,
    choiceRepo,
    reposOptions,
    currentRepo,
    setCurrentRepo,
    currentGitPushStatus,
    webSocketGitPushStatus,
  };
}
