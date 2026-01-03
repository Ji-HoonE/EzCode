'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useAdminGetProblemDetailQuery,
  useAdminProblemsListQuery,
} from '@/entities/admin/query/admin.query';
import { Select } from '@/shared/ui/select/Select';
import { Edit, FileText, Image as ImageIcon, Plus, Tag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProblemModal, { ModalMode } from '../_components/modal/ProblemModal';
import {
  useAdminDeleteProblemMutation,
  useAdminRegisterProblemCategoryMutation,
} from '@/entities/admin/mutation/admin.mutation';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Image from 'next/image';
import ProblemImageModal from '../_components/modal/ProblemImageModal';

export default function ProblemsPage() {
  /** 문제 ID 리스트 조회 */
  const { data: problemsList, refetch } = useAdminProblemsListQuery();

  const [mode, setMode] = useState<ModalMode>('register');
  /** 선택된 문제 ID 관리 */
  const [selectedProblemId, setSelectedProblemId] = useState<string>('');
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [isProblemImageModalOpen, setIsProblemImageModalOpen] = useState(false);
  /** 문제 상세 정보 조회 */
  const { data: problemDetail } = useAdminGetProblemDetailQuery(Number(selectedProblemId));

  /** 카테고리 입력 정보 관리 */
  const [categoryInfo, setCategoryInfo] = useState({
    categoryCode: '',
    categoryName: '',
  });

  /** 문제 카테고리 등록 뮤테이션  */
  const { mutateAsync: registerProblemCategory } = useAdminRegisterProblemCategoryMutation();

  /** 문제 삭제 뮤테이션 */
  const { mutateAsync: deleteProblem } = useAdminDeleteProblemMutation();

  /** 문제 ID 선택 핸들러 */
  const handleSelectProblemId = (value: string) => {
    setSelectedProblemId(value);
  };

  /** 문제 등록, 수정 모달 오픈 */
  const handleOpenProblemModal = (mode: ModalMode) => {
    setMode(mode);
    setIsProblemModalOpen(true);
  };

  /** 문제 등록, 수정 모달 닫기 */
  const handleCloseProblemModal = () => {
    setIsProblemModalOpen(false);
  };

  /** 문제 이미지 수정 모달 오픈 */
  const handleOpenProblemImageModal = () => {
    setIsProblemImageModalOpen(true);
  };

  /** 문제 이미지 수정 모달 닫기 */
  const handleCloseProblemImageModal = () => {
    setIsProblemImageModalOpen(false);
  };

  /** 카테고리 입력 정보 변경 핸들러 */
  const handleCategoryInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryInfo((prev) => ({ ...prev, [name]: value }));
  };

  /** 문제 카테고리 등록 핸들러 */
  const handleRegisterProblemCategory = async () => {
    try {
      if (!categoryInfo.categoryCode || !categoryInfo.categoryName) {
        return;
      }
      const response = await registerProblemCategory({
        categoryCode: categoryInfo.categoryCode,
        categoryName: categoryInfo.categoryName,
      });
      if (!response.data.success) return;
      setCategoryInfo({
        categoryCode: '',
        categoryName: '',
      });
      toast.success('카테고리가 등록되었습니다.', {
        richColors: false,
        style: {
          background: '#00d084',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '16px',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  /** 문제 삭제 핸들러 */
  const handleDeleteProblem = async () => {
    try {
      if (!confirm(`선택한 문제를 삭제하시겠습니까?`)) {
        return;
      }
      if (!selectedProblemId) {
        return;
      }
      const response = await deleteProblem(Number(selectedProblemId));
      if (!response.data.success) return;
      toast.error('문제가 삭제되었습니다.', {
        richColors: false,
        style: {
          background: '#ff4d4f',
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#ffffff',
          border: 'none',
        },
      });
      setSelectedProblemId('');
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">문제 관리</h1>
        <p className="text-muted-foreground mt-2">문제를 등록하고 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-[calc(100vh-200px)]">
        {/* 왼쪽 열 */}
        <div className="flex flex-col gap-3 h-full">
          {/* 문제 등록 카드 */}
          <Card className="bg-card border-border flex flex-col flex-1">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                새 문제 등록
              </CardTitle>
              <CardDescription>새로운 코딩 문제를 등록하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-lg bg-muted/30 border-2 border-dashed border-muted-foreground/30 text-center">
                <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-4">
                  새로운 문제를 등록하려면 아래 버튼을 클릭하세요
                </p>
                <Button
                  className="gap-2"
                  size="lg"
                  onClick={() => handleOpenProblemModal('register')}
                >
                  <Plus className="h-4 w-4" />
                  문제 등록
                </Button>
              </div>

              {/* 문제 통계 */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-card-foreground mb-3">문제 통계</h3>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">전체 문제 수</p>
                  <p className="text-3xl font-bold text-card-foreground mt-2">
                    {problemsList ? problemsList.length - 1 : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 카테고리 등록 카드 */}
          <Card className="bg-card border-border flex flex-col flex-1">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Tag className="h-5 w-5" />
                카테고리 등록
              </CardTitle>
              <CardDescription>문제 카테고리를 등록하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="categoryCode"
                    className="text-sm font-medium text-card-foreground"
                  >
                    카테고리 코드 <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="categoryCode"
                    name="categoryCode"
                    value={categoryInfo.categoryCode}
                    onChange={handleCategoryInfoChange}
                    placeholder="코드를 입력해주세요."
                    className="w-full border-border bg-gray-800/50 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="categoryName"
                    className="text-sm font-medium text-card-foreground"
                  >
                    카테고리 이름 <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="categoryName"
                    name="categoryName"
                    value={categoryInfo.categoryName}
                    onChange={handleCategoryInfoChange}
                    placeholder="이름을 입력해주세요."
                    className="w-full border-border bg-gray-800/50 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    className="gap-2"
                    size="lg"
                    onClick={handleRegisterProblemCategory}
                    disabled={!categoryInfo.categoryCode || !categoryInfo.categoryName}
                  >
                    등록
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 열 - 문제 수정 및 삭제 카드 */}
        <Card className="bg-card border-border h-full flex flex-col overflow-hidden">
          <CardHeader className="shrink-0">
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <FileText className="h-5 w-5" />
              문제 수정 및 삭제
            </CardTitle>
            <CardDescription>기존 문제를 수정, 이미지 수정, 삭제하세요</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 overflow-hidden gap-4">
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-card-foreground">문제 선택</label>
                <Select
                  title="문제를 선택하세요"
                  value={selectedProblemId}
                  option={problemsList || [{ label: '선택', value: '' }]}
                  setValue={handleSelectProblemId}
                />
              </div>
            </div>

            {selectedProblemId && problemDetail?.data?.result && (
              <div className="p-4 rounded-lg bg-card border border-border space-y-4 flex-1 overflow-y-auto min-h-0">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-lg font-semibold text-card-foreground">문제 정보</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleOpenProblemModal('update')}
                      disabled={!selectedProblemId}
                      className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleOpenProblemImageModal}
                      disabled={!selectedProblemId}
                      className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                      size="sm"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                      size="sm"
                      onClick={handleDeleteProblem}
                      disabled={!selectedProblemId}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
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
                        {new Date(problemDetail.data.result.createdAt).toLocaleString('ko-KR')}
                      </pre>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        수정일
                      </label>
                      <pre className="bg-muted/50 rounded p-2 text-xs whitespace-pre-wrap border border-border overflow-y-auto">
                        {new Date(problemDetail.data.result.modifiedAt).toLocaleString('ko-KR')}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <ProblemModal
        isOpen={isProblemModalOpen}
        onClose={handleCloseProblemModal}
        mode={mode}
        problemId={selectedProblemId}
      />
      <ProblemImageModal
        isOpen={isProblemImageModalOpen}
        onClose={handleCloseProblemImageModal}
        problemId={selectedProblemId}
      />
    </div>
  );
}
