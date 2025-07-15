'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TerminalGitHubIcon from '@/shared/ui/icons/terminal-icons/TerminalGitHubIcon';
import useGitPush from '../lib/useGitPush';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GitPushDialogProps {
  githubUrl: string | null;
}
export default function GitPushDialog({ githubUrl }: GitPushDialogProps) {
  const { pushAutoToggle, choiceRepo, userRepos, currentRepo, setCurrentRepo } = useGitPush();

  return (
    <Dialog>
      <DialogTrigger>
        <TerminalGitHubIcon disabled={!!githubUrl} />
      </DialogTrigger>
      <DialogContent className="w-[425px]">
        <DialogHeader>
          <DialogTitle>git push</DialogTitle>
          <DialogDescription>아래 선택하신 레포에 자동 push 됩니다</DialogDescription>
        </DialogHeader>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={currentRepo}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {userRepos ? (
              <SelectGroup>
                {userRepos.map((repo, idx) => (
                  <SelectItem
                    key={idx}
                    value={repo.repoName}
                    onClick={() => setCurrentRepo(repo.repoName)}
                  >
                    {repo.repoName} default branch : {repo.defaultBranch}
                  </SelectItem>
                ))}
              </SelectGroup>
            ) : (
              <div>레포 불러오기 실패</div>
            )}
          </SelectContent>
        </Select>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button type="button" onClick={() => pushAutoToggle()}>
            자동 push 토글버튼
          </Button>
          <DialogClose asChild>
            <Button type="button" onClick={() => choiceRepo({ repositoryName: currentRepo })}>
              레포선택
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
