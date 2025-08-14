'use client';
import { FormProvider } from 'react-hook-form';
import { useZodForm } from '@/shared/lib/zod/useZodForm';
import { TEST_SCHEMA } from '@/entities/auth/model/authZodSchemas';
import UnifiedInput from '@/shared/ui/InputFiled';

export default function Test() {
  const methods = useZodForm(TEST_SCHEMA, ['email', 'password']);

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('🚀 성공!', data);
  });

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <UnifiedInput inputType="input" name="email" label="이메일" />
        <UnifiedInput inputType="input" name="password" label="패스워드" />
        <button type="button" onClick={handleSubmit}>
          제출
        </button>
      </div>
    </FormProvider>
  );
}
