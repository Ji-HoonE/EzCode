import TabsToggle from '@/features/discussions/disussions/ui/TabsToggle';

export default async function ProblemPageLayout({
  children,
  tabs,
  params,
}: Readonly<{
  children: React.ReactNode;
  tabs: React.ReactNode;
  params: Promise<{ problemId: string }>;
}>) {
  const problemId = (await params).problemId;

  return (
    <main className="flex py-10 h-full gap-5 ">
      <menu className="flex-1 flex flex-col gap-[29px]">
        <TabsToggle problemId={problemId} />
        {tabs}
      </menu>
      <div className="w-[1px] h-full bg-border_primary" />
      <div className="flex-1 w-full h-full">{children}</div>
    </main>
  );
}
