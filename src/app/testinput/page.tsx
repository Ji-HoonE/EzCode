'use client';
import { FormProvider } from 'react-hook-form';
import { useZodForm } from '@/lib/zod/useZodForm';
import { TEST_SCHEMA } from '@/entities/auth/model/authZodSchemas';
import UnifiedInput from '@/shared/ui/InputFiled';

export default function Test() {
  const methods = useZodForm(TEST_SCHEMA, ['email']);

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('🚀 성공!', data);
  });

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <UnifiedInput inputType="input" name="email" label="이메일" />
        <button type="button" onClick={handleSubmit}>
          제출
        </button>
      </div>
    </FormProvider>
  );
}
