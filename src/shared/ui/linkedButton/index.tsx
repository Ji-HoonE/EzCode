import Image from 'next/image';
import Link from 'next/link';

interface ILinkedButton {
  props: {
    href: string;
    content: string;
    className: string;
    image?: { src: string; alt: string; w: number; h: number };
  };
}
export default function LinkedButton({ props }: ILinkedButton) {
  const { href, content, className, image } = props;

  return (
    <Link href={href} className={className}>
      {image && <Image src={image.src} alt={image.alt} width={image.w} height={image.h} priority />}
      <span>{content}</span>
    </Link>
  );
}
