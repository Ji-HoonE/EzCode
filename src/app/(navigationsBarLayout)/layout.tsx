import NavigationBar from '@/widgets/navigation-bar';
/**
 *
 * @todo
 * 헤더 height를 110으로 설정, 추후에 수정 예정
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      <div className="mt-27">{children}</div>
    </>
  );
}
