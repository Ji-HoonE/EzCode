import TabsToggle from '@/features/problem/ui/TabsToggle';

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
    <main className="flex pt-20 h-full">
      <section className="flex-1 flex flex-col gap-[29px] pl-[81px] pr-[78px] overflow-scroll">
        <TabsToggle problemId={problemId} />
        {tabs}
      </section>
      <div className="h-full w-[1px] bg-white" />
      <div className="flex-1 w-full h-full">{children}</div>
    </main>
  );
}
