import { Input } from '@/components/ui/input';

export default function LoginForm() {
  return (
    <form>
      <Input type="text" placeholder="아이디" />
      <Input type="password" placeholder="비번" />
    </form>
  );
}
