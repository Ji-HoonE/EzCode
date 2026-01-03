import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/shared/ui/select/Select';
import { cn } from '@/lib/utils';
import { FileText, XIcon, Upload, Image as ImageIcon } from 'lucide-react';
import {
  useAdminRegisterProblemMutation,
  useAdminUpdateProblemMutation,
} from '@/entities/admin/mutation/admin.mutation';
import {
  CATEGORY_OPTIONS,
  DIFFICULTY_OPTIONS,
  REFERENCE_OPTIONS,
} from '@/entities/problems/model/filter-options';
import { useAdminGetProblemDetailQuery } from '@/entities/admin/query/admin.query';
import { useQueryClient } from '@tanstack/react-query';
import { MultiSelect } from '@/shared/ui/select/MultiSelect';

type ProblemFormValues = {
  categories: string[];
  title: string;
  description: string;
  difficulty: string;
  memoryLimit: string;
  timeLimit: string;
  reference: string;
};

export type ModalMode = 'register' | 'update';

interface ProblemModalProps {
  mode?: ModalMode;
  isOpen: boolean;
  problemId: string;
  onClose: () => void;
}

const DEFAULT_VALUES: ProblemFormValues = {
  categories: [],
  title: '',
  description: '',
  difficulty: '',
  memoryLimit: '',
  timeLimit: '',
  reference: '',
};

const ProblemModal = (props: ProblemModalProps) => {
  const { isOpen, onClose, mode, problemId } = props;
  const queryClient = useQueryClient();
  const [formValues, setFormValues] = useState<ProblemFormValues>(DEFAULT_VALUES);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: problemDetail } = useAdminGetProblemDetailQuery(Number(problemId));

  const { mutateAsync } = useAdminRegisterProblemMutation();

  const { mutateAsync: updateProblem } = useAdminUpdateProblemMutation();

  const handleInputChange =
    (field: keyof ProblemFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      if (field === 'memoryLimit' || field === 'timeLimit') {
        if (value === '' || /^\d+$/.test(value)) {
          setFormValues((prev) => ({
            ...prev,
            [field]: value,
          }));
        }
      } else {
        setFormValues((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    };

  const resetForm = () => {
    setImageFile(null);
    setFormValues(DEFAULT_VALUES);
  };

  const handleSelectChange = (field: keyof ProblemFormValues) => (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleMultiSelectChange = (values: string[]) => {
    setFormValues((prev) => ({
      ...prev,
      categories: values,
    }));
  };

  const isFormValid = () => {
    return (
      formValues.categories.length > 0 &&
      formValues.difficulty.trim() !== '' &&
      formValues.title.trim() !== '' &&
      formValues.description.trim() !== '' &&
      formValues.memoryLimit.trim() !== '' &&
      formValues.timeLimit.trim() !== '' &&
      formValues.reference.trim() !== ''
    );
  };

  const handleRegisterProblem = async () => {
    if (!isFormValid()) {
      return;
    }
    try {
      const formattedCategories: Record<string, string> = {};
      formValues.categories.forEach((categoryValue) => {
        const categoryOption = CATEGORY_OPTIONS.find((opt) => opt.value === categoryValue);
        if (categoryOption && typeof categoryOption.value === 'string') {
          formattedCategories[categoryValue] = String(categoryOption.label);
        }
      });

      if (Object.keys(formattedCategories).length === 0) return;

      const res = await mutateAsync({
        request: {
          ...formValues,
          categories: formattedCategories,
          memoryLimit: Number(formValues.memoryLimit) || 0,
          timeLimit: Number(formValues.timeLimit) || 0,
        },
        image: imageFile,
      });
      if (!res.data.success) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['adminProblemsList'] });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProblem = async () => {
    if (!isFormValid()) {
      return;
    }
    try {
      const formattedCategories: Record<string, string> = {};
      formValues.categories.forEach((categoryValue) => {
        const categoryOption = CATEGORY_OPTIONS.find((opt) => opt.value === categoryValue);
        if (categoryOption && typeof categoryOption.value === 'string') {
          formattedCategories[categoryValue] = String(categoryOption.label);
        }
      });

      if (Object.keys(formattedCategories).length === 0) return;
      const res = await updateProblem({
        problemId: Number(problemId),
        request: {
          ...formValues,
          categories: formattedCategories,
          memoryLimit: Number(formValues.memoryLimit) || 0,
          timeLimit: Number(formValues.timeLimit) || 0,
        },
        image: imageFile,
      });
      if (!res.data.success) {
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ['adminGetProblemDetail', Number(problemId)],
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (problemDetail?.data && mode === 'update' && isOpen) {
      const data = problemDetail.data;
      const categoryValues = Array.isArray(data.result.categories)
        ? data.result.categories
            .map((label: string) => {
              const categoryOption = CATEGORY_OPTIONS.find((opt) => opt.label === label);
              return categoryOption && typeof categoryOption.value === 'string'
                ? categoryOption.value
                : null;
            })
            .filter((value): value is string => value !== null)
        : [];
      setFormValues({
        categories: categoryValues,
        title: data.result.title || '',
        description: data.result.description || '',
        difficulty: data.result.difficulty || '',
        memoryLimit: String(data.result.memoryLimit) || '',
        timeLimit: String(data.result.timeLimit) || '',
        reference: data.result.reference || '',
      });
    }
  }, [problemDetail, mode, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} modal>
      <DialogContent
        className={cn(
          'max-w-[600px] w-full bg-card border-border p-0 text-white',
          'shadow-2xl rounded-[12px] flex flex-col overflow-hidden'
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
        onAnimationEnd={(e) => {
          if (e.animationName === 'exit') {
            if (!isOpen) {
              resetForm();
            }
          }
        }}
      >
        <DialogHeader className="px-6 pt-6 pb-4 relative shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            <span className="text-accent">{mode === 'register' ? '문제 등록' : '문제 수정'}</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {mode === 'register' ? '문제 정보를 등록하세요.' : '문제 정보를 수정하세요.'}
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
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground" htmlFor="categories">
                    분류 <span className="text-destructive">*</span>
                  </label>
                  <MultiSelect
                    id="categories"
                    className="w-full"
                    title="선택"
                    initialValue="선택"
                    placeholder="분류를 선택해주세요"
                    option={CATEGORY_OPTIONS}
                    setValue={handleMultiSelectChange}
                    value={formValues.categories}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground" htmlFor="difficulty">
                    난이도 <span className="text-destructive">*</span>
                  </label>
                  <Select
                    id="difficulty"
                    className="w-full"
                    title="선택"
                    initialValue="선택"
                    option={DIFFICULTY_OPTIONS}
                    setValue={(value: string) => handleSelectChange('difficulty')(value)}
                    value={formValues.difficulty}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground" htmlFor="title">
                    제목 <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    value={formValues.title}
                    onChange={handleInputChange('title')}
                    placeholder="제목을 입력해주세요"
                    className="w-full border-border bg-gray-800/50 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground" htmlFor="reference">
                    출처 <span className="text-destructive">*</span>
                  </label>
                  <Select
                    id="reference"
                    className="w-full"
                    title="선택"
                    initialValue="선택"
                    option={REFERENCE_OPTIONS}
                    setValue={(value: string) => handleSelectChange('reference')(value)}
                    value={formValues.reference}
                  />
                </div>
              </>
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground" htmlFor="image">
                  문제 이미지
                </label>
                <div className="relative">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="image"
                    className="flex items-center gap-3 w-full min-h-[40px] rounded-md border border-border bg-background px-3 py-2 text-sm text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {imageFile ? (
                        <>
                          <ImageIcon className="h-4 w-4 text-accent" />
                          <span className="text-sm text-card-foreground truncate">
                            {imageFile.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            이미지 파일을 선택해주세요
                          </span>
                        </>
                      )}
                    </div>
                  </label>
                  {imageFile && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors"
                      aria-label="이미지 삭제"
                    >
                      <XIcon className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground" htmlFor="description">
                  설명 <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange('description')}
                  className="w-full min-h-[120px] rounded-md border border-border bg-background px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  placeholder="설명을 입력해주세요"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground" htmlFor="memoryLimit">
                  메모리 제한 (KB) <span className="text-destructive">*</span>
                </label>
                <Input
                  id="memoryLimit"
                  type="text"
                  inputMode="numeric"
                  value={formValues.memoryLimit}
                  onChange={handleInputChange('memoryLimit')}
                  placeholder="메모리 제한을 입력해주세요"
                  className="w-full border-border bg-gray-800/50 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground" htmlFor="timeLimit">
                  시간 제한 (ms) <span className="text-destructive">*</span>
                </label>
                <Input
                  id="timeLimit"
                  type="text"
                  inputMode="numeric"
                  value={formValues.timeLimit}
                  onChange={handleInputChange('timeLimit')}
                  placeholder="시간 제한을 입력해주세요"
                  className="w-full border-border bg-gray-800/50 text-card-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                />
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <Button
              className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={mode === 'register' ? handleRegisterProblem : handleUpdateProblem}
              disabled={!isFormValid()}
            >
              {mode === 'register' ? '등록' : '수정'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProblemModal;
