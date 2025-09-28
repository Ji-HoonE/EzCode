import { Button } from '@/components/ui/button';

import GoogleForm from './../../../../public/icons/google-form.png';
import Image from 'next/image';
export const GoogleFormBtn = () => {
  return (
    <>
      <Button
        onClick={() =>
          window.open(
            'https://docs.google.com/forms/d/e/1FAIpQLSfRoquj0yyevkgalFsJwKl4UcvZ3FRhuRyK1j8edJLS7S4aFw/viewform?usp=header'
          )
        }
        className="bg-[#214d35] hover:bg-[#276e48] text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Image src={GoogleForm} alt="google-form" width={24} height={24} />
      </Button>
    </>
  );
};
