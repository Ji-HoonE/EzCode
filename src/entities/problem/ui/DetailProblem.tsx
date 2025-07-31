'use client';

import { IDetailProblemResponse } from '../api/server/getDetailProblem.type';

interface IDetailProblemProps {
  detailProblem: IDetailProblemResponse;
}

export default function DetailProblem({ detailProblem }: IDetailProblemProps) {
  const { title, difficulty, categories, description } = detailProblem;

  return (
    <article className="flex flex-col gap-[29px] max-w-6xl bg-secondary-background rounded-[10px] p-6">
      <div className="flex items-center gap-[14px]">
        <h1 className="text-2xl font-bold ">{title}</h1>
        난이도 <span className="text-[#FFCFA7]">{difficulty}</span>
        {categories && categories.length > 0 && (
          <>
            {'> '}
            {categories[0]}
          </>
        )}
      </div>
      <div className="flex flex-col space-y-6">
        <h3 className="text-lg font-semibold mb-3 text-secondary">문제 설명</h3>
        <p className="text-[#ccc] leading-relaxed whitespace-pre-line">{description}</p>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-3 text-secondary">제약 조건</h3>
          <p>
            옵셔널한 값임.. 근데 제한사항이 어떤 이름으로 응답이 오는지는 알려주셔야 저희가 가릴수
            있습니다 ㅠ
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-3 text-secondary">예제</h3>

          <p>옵셔널한 값임..</p>
        </div>
      </div>
    </article>
  );
}
