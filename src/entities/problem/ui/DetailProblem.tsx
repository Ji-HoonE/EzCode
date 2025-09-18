'use client';

import { IDetailProblemResponse } from '../api/server/getDetailProblem.type';
import Arrow from '@/shared/ui/icons/arrow-icon';
import Image from 'next/image';
import MarkdownRenderer from '@/shared/mdx/MdxRenderer';

interface IDetailProblemProps {
  detailProblem: IDetailProblemResponse;
}

export default function DetailProblem({ detailProblem }: IDetailProblemProps) {
  const {
    title,
    difficulty,
    categories,
    description,
    score,
    creator,
    reference,
    timeLimit,
    memoryLimit,
    imageUrl,
    testcases,
  } = detailProblem;

  return (
    <article className="flex flex-col gap-[29px] max-w-6xl bg-secondary-background rounded-[10px] h-fit p-6">
      <div className="flex items-center gap-4 justify-between">
        <h1 className="text-2xl font-bold ">{title}</h1>
        <div className="flex gap-4 items-center">
          <span className="text-gray-400">배점 : {score}점</span>
          <div className="flex gap-2 items-center">
            <span className="text-[#FFCFA7]">{difficulty}</span>
            {categories && categories.length > 0 && (
              <>
                <Arrow direction="right" className="text-white" />
                <ul className="flex gap-1">
                  {categories.map((category, idx) => (
                    <li key={category}>
                      {category} {idx !== categories.length - 1 && ','}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <hr className="w-full h-[1px] bg-background" />
      <MarkdownRenderer source={description} />
      {testcases && testcases.length > 0 && (
        <div>
          <h4 className="text-secondary mt-1">
            <strong>입출력 예시</strong>
          </h4>
          {testcases.map((testCase, idx) => (
            <div key={testCase.id} className="gap-2 p-1 bg-[#1a2332] rounded-lg w-full">
              <p>예시 ({idx + 1})</p>
              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <span>입력</span>
                  <div className="bg-background p-2 rounded-md flex-1 whitespace-pre-wrap break-all">
                    {testCase.input}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <span>출력</span>
                  <div className="bg-background p-2 rounded-md flex-1 whitespace-pre-wrap break-all">
                    {testCase.output}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {imageUrl && (
        <div className="w-full h-60 relative">
          <Image src={imageUrl} alt="문제예시이미지" fill className="object-contain" />
        </div>
      )}
      <hr className="w-full h-[1px] bg-background" />
      <div className="flex flex-col gap-4 ">
        <h2 className="text-lg font-semibold mt-3 text-secondary">제한 조건</h2>
        <span>제한시간 : {timeLimit}ms</span>
        <span>메모리 : {memoryLimit}KB</span>
      </div>
      <hr className="w-full h-[1px] bg-background" />

      <div className="flex flex-col gap-4  text-xs text-gray-400">
        <span>출제 : {creator}</span>
        <span>출처 : {reference}</span>
      </div>
    </article>
  );
}
