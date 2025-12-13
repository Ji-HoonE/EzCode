'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, TestTube, Code2 } from 'lucide-react';

const adminFeatures = [
  {
    title: '문제 관리',
    description: '코딩 문제를 등록, 수정, 삭제하고 관리할 수 있습니다.',
    icon: FileText,
    features: ['문제 등록 및 수정', '문제 이미지 관리', '카테고리 관리'],
  },
  {
    title: '테스트 케이스',
    description: '문제에 대한 테스트 케이스를 추가하고 관리할 수 있습니다.',
    icon: TestTube,
    features: ['테스트 케이스 등록', '입출력 데이터 관리', '테스트 케이스 수정 및 삭제'],
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 pb-8">
        <div className="flex items-center justify-center gap-3">
          <Code2 className="h-10 w-10 text-accent" />
          <h1 className="text-4xl font-bold text-foreground">관리자 페이지</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          코딩테스트 커뮤니티를 관리하고 문제를 등록할 수 있는 관리자 전용 페이지입니다.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="bg-card border-border ">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-card-foreground text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {feature.features.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">관리자 페이지 안내</CardTitle>
          <CardDescription>관리자 페이지 사용 시 주의사항</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• 관리자 권한이 있는 사용자만 접근할 수 있는 페이지입니다.</p>
            <p>• 문제를 등록하거나 수정할 때는 정확한 정보를 입력해주세요.</p>
            <p>• 테스트 케이스는 문제의 정확한 평가를 위해 신중하게 작성해주세요.</p>
            <p>• 모든 변경사항은 즉시 반영되므로 주의가 필요합니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
