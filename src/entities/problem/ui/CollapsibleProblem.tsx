'use client';
import { useState } from 'react';
import { IDetailProblemResponse } from '../api/server/getDetailProblem.type';
import DetailProblem from './DetailProblem';
import Arrow from '@/shared/ui/icons/arrow-icon';

interface ProblemData {
  detailProblem: IDetailProblemResponse;
}

export default function CollapsibleProblem({ detailProblem }: ProblemData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full">
        <div className="bg-[#1a2332] rounded-[10px] p-4 cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">{detailProblem.title}</h2>
              <span className="px-2 py-1 bg-secondary text-[#0c151c] rounded-[10px] text-xs font-medium">
                {detailProblem.difficulty}
              </span>
            </div>
            <Arrow direction={isOpen ? 'up' : 'down'} className="text-white" />
          </div>
        </div>
      </button>
      {isOpen && <DetailProblem detailProblem={detailProblem} />}
    </div>
  );
}
