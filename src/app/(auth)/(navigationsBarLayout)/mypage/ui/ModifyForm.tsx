import { useUploadImage } from '@/entities/mypage/model/query';
import { IMyInfo } from '@/entities/mypage/model/types';
import { Badge } from '@/shared/ui/badge/Badge';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export const ModifyForm = ({
  myInfo,
  editForm,
  setEditForm,
}: {
  myInfo: IMyInfo;
  editForm: IMyInfo;
  setEditForm: Dispatch<SetStateAction<IMyInfo>>;
}) => {
  const { mutateAsync: uploadImg } = useUploadImage();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 타입 지정
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const file = event.target.files[0];

    try {
      const result = await uploadImg(file); // 서버에 업로드

      if (result.status === 200) {
        setEditForm((prev) => ({
          ...prev,
          profileImageUrl: result.result.message,
        }));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };
  useEffect(() => {
    if (!myInfo) return;
    setEditForm(myInfo);
  }, [myInfo]);

  return (
    <div className="flex gap-8">
      <div className="w-96 flex-shrink-0">
        <div className="bg-gray-800/30 p-6 rounded-lg">
          <div className="flex flex-col items-center space-y-3">
            <Image
              alt="my"
              width={150}
              height={150}
              src={
                editForm.profileImageUrl ? editForm.profileImageUrl : '/icons/mypage/defaultImg.svg'
              }
              onClick={() => {
                handleImageClick();
              }}
              className="cursor-pointer"
            />

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <h4 className="text-lg font-bold text-white text-center"></h4>
            <div className=" text-white text-2xl  text-center">{myInfo.nickname}</div>
            <Badge className="text-white font-medium text-xs bg-[#214d35]" text={myInfo.tier} />
          </div>
        </div>
      </div>

      {/* 오른쪽: 정보 수정 */}
      <div className="flex-1">
        <h3 className="text-white font-medium mb-4">정보 수정</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 닉네임 */}
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-2">
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={editForm.nickname}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
              placeholder="닉네임을 입력하세요"
            />
          </div>

          {/* GitHub 주소 */}
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300 mb-2">
              GitHub 주소
            </label>
            <input
              id="githubUrl"
              type="url"
              value={editForm.githubUrl || ''}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  githubUrl: e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
              placeholder="깃허브 url을 입력해주세요."
            />
          </div>

          {/* 블로그 주소 */}
          <div>
            <label htmlFor="blogUrl" className="block text-sm font-medium text-gray-300 mb-2">
              블로그 주소
            </label>
            <input
              id="blogUrl"
              type="url"
              value={editForm.blogUrl || ''}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  blogUrl: e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
              placeholder="블로그 url을 입력해주세요."
            />
          </div>
          {/* 자기소개 */}
          <div className="md:col-span-2">
            <label htmlFor="introduction" className="block text-sm font-medium text-gray-300 mb-2">
              자기소개
            </label>
            <textarea
              id="introduction"
              value={editForm.introduction || ''}
              onChange={(e) => setEditForm((prev) => ({ ...prev, introduction: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
              placeholder="자기소개를 입력하세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
