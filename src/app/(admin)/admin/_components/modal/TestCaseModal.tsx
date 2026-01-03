import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { TestTube, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  useAdminRegisterTestCaseMutation,
  useAdminUpdateTestCaseMutation,
} from '@/entities/admin/mutation/admin.mutation';
import { useQueryClient } from '@tanstack/react-query';
import { ITestCaseResponse } from '@/api/service/admin/admin.interface';

interface ITestCaseModal {
  isOpen: boolean;
  onClose: () => void;
  selectedProblemId: string;
  selectedTestCase?: ITestCaseResponse | null;
}

/**
 * @description 테스트 케이스 모달
 * @returns
 */
const TestCaseModal = (props: ITestCaseModal) => {
  const { isOpen, onClose, selectedProblemId, selectedTestCase } = props;
  const queryClient = useQueryClient();
  /** 테스트 케이스 입력 정보 */
  const [testCaseInfo, setTestCaseInfo] = useState({
    input: '',
    output: '',
  });

  /** 테스트 케이스 등록 뮤테이션 */
  const { mutateAsync: registerTestCase } = useAdminRegisterTestCaseMutation();

  /** 테스트 케이스 등록 뮤테이션 */
  const { mutateAsync: updateTestCase } = useAdminUpdateTestCaseMutation();

  /** 테스트 케이스 입력 정보 변경 핸들러 */
  const handleTestCaseInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestCaseInfo((prev) => ({ ...prev, [name]: value }));
  };

  /** 테스트 케이스 등록 핸들러 */
  const handleRegisterTestCase = async () => {
    try {
      if (!selectedProblemId || !testCaseInfo.input || !testCaseInfo.output) {
        return;
      }
      const res = await registerTestCase({
        problemId: Number(selectedProblemId),
        input: testCaseInfo.input,
        output: testCaseInfo.output,
      });
      if (!res.data.success) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['adminGetTestCases', Number(selectedProblemId)] });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  /** 테스트 케이스 수정 핸들러 */
  const handleUpdateTestCase = async () => {
    try {
      if (
        !selectedProblemId ||
        !testCaseInfo.input ||
        !testCaseInfo.output ||
        selectedTestCase?.id === undefined ||
        selectedTestCase?.id === null
      ) {
        return;
      }
      const res = await updateTestCase({
        problemId: Number(selectedProblemId),
        testcaseId: selectedTestCase?.id ?? 0,
        input: testCaseInfo.input,
        output: testCaseInfo.output,
      });
      if (!res.data.success) return;
      queryClient.invalidateQueries({ queryKey: ['adminGetTestCases', Number(selectedProblemId)] });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  /** 모달이 열릴 때 데이터 설정, 닫힐 때 초기화 */
  useEffect(() => {
    if (isOpen) {
      if (selectedTestCase) {
        setTestCaseInfo({
          input: selectedTestCase.input ?? '',
          output: selectedTestCase.output ?? '',
        });
      } else {
        setTestCaseInfo({
          input: '',
          output: '',
        });
      }
    } else {
      setTestCaseInfo({
        input: '',
        output: '',
      });
    }
  }, [isOpen, selectedTestCase]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} modal>
      <DialogContent
        className={cn(
          'max-w-[600px] w-full bg-card border-border p-0 text-white',
          'shadow-2xl rounded-[12px] flex flex-col overflow-hidden'
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="px-6 pt-6 pb-4 relative shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-accent" />
            <span className="text-accent">
              {selectedTestCase?.id !== undefined && selectedTestCase?.id !== null
                ? '테스트 케이스 수정'
                : '테스트 케이스 등록'}
            </span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {selectedTestCase?.id !== undefined && selectedTestCase?.id !== null
              ? '기존 테스트 케이스를 수정하세요.'
              : '새로운 테스트 케이스를 등록하세요.'}
          </DialogDescription>
          <DialogClose
            onClick={onClose}
            className="absolute top-5 right-6 rounded-xs opacity-70 hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0"
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4">
          <section className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="input" className="text-sm font-medium text-card-foreground">
                  Input <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="input"
                  name="input"
                  value={testCaseInfo.input}
                  onChange={handleTestCaseInfoChange}
                  placeholder="테스트 케이스 입력값을 입력하세요"
                  className="w-full min-h-[120px] rounded-md border border-border bg-background px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="output" className="text-sm font-medium text-card-foreground">
                  Output <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="output"
                  name="output"
                  value={testCaseInfo.output}
                  onChange={handleTestCaseInfoChange}
                  placeholder="테스트 케이스 출력값을 입력하세요"
                  className="w-full min-h-[120px] rounded-md border border-border bg-background px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  required
                />
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <Button
              disabled={!testCaseInfo.output || !testCaseInfo.input}
              className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={
                selectedTestCase?.id !== undefined && selectedTestCase?.id !== null
                  ? handleUpdateTestCase
                  : handleRegisterTestCase
              }
            >
              {selectedTestCase?.id !== undefined && selectedTestCase?.id !== null
                ? '수정'
                : '추가'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestCaseModal;
