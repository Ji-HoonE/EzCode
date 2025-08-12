'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TZodKey } from './types';
import { ZOD_DEFAULT_VALUES } from './defaultValues';
import z from 'zod';

/**@description schemaName- 작성한 z.object 스카마의 이름 */
/**@description name- 작성한 TZodKey의 배열 */

export const useZodForm = (schemaName: z.ZodObject, names: TZodKey[]) => {
  const dynamicDefaultValue: Record<string, string | number> = {};

  for (let el of names) {
    if (names.length < 1) throw new Error('useZodForm의 names를 넘겨주세요');
    dynamicDefaultValue[el] = ZOD_DEFAULT_VALUES[el];
  }

  const methods = useForm({
    resolver: zodResolver(schemaName),
    defaultValues: {
      ...dynamicDefaultValue,
    },
  });
  return methods;
};
