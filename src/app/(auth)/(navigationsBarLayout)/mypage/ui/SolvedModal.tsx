import { AlertDialogHeader } from '@/components/ui/alert-dialog';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { SubmissionsResonse } from '@/entities/mypage/model/types';
import { Button } from '@/shared/ui/button/Button';
import { useRouter } from 'next/navigation';

export const SolvedModal = ({
  data,
  onClose,
  open,
}: {
  data: SubmissionsResonse;
  onClose: () => void;
  open: boolean;
}) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[60%] max-h-[80%] overflow-y-auto" showCloseButton>
        <AlertDialogHeader className="flex flex-row justify-between w-full">
          <DialogTitle>내가 푼 문제 상세 페이지</DialogTitle>
        </AlertDialogHeader>
        <Button
          variant="default"
          className="w-[20%] "
          label="문제 바로가기"
          onClick={() => {
            onClose();
            router.push(`/problems/${data.problemId}`);
          }}
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            <span className="w-25">제목</span>

            <span>{data?.problemTitle}</span>
          </div>
          <div className="flex flex-row gap-1">
            <span className="w-25 shrink-0">설명</span>

            <span className="whitespace-pre-line">{data?.problemDescription}</span>
          </div>
          <div className="flex flex-col gap-1 ">
            {data?.submissions.map((item, index) => {
              return (
                <div
                  className="flex flex-col gap-2 p-4 rounded-xl border border-gray-300 shadow-sm "
                  key={item.id}
                >
                  <div className="flex flex-row gap-1">
                    <span className="w-25 shrink-0">제출 답안 {index + 1}</span>
                    <span className="whitespace-pre-line">{item.sourceCode}</span>
                  </div>
                  <div className="flex flex-row gap-1">
                    <span className="w-25">정답 여부</span>
                    <span>{item.isCorrect ? '정답' : '오답'}</span>
                  </div>
                  <div className="flex flex-row gap-1">
                    <span className="w-25">실행 시간</span>
                    <span>{item.executionTime}</span>
                  </div>
                  <div className="flex flex-row gap-1">
                    <span className="w-25">메모리 사용량</span>
                    <span>{item.memoryUsage}</span>
                  </div>
                  <div className="flex flex-row gap-1">
                    <span className="w-25">제출 일자</span>
                    <span>
                      {item.submittedAt.split('T')[0]} {item.submittedAt.split('T')[1]}
                    </span>
                  </div>

                  {index !== data.submissions.length - 1 && <hr className="text-[#000]" />}
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
