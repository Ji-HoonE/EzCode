import TabsToggle from '@/features/discussions/disussions/ui/TabsToggle';

export default async function ProblemPageLayout({
  children,
  tabs,
}: Readonly<{
  children: React.ReactNode;
  tabs: React.ReactNode;
}>) {
  return (
    <main className="flex py-10 h-full gap-5 ">
      <menu className="flex-1 flex flex-col gap-[29px]">
        <TabsToggle />
        {tabs}
      </menu>
      <div className="w-px h-full border border-gray-800" />
      <div className="flex-1 w-full h-full">{children}</div>
    </main>
  );
}
