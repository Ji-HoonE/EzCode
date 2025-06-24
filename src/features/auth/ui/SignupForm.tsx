import { Input } from '@/components/ui/input';

export default function SignupForm() {
  return (
    <form>
      <Input type="text" placeholder="이름" />
      <Input type="text" placeholder="아이디" />
      <Input type="password" placeholder="비번" />
      <Input type="password" placeholder="비번확인" />
    </form>
  );
}
