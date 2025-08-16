import {
  useGetGitHubRepo,
  useGitPushAutoToggleMutation,
  useGitRepoChoice,
} from '@/entities/submitCode';
import { useAutoGitPushStatus } from '@/entities/submitCode/gitpush/model/query/gitpush.query';
import { OptionType } from '@/shared/ui/select/Select';
import { useEffect, useState } from 'react';
import useGitPushStatusStore from '../model/useGitPushStatus.store';

export default function useGitPush() {
  const [currentRepo, setCurrentRepo] = useState('');

  const { mutateAsync: pushAutoToggle } = useGitPushAutoToggleMutation();
  const { mutateAsync: choiceRepo } = useGitRepoChoice();
  const { data: userRepos } = useGetGitHubRepo();
  const { data: autoPushStatus } = useAutoGitPushStatus();
  const { gitPushStatus: webSocketGitPushStatus } = useGitPushStatusStore();

  const reposSelectOptions: OptionType[] = [];

  useEffect(() => {
    if (userRepos) {
      setCurrentRepo(userRepos[0].repoName);
      for (const repo of userRepos) {
        reposSelectOptions.push({ label: repo.repoName, value: repo.repoName });
      }
      // setCurrentRepo(reposSelectOptions[0].label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRepos]);

  return {
    pushAutoToggle,
    choiceRepo,
    reposSelectOptions,
    currentRepo,
    userRepos,
    setCurrentRepo,
    autoPushStatus,
    webSocketGitPushStatus,
  };
}
