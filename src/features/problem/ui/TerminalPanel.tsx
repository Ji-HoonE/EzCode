'use client';
import Image from 'next/image';
import { submitSourceCodeData } from '../lib/submitSourceCodeData';
import { useState } from 'react';
import useConnectProblemWebSocket from '../hooks/useConnectProblemWebSocket';
import { IProblemRequestData } from '../types/problem.request.data.type';

interface TerminalPanelProps {
  problemId: string;
  sourceCodeData: IProblemRequestData;
}

export default function TerminalPanel({ problemId, sourceCodeData }: TerminalPanelProps) {
  const [sessionKey, setSessionKey] = useState('');
  const handleSubmitSourceCodeData = async () => {
    try {
      const sessionKey = await submitSourceCodeData(problemId, sourceCodeData);
      setSessionKey(sessionKey);
    } catch (error) {
      console.error('제출 실패:', error);
    }
  };
  useConnectProblemWebSocket(sessionKey);

  return (
    <div className="flex flex-col w-[68px] px-[10px] pt-[19px]">
      <div className="flex flex-col gap-6 items-center w-full">
        <div className="flex flex-col gap-[3px] items-center" onClick={handleSubmitSourceCodeData}>
          <Image
            src="/icons/terminal-icons/terminal-run-icon.svg"
            alt="run"
            height={34}
            width={30}
          />
          <h3 className="text-[10px]">RUN</h3>
        </div>
        <div className="flex flex-col gap-2 items-center w-[30px]">
          <Image
            src="/icons/terminal-icons/terminal-result-icon.svg"
            alt="run"
            height={14}
            width={23}
          />
          <h3 className="text-[10px]">RESULT</h3>
        </div>
        <div className="flex flex-col gap-[3px] items-center">
          <Image
            src="/icons/terminal-icons/terminal-review-icon.svg"
            alt="run"
            height={34}
            width={30}
          />
          <h3 className="text-[10px]">REVIEW</h3>
        </div>
      </div>
    </div>
  );
}
