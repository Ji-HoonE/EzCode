'use client';
import { AUTH_ZOD_SCHEMA } from '@/entities/auth/model/authZodSchemas';
import UnifiedInput from '@/shared/ui/unifiedInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Test() {
  const {
    register,
    setValue,
    // handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AUTH_ZOD_SCHEMA),
    mode: 'all',
  });
  return (
    <form onSubmit={() => console.log('handleSubmit')}>
      <UnifiedInput
        name="email"
        inputType="input"
        errorMessage={errors.email?.message}
        register={register}
        setValue={setValue}
      />
      <button type="submit">버튼</button>
    </form>
  );
}
