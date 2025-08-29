export interface IReportMutationRequest {
  targetId: number;
  targetType: string;
  reportType: string;
  message: string;
  imageUrl: string | null;
}
