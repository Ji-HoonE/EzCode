'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Icon } from '@/shared';
import useGitPush from '../hooks/useGitPush';
import { Switch } from '@/components/ui/switch';

interface GitPushDialogProps {
  githubUrl: string | null;
}
export default function GitPushDialog({ githubUrl }: GitPushDialogProps) {
  const { pushAutoToggle, choiceRepo, userRepos, currentRepo, setCurrentRepo, autoPushStatus } =
    useGitPush();

  return (
    <Dialog>
      <DialogTrigger disabled={!githubUrl}>
        <Icon.TerminalGitHubIcon hasGitHubUrl={!!githubUrl} />
      </DialogTrigger>
      <DialogContent className="w-[425px] bg-secondary-background border-[#333]">
        <DialogHeader>
          <DialogTitle>GitHub 연동</DialogTitle>
          <DialogDescription className="text-sm font-medium text-[#ccc] mb-2 block">
            아래 선택하신 repository에 자동 push 됩니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <>
            <label className="text-sm font-medium text-[#ccc] mb-2 block">레포지토리 선택</label>

            <Select value={currentRepo}>
              <SelectTrigger
                className="bg-background border-[#333] text-white"
                disabled={!userRepos}
              >
                <SelectValue
                  placeholder={userRepos ? '레포지토리를 선택하세요' : '불러오기 실패'}
                />
              </SelectTrigger>
              <SelectContent className="bg-secondary-background border-[#333]">
                {userRepos ? (
                  <ul className="overflow-y-auto max-h-60">
                    {userRepos.map((repo, idx) => (
                      <SelectItem
                        key={idx}
                        value={repo.repoName}
                        onClick={() => setCurrentRepo(repo.repoName)}
                        className="text-white hover:primary flex justify-between"
                      >
                        <p className="text-secondary text-md"> {repo.repoName}</p>
                        <p className="text-xs text-[#ccc]">branch : {repo.defaultBranch}</p>
                      </SelectItem>
                    ))}
                  </ul>
                ) : null}
              </SelectContent>
            </Select>
          </>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#ccc]">자동 푸시</label>
            <Switch
              checked={autoPushStatus}
              onCheckedChange={() => pushAutoToggle()}
              className="data-[state=checked]:bg-[#00d084] text-white data-[state=unchecked]:bg-gray-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => choiceRepo({ repositoryName: currentRepo })}
              className="bg-[#214d35] hover:bg-[#276e48] text-white flex-1"
              disabled={!!currentRepo && !autoPushStatus}
            >
              연동하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
