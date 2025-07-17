import { useState } from 'react';
import { SolvedModal } from '../ui/SolvedModal';
import { useSubmissionList } from '@/entities/mypage/model/query';

export const Solved = () => {
  const { data } = useSubmissionList();
  const [onModal, setOnModal] = useState(false);
  const [selected, setSelected] = useState(0);
  return (
    <div className="w-full flex flex-col">
      {data && onModal && (
        <SolvedModal
          open={onModal}
          data={data?.result[selected]}
          onClose={() => {
            setOnModal(false);
          }}
        />
      )}
      <table>
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-2 text-center">문제 번호</th>
            <th className="py-3 px-2 text-center">문제 이름</th>
            <th className="py-3 px-2 text-center">정답 제출 수 </th>
            <th className="py-3 px-2 text-center">총 제출 수 </th>
          </tr>
        </thead>
        {(data?.result.length || 0) > 0 && (
          <tbody>
            {data?.result.map((item, index) => {
              return (
                <tr
                  onClick={() => {
                    // open('solved', data.result[index]);
                    setSelected(index);
                    setOnModal(true);
                  }}
                  key={item.problemId}
                  className="border-b border-gray-800 hover:bg-gray-900 cursor-pointer"
                >
                  <td className="text-center py-3 px-2">{item.problemId}</td>
                  <td className="text-center py-3 px-2">{item.problemTitle}</td>
                  <td className="text-center py-3 px-2">
                    {item.submissions.filter((submission) => submission.isCorrect).length}
                  </td>
                  <td className="text-center py-3 px-2">{item.submissions.length}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};
