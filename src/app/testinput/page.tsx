'use client';
import { FormProvider } from 'react-hook-form';
import { useZodForm } from '@/shared/lib/zod/useZodForm';
import { TEST_SCHEMA } from '@/entities/auth/model/authZodSchemas';
import UnifiedInput from '@/shared/ui/InputFiled';
import { useState } from 'react';
import { TImageVariant } from '@/shared/ui/InputFiled/imageTypeFiled';

export default function Test() {
  const [image, setImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const methods = useZodForm(TEST_SCHEMA, ['email', 'password']);

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('🚀 성공!', data);
  });

  const imageProps = {
    previewImage: image,
    selectImage: (value: string) => setImage(value),
    variant: 'square' as TImageVariant,
    description: '이미지를 업로드하세요',
  };

  const profileImageProps = {
    previewImage: profile,
    selectImage: (value: string) => setProfile(value),
    variant: 'profile-circle' as TImageVariant,
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <UnifiedInput inputType="input" name="email" label="이메일" />
        <UnifiedInput inputType="input" name="password" label="패스워드" />
        <button type="button" onClick={handleSubmit}>
          제출
        </button>

        <UnifiedInput inputType="image" name="image" imageProps={imageProps} />
        <UnifiedInput inputType="image" name="profile" imageProps={profileImageProps} />
      </div>
    </FormProvider>
  );
}
