import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { SubmissionsResonse } from '@/query/mypage/mypage.interface';

export const SolvedModal = ({
  data,
  onClose,
  open,
}: {
  data: SubmissionsResonse;
  onClose: () => void;
  open: boolean;
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <AlertDialogHeader className="flex flex-row justify-between w-full">
          <AlertDialogTitle>내가 푼 문제 상세 페이지</AlertDialogTitle>
          <AlertDialogCancel className="border-none" onClick={onClose}>
            X
          </AlertDialogCancel>
        </AlertDialogHeader>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            <span className="w-25">제목</span>
            <span>{data.problemTitle}</span>
          </div>
          <div className="flex flex-row gap-1">
            <span className="w-25 shrink-0">설명</span>
            <span>{data.problemDescription}</span>
          </div>
          <div className="flex flex-col gap-1 border-[#000] border-[1px]">
            {data.submissions.map((item, index) => {
              return (
                <div className="flex flex-col gap-1" key={item.id}>
                  <div className="flex flex-row gap-1">
                    <span className="w-25 shrink-0">제출 답안 {index + 1}</span>
                    <span>{item.sourceCode}</span>
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
      </AlertDialogContent>
    </AlertDialog>
  );
};
