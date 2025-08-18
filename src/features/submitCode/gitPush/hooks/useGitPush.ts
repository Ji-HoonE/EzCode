import {
  useGetGitHubRepo,
  useGitPushAutoToggleMutation,
  useGitRepoChoice,
} from '@/entities/submitCode';
import { useAutoGitPushStatus } from '@/entities/submitCode/gitpush/model/query/gitpush.query';
import { useEffect, useState } from 'react';
import useGitPushStatusStore from '../model/useGitPushStatus.store';
import { OptionType } from '@/shared/ui/select/Select';

export default function useGitPush() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [reposOptions, setReposOptions] = useState<OptionType[]>([]);

  const { mutateAsync: pushAutoToggle } = useGitPushAutoToggleMutation();
  const { mutateAsync: choiceRepo } = useGitRepoChoice();
  const { data: userRepos } = useGetGitHubRepo();
  const { data: autoPushStatus } = useAutoGitPushStatus();
  const { gitPushStatus: webSocketGitPushStatus } = useGitPushStatusStore();

  useEffect(() => {
    if (userRepos) {
      setCurrentRepo(userRepos[0].repoName);
      const options: OptionType[] = userRepos.map((repo) => ({
        label: `${repo.repoName} - default : ${repo.defaultBranch}`,
        value: repo.repoName,
      }));
      setReposOptions(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRepos]);

  return {
    pushAutoToggle,
    choiceRepo,
    reposOptions,
    currentRepo,

    setCurrentRepo,
    autoPushStatus,
    webSocketGitPushStatus,
  };
}
