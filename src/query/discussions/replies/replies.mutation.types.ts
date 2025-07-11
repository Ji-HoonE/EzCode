import { IReply } from './replies.query.types';

/**생성 뮤테이션시 */
export interface ICreateReplyMutationRequest {
  parentReplyId: number | null;
  content: string;
}

/**수정 뮤테이션시 */
export interface IEditReplyMutationRequest {
  content: string;
}

/**생성,수정 mutation 이후 받는 리스폰스  */
export type IReplyMutationResponse = IReply;
