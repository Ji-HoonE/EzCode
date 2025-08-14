'use client';

import FormatMarkdown from '@/shared/ui/FormatMarkdown';
import { IDetailProblemResponse } from '../api/server/getDetailProblem.type';

interface IDetailProblemProps {
  detailProblem: IDetailProblemResponse;
}

export default function DetailProblem({ detailProblem }: IDetailProblemProps) {
  const { title, difficulty, categories, description } = detailProblem;

  return (
    <article className="flex flex-col gap-[29px] max-w-6xl bg-secondary-background rounded-[10px] h-full p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold ">{title}</h1>
        난이도 <span className="text-[#FFCFA7]">{difficulty}</span>
        {categories && categories.length > 0 && (
          <div className="flex gap-4">
            <p>{'>'}</p>
            {categories[0]}
          </div>
        )}
      </div>
      <div>
        <FormatMarkdown markdown={description} />
      </div>
    </article>
  );
}
