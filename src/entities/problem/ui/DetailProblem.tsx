'use client';

import FormatMarkdown from '@/shared/ui/FormatMarkdown';
import { IDetailProblemResponse } from '../api/server/getDetailProblem.type';
import Arrow from '@/shared/ui/icons/arrow-icon';

interface IDetailProblemProps {
  detailProblem: IDetailProblemResponse;
}

export default function DetailProblem({ detailProblem }: IDetailProblemProps) {
  const { title, difficulty, categories, description } = detailProblem;
  console.log('detailProblem', detailProblem);

  return (
    <article className="flex flex-col gap-[29px] max-w-6xl bg-secondary-background rounded-[10px] h-full p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold ">{title}</h1>
        난이도 <span className="text-[#FFCFA7]">{difficulty}</span>
        {categories && categories.length > 0 && (
          <div className="flex gap-4">
            <Arrow direction="right" className="text-white" />
            <ul className="flex gap-1">
              {categories.map((category, idx) => (
                <li key={category}>
                  {category} {idx !== categories.length - 1 && ','}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <FormatMarkdown markdown={description} />
      </div>
    </article>
  );
}
