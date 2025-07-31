import {
  useGetGitHubRepo,
  useGitPushAutoToggleMutation,
  useGitRepoChoice,
} from '@/entities/submitCode';
import { useAutoGitPushStatus } from '@/entities/submitCode/gitpush/model/query/gitpush.query';
import { useEffect, useState } from 'react';

export default function useGitPush() {
  const [currentRepo, setCurrentRepo] = useState('');

  const { mutateAsync: pushAutoToggle } = useGitPushAutoToggleMutation();
  const { mutateAsync: choiceRepo } = useGitRepoChoice();
  const { data: userRepos } = useGetGitHubRepo();
  const { data: autoPushStatus } = useAutoGitPushStatus();

  useEffect(() => {
    if (userRepos) {
      setCurrentRepo(userRepos[0].repoName);
    }
  }, [userRepos]);

  return {
    pushAutoToggle,
    choiceRepo,
    userRepos,
    currentRepo,
    setCurrentRepo,
    autoPushStatus,
  };
}
