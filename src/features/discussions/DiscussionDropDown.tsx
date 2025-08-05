'use client';
import KebabIcons from '@/shared/ui/icons/kebab-icons';
import { useState } from 'react';

interface IDiscussionDropDownProps {
  isAuthor: boolean;
  onEdit: (status: boolean) => void;
  onDelete: () => void;
}
export default function DiscussionDropDown({ ...props }: IDiscussionDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthor, onEdit, onDelete } = props;

  return (
    <div className="relative">
      <KebabIcons className="text-white" onClick={() => setIsOpen((prev) => !prev)} />
      {isOpen && (
        <ul className="flex flex-col gap-2 px-2 py-1 absolute bg-background rounded-xl whitespace-nowrap text-center border w-30 border-primary top-8 ">
          {isAuthor ? (
            <>
              <li
                className=" py-2 px-3 hover:bg-primary/70 rounded-xl"
                onClick={() => onEdit(true)}
              >
                수정
              </li>
              <li className="py-2 px-3 hover:bg-primary/70 rounded-xl" onClick={onDelete}>
                삭제
              </li>
            </>
          ) : (
            <li className="py-2 px-3 hover:bg-primary/70 rounded-xl">신고하기</li>
          )}
        </ul>
      )}
    </div>
  );
}
