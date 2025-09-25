/** 유틸 함수 */
export class LevelUtil {
  static getLevelColorClass(levelStr: string): string {
    if (!levelStr) return '';
    const level = parseInt(levelStr.replace(/[^0-9]/g, ''), 10);
    if (level <= 2) return 'text-blue-400 font-medium';
    if (level <= 4) return 'text-yellow-400 font-medium';
    if (level <= 6) return 'text-orange-400 font-medium';
    return 'text-red-400 font-medium';
  }
  static getLevelBg(difficulty: string): string {
    const level = parseInt(difficulty.replace(/[^0-9]/g, ''), 10);
    if (level <= 2) return 'bg-blue-500/20 border-blue-500/30';
    if (level <= 4) return 'bg-yellow-500/20 border-yellow-500/30';
    if (level <= 6) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  }
  static getLevelText(difficulty: string): string {
    const level = parseInt(difficulty.replace(/[^0-9]/g, ''), 10);
    const labels = {
      1: '입문',
      2: '초급',
      3: '중급',
      4: '중상급',
      5: '고급',
      6: '전문가',
      7: '마스터',
    };
    return `${labels[level as keyof typeof labels] || '알 수 없음'} (${level}단계)`;
  }
}
