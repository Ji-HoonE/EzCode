'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  useAdminGetProblemDetailQuery,
  useAdminGetTestCasesQuery,
  useAdminProblemsListQuery,
} from '@/entities/admin/query/admin.query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, FileText, Trash2, Plus } from 'lucide-react';
import { Select } from '@/shared/ui/select/Select';
import TestCaseModal from '../_components/modal/TestCaseModal';
import { useAdminDeleteTestCaseMutation } from '@/entities/admin/mutation/admin.mutation';
import { ITestCaseResponse } from '@/api/service/admin/admin.interface';
import { toast } from 'sonner';
import Image from 'next/image';

export default function TestCasesPage() {
  /** 문제 ID 리스트 조회 */
  const [selectedProblemId, setSelectedProblemId] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState<ITestCaseResponse | null>(null);

  const { data: problemsList } = useAdminProblemsListQuery();

  const { data: testCasesList, refetch } = useAdminGetTestCasesQuery(Number(selectedProblemId));

  const { data: problemDetail } = useAdminGetProblemDetailQuery(Number(selectedProblemId));

  const { mutateAsync: deleteTestCase } = useAdminDeleteTestCaseMutation();

  /** 문제 ID 선택 핸들러 */
  const handleSelectProblemId = (value: string) => {
    setSelectedProblemId(value);
  };

  /** 테스트 케이스 모달 열기 */
  const handleOpenModal = (testCase?: ITestCaseResponse) => {
    if (testCase) {
      setSelectedTestCase(testCase);
    } else {
      setSelectedTestCase(null);
    }
    setIsAddModalOpen(true);
  };

  /** 테스트 케이스 모달 닫기 */
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setSelectedTestCase(null);
  };

  /** 테스트 케이스 삭제 */
  const handleDeleteTestCase = async (testcaseId: number) => {
    if (!confirm(`선택한 테스트 케이스를 삭제하시겠습니까?`)) {
      return;
    }
    try {
      const res = await deleteTestCase({
        problemId: Number(selectedProblemId),
        testcaseId,
      });
      if (!res.data.success) {
        return;
      }
      toast.error('테스트 케이스가 삭제되었습니다.', {
        richColors: false,
        style: {
          background: '#ff4d4f',
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#ffffff',
          border: 'none',
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="space-y-6 flex flex-col">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">테스트 케이스 관리</h1>
            <p className="text-muted-foreground mt-2">문제별 테스트 케이스를 등록하고 관리하세요</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-[30px] h-[calc(100vh-180px)] items-start">
            <Card className="bg-card border-border flex flex-col h-full overflow-hidden">
              <CardHeader className="shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-card-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    문제 선택
                  </CardTitle>
                  <Button
                    disabled={!selectedProblemId}
                    onClick={() => handleOpenModal()}
                    className="h-8 w-8 p-0 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 overflow-hidden gap-4">
                <div className="space-y-4 shrink-0">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">문제 선택</label>
                    <Select
                      title="등록된 문제 선택"
                      value={selectedProblemId}
                      option={problemsList || [{ label: '선택', value: '' }]}
                      setValue={handleSelectProblemId}
                    />
                  </div>
                </div>

                {selectedProblemId && (
                  <>
                    {problemDetail?.data?.result && (
                      <div className="p-4 rounded-lg bg-card border border-border space-y-4 flex-1 overflow-y-auto min-h-0">
                        <div className="flex items-center justify-between border-b border-border pb-3">
                          <h3 className="text-lg font-semibold text-card-foreground">문제 정보</h3>
                          <FileText className="h-8 w-8 text-accent" />
                        </div>

                        <div className="space-y-2">
                          {problemDetail.data.result.imageUrl && (
                            <div className="w-full relative">
                              <Image
                                src={problemDetail.data.result.imageUrl}
                                alt={problemDetail.data.result.title}
                                unoptimized
                                className="object-contain"
                                width={200}
                                height={100}
                              />
                            </div>
                          )}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">
                              제목
                            </label>
                            <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                              {problemDetail.data.result.title}
                            </pre>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                작성자
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                                {problemDetail.data.result.creator}
                              </pre>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                점수
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                                {problemDetail.data.result.score}점
                              </pre>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                난이도
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                                {problemDetail.data.result.difficulty}
                              </pre>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                카테고리
                              </label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {problemDetail.data.result.categories?.map((category, idx) => (
                                  <pre
                                    key={idx}
                                    className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto"
                                  >
                                    {category}
                                  </pre>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                시간 제한
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                                {problemDetail.data.result.timeLimit}ms
                              </pre>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                메모리 제한
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                                {problemDetail.data.result.memoryLimit}MB
                              </pre>
                            </div>
                          </div>

                          {problemDetail.data.result.description && (
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                설명
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border">
                                {problemDetail.data.result.description}
                              </pre>
                            </div>
                          )}

                          {problemDetail.data.result.reference && (
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                참고
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto break-all">
                                {problemDetail.data.result.reference}
                              </pre>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                생성일
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                                {new Date(problemDetail.data.result.createdAt).toLocaleString(
                                  'ko-KR'
                                )}
                              </pre>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                수정일
                              </label>
                              <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                                {new Date(problemDetail.data.result.modifiedAt).toLocaleString(
                                  'ko-KR'
                                )}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
            <Card className="bg-card border-border h-full flex flex-col overflow-hidden">
              <CardHeader className="shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-card-foreground flex items-center gap-2 mb-2 flex">
                      <FileText className="h-5 w-5" />
                      테스트 케이스 목록
                    </CardTitle>
                    <CardDescription>
                      {selectedProblemId
                        ? `문제 ${selectedProblemId}의 테스트 케이스 목록`
                        : '문제를 선택하면 테스트 케이스 목록이 표시됩니다'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 overflow-y-auto">
                {!selectedProblemId ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      왼쪽에서 문제를 선택해주세요
                    </div>
                  </div>
                ) : !testCasesList?.data?.result || testCasesList.data?.result?.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      등록된 테스트 케이스가 없습니다
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 flex-col">
                    {testCasesList.data.result?.map((testCase: ITestCaseResponse) => (
                      <div
                        key={testCase.id}
                        className="p-4 rounded-lg bg-muted/50 border border-muted space-y-3 h-[200px]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-card-foreground">
                              테스트 케이스 #{testCase.id}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                              size="sm"
                              onClick={() => handleOpenModal(testCase)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                              size="sm"
                              onClick={() => handleDeleteTestCase(testCase.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 h-full">
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">
                              Input
                            </label>
                            <pre className="bg-background rounded p-2 text-xs whitespace-pre-wrap border border-border h-full max-h-[100px] overflow-y-auto">
                              {testCase.input ?? '(null)'}
                            </pre>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">
                              Output
                            </label>
                            <pre className="bg-background rounded p-2 text-xs whitespace-pre-wrap border border-border h-full max-h-[100px] overflow-y-auto">
                              {testCase.output ?? '(null)'}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <TestCaseModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        selectedProblemId={selectedProblemId}
        selectedTestCase={selectedTestCase}
      />
    </>
  );
}
