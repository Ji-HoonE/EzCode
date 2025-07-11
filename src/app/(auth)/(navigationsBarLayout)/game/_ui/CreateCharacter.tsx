'use client';

import { API_CONSTANTS } from '@/api/constants/api.constants';
import { useCreateCharacterMutation } from '@/query/game/game';
import { useRouter } from 'next/navigation';

const CreateCharacter = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateCharacterMutation();

  const handleCreateCharacter = async () => {
    try {
      const response = await mutateAsync();
      if (response.data.status === API_CONSTANTS.CODE.CREATED) {
        router.push('/game');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={handleCreateCharacter}>생성</button>
    </div>
  );
};

export default CreateCharacter;
