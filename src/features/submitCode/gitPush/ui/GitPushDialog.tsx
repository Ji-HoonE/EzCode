'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Icon } from '@/shared';
import useGitPush from '../hooks/useGitPush';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { Select } from '@/shared/ui/select/Select';

interface GitPushDialogProps {
  githubUrl: string | null;
}
export default function GitPushDialog({ githubUrl }: GitPushDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gitPushStatus, setGitPushStatus] = useState<string | null>(null);
  const [isToolTipOpen, setIsToolTipOpen] = useState<true | undefined>(undefined);

  const {
    pushAutoToggle,
    choiceRepo,
    reposOptions,
    currentRepo,
    setCurrentRepo,
    currentGitPushData,
    webSocketGitPushStatus,
  } = useGitPush(githubUrl);

  useEffect(() => {
    setGitPushStatus(webSocketGitPushStatus);
    setIsToolTipOpen(webSocketGitPushStatus ? true : undefined);
  }, [webSocketGitPushStatus]);

  const tooltipContent = !githubUrl
    ? 'github 연동이 안되어 있어요!'
    : !currentGitPushData?.gitPushStatus
      ? 'auto push 기능이 꺼져 있어요'
      : 'auto push가 켜져 있어요';

  return (
    <Dialog open={isDialogOpen}>
      <Tooltip open={isToolTipOpen}>
        <TooltipTrigger disabled={!githubUrl} onClick={() => setIsDialogOpen(true)}>
          <Icon.TerminalGitHubIcon
            isOnAutoPush={currentGitPushData?.gitPushStatus}
            hasGitGubUrl={!!githubUrl}
          />
        </TooltipTrigger>
        <TooltipContent>
          {!!gitPushStatus ? <p>{gitPushStatus}</p> : <p>{tooltipContent}</p>}
        </TooltipContent>
      </Tooltip>
      <DialogContent
        className="w-[425px] bg-secondary-background border-[#333]"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>GitHub 연동</DialogTitle>
          <DialogDescription className="text-sm font-medium text-[#ccc] mb-2 block">
            아래 선택하신 repository에 자동 push 됩니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <>
            <label className="text-sm font-medium text-[#ccc] mb-2 block">레포지토리 선택</label>
            <Select option={reposOptions} value={currentRepo} title="" setValue={setCurrentRepo} />
          </>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#ccc]">자동 푸시</label>
            <Switch
              checked={currentGitPushData?.gitPushStatus}
              onCheckedChange={() => pushAutoToggle()}
              className="data-[state=checked]:bg-[#00d084] text-white data-[state=unchecked]:bg-gray-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                choiceRepo({ repositoryName: currentRepo });
                setIsDialogOpen(false);
              }}
              className="bg-primary  hover:bg-hover-primary flex-3"
              disabled={!!currentRepo && !currentGitPushData?.gitPushStatus}
            >
              연동하기
            </Button>
            <Button
              onClick={() => {
                setIsDialogOpen(false);
              }}
              className="bg-gray-500 flex-1"
            >
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
