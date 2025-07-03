'use client';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LANGUAGE_SELECTOR_OPTIONS } from '@/shared/lib/codemirror/codeMirror.Docs';
import { ILanguageSelectOption } from '@/shared/types/problem.type';

interface ILanguageSelector {
  currentLanguage: string;
  onSelect: (option: ILanguageSelectOption) => void;
}

export default function LanguageSelector({ currentLanguage, onSelect }: ILanguageSelector) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={currentLanguage}></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {LANGUAGE_SELECTOR_OPTIONS.map((option) => (
            <SelectItem key={option.id} value={option.value} onClick={() => onSelect(option)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
