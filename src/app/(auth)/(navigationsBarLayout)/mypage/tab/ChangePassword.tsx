import { Button } from '@/components/ui/button';
import { useChangePassword } from '@/query/mypage/mypage';
import { useState } from 'react';

export const ChangePassword = () => {
  const [password, setPassword] = useState<{
    password: string;
    newPassword: string;
    passwordCheck: string;
  }>({
    password: '',
    newPassword: '',
    passwordCheck: '',
  });
  const { mutateAsync: changePasswordMutation } = useChangePassword();

  return (
    <div className="w-full bg-[#116524] flex justify-center items-center gap-10  flex-col">
      <h1 className="text-center">비밀번호 변경</h1>
      <hr />
      <div className="flex flex-col">
        <div className="flex flex-row gap-4">
          <span>현재 비밀번호</span>
          <input
            value={password.password}
            type="password"
            className="border-[#FFF] border-[1px]"
            onChange={(e) => {
              setPassword((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </div>
        <div className="flex flex-row gap-4">
          <span>새로운 비밀번호</span>
          <input
            value={password.newPassword}
            type="password"
            className="border-[#FFF] border-[1px]"
            onChange={(e) => {
              setPassword((prev) => ({ ...prev, newPassword: e.target.value }));
            }}
          />
        </div>
        <div className="flex flex-row gap-4">
          <span>비밀번호 확인</span>
          <input
            value={password.passwordCheck}
            type="password"
            className="border-[#FFF] border-[1px]"
            onChange={(e) => {
              setPassword((prev) => ({ ...prev, passwordCheck: e.target.value }));
            }}
          />
        </div>
      </div>
      <Button
        onClick={async () => {
          const response = await changePasswordMutation({
            newPassword: password.newPassword,
            oldPassword: password.password,
          });

          alert(response?.data.message);

          if (response?.data.status === 200) {
            setPassword({
              newPassword: '',
              password: '',
              passwordCheck: '',
            });
          }
        }}
      >
        변경하기
      </Button>
    </div>
  );
};
