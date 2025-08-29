import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useCreateReportMutation } from '@/features/discussions/mutation/report.mutation';
import { useState } from 'react';
import UnifiedInput from '../../InputFiled';
import { Select } from '../../select/Select';
import { TImageVariant } from '../../InputFiled/imageTypeFiled';
import { IReportRequestData, reportTypesSelectOptions } from '@/features/report/report.types';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  targetId: number;
  targetType: IReportRequestData['targetType'];
}

export default function CreateReportModal({
  open,
  onClose,
  targetId,
  targetType,
}: DeleteConfirmModalProps) {
  const [reportForm, setReportForm] = useState<IReportRequestData>({
    targetId: targetId,
    targetType: targetType,
    reportType: 'SPAM',
    message: '',
    imageUrl: null,
  });

  const { mutateAsync: createReport } = useCreateReportMutation();

  const onCreateReport = () => {
    createReport(reportForm);
    onClose();
  };

  const imageProps = {
    previewImage: reportForm.imageUrl,
    selectImage: (image: string) => setReportForm((state) => ({ ...state, imageUrl: image })),
    variant: 'square' as TImageVariant,
    description: '이미지를 업로드하세요',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-200 max-h-400 overflow-y-scroll flex flex-col items-center">
        <DialogTitle>콘텐츠 신고</DialogTitle>
        <div className="w-full flex flex-col items-start">
          <label className="text-sm font-medium mb-3 block">신고 유형 *</label>
          <Select
            aria-label="report-type"
            title="신고 유형"
            option={reportTypesSelectOptions}
            value={reportForm.reportType}
            setValue={(value) =>
              setReportForm((prev) => ({
                ...prev,
                reportType: value as IReportRequestData['reportType'],
              }))
            }
          />
        </div>
        <div className="w-full flex flex-col items-end gap-2">
          <UnifiedInput
            inputType="textarea"
            required={true}
            label="신고 내용"
            aria-label="reply-content"
            name="reply-content"
            value={reportForm.message}
            onChange={(e) => {
              setReportForm((prev) => ({ ...prev, message: e.target.value }));
            }}
            placeholder="신고 사유를 자세히 설명해주세요. (최소 10자 이상)"
            maxLength={1000}
            className="bg-transparent w-full border-[#2a3441] placeholder:text-[#888] min-h-30 resize-none "
          />

          <p className="text-right text-[#888] text-sm">{reportForm.message.length}/1000</p>
        </div>
        <UnifiedInput inputType="image" name="image" imageProps={imageProps} />

        <div className="bg-[#0c151c] p-4 rounded-[10px] border border-[#2a3441] w-full">
          <p className="text-[#888] text-sm leading-relaxed">
            <strong className="text-secondary">안내:</strong> 허위 신고는 제재 대상이 될 수
            있습니다. 신고 내용은 관리자가 검토한 후 적절한 조치를 취하며,
            <br /> 신고 내역은 마이페이지-신고내역 에서 확인해 보실 수 있습니다.
          </p>
        </div>
        <div className="w-full px-20 flex justify-between gap-2 mt-6">
          <button className="w-full px-4 py-2 rounded bg-gray-400" onClick={onClose}>
            취소
          </button>
          <button className="w-full px-4 py-2 rounded bg-red-600" onClick={onCreateReport}>
            신고하기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
