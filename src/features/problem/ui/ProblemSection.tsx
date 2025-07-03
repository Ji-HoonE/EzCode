import { Button } from '@/components/ui/button';
import { IDetailProblemResponse } from '../types/problem.response.data.type';

interface IProblemSectionProps {
  detailProblem: IDetailProblemResponse;
}
export default function ProblemSection({ detailProblem }: IProblemSectionProps) {
  const { title, difficulty, categories, description } = detailProblem;
  return (
    <section className="flex-1 flex flex-col gap-[29px] pl-[81px] pr-[78px] overflow-scroll">
      <div className="flex gap-4">
        <Button>문제</Button>
        <Button>토론</Button>
      </div>
      <h1 className="text-[15px] flex items-center gap-[14px]">
        <span className="text-[40px]">{title}</span>
        난이도 <span className="text-[#FFCFA7]">{difficulty}</span>
        {categories.length > 0 && (
          <>
            {'>'}
            {categories[0]}
          </>
        )}
      </h1>
      <div className="flex flex-col gap-2">
        <p>{description}</p>
        <div className="flex flex-col gap-2">
          <h2 className="text-[20px]">제한 사항</h2>
          <p>
            옵셔널한 값임.. 근데 제한사항이 어떤 이름으로 응답이 오는지는 알려주셔야 저희가 가릴수
            있습니다 ㅠ
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[20px]">예시</h2>
          <p>옵셔널한 값임..</p>
        </div>
      </div>
    </section>
  );
}
