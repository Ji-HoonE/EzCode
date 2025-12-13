import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';
import { FileText, XIcon, Upload, Image as ImageIcon } from 'lucide-react';
import { useAdminUpdateProblemImageMutation } from '@/entities/admin/mutation/admin.mutation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProblemImageModal {
  isOpen: boolean;
  problemId: string;
  onClose: () => void;
}

const ProblemImageModal = (props: IProblemImageModal) => {
  const { isOpen, onClose, problemId } = props;
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);

  /** 문제 이미지 수정 뮤테이션 */
  const { mutateAsync: updateProblemImage } = useAdminUpdateProblemImageMutation();

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

  const handleUpdateProblemImage = async () => {
    try {
      if (!problemId) {
        return;
      }
      const response = await updateProblemImage({
        problemId: Number(problemId),
        image: imageFile,
      });
      if (!response.data.success) return;
      toast.success('이미지가 수정되었습니다.', {
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
      >
        <DialogHeader className="px-6 pt-6 pb-4 relative shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            <span className="text-accent">이미지 수정</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            새로운 이미지를 등록하세요.
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
                <label className="text-sm font-medium text-card-foreground" htmlFor="image">
                  문제 이미지 <span className="text-destructive">*</span>
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
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <Button
              className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUpdateProblemImage}
              disabled={!imageFile}
            >
              수정
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProblemImageModal;
