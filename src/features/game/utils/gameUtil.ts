export type ItemGrade = 'LEGENDARY' | 'UNIQUE' | 'RARE' | 'UNCOMMON' | 'COMMON' | 'TRASH';

export const getGradeColor = (grade: string): string => {
  switch (grade?.toUpperCase()) {
    case 'LEGENDARY':
      return 'text-yellow-400';
    case 'UNIQUE':
      return 'text-orange-400';
    case 'RARE':
      return 'text-purple-400';
    case 'UNCOMMON':
      return 'text-blue-400';
    case 'COMMON':
      return 'text-green-400';
    case 'TRASH':
      return 'text-gray-400';
    default:
      return 'text-gray-400';
  }
};

export const getGradeBgColor = (grade: string): string => {
  switch (grade?.toUpperCase()) {
    case 'LEGENDARY':
      return 'bg-yellow-400/20 border-yellow-400/30';
    case 'UNIQUE':
      return 'bg-orange-400/20 border-orange-400/30';
    case 'RARE':
      return 'bg-purple-400/20 border-purple-400/30';
    case 'UNCOMMON':
      return 'bg-blue-400/20 border-blue-400/30';
    case 'COMMON':
      return 'bg-green-400/20 border-green-400/30';
    case 'TRASH':
      return 'bg-gray-400/20 border-gray-400/30';
    default:
      return 'bg-gray-400/20 border-gray-400/30';
  }
};

export const getGradeBorderColor = (grade: string): string => {
  switch (grade?.toUpperCase()) {
    case 'LEGENDARY':
      return 'border-yellow-400/50';
    case 'UNIQUE':
      return 'border-orange-400/50';
    case 'RARE':
      return 'border-purple-400/50';
    case 'UNCOMMON':
      return 'border-blue-400/50';
    case 'COMMON':
      return 'border-green-400/50';
    case 'TRASH':
      return 'border-gray-400/50';
    default:
      return 'border-gray-400/50';
  }
};

export const getGradeGlowColor = (grade: string): string => {
  switch (grade?.toUpperCase()) {
    case 'LEGENDARY':
      return 'shadow-yellow-400/30';
    case 'UNIQUE':
      return 'shadow-orange-400/30';
    case 'RARE':
      return 'shadow-purple-400/30';
    case 'UNCOMMON':
      return 'shadow-blue-400/30';
    case 'COMMON':
      return 'shadow-green-400/30';
    case 'TRASH':
      return 'shadow-gray-400/30';
    default:
      return 'shadow-gray-400/30';
  }
};

export const getGradeStarCount = (grade: string): number => {
  switch (grade?.toUpperCase()) {
    case 'LEGENDARY':
      return 5;
    case 'UNIQUE':
      return 4;
    case 'RARE':
      return 3;
    case 'UNCOMMON':
      return 2;
    case 'COMMON':
      return 1;
    case 'TRASH':
      return 0;
    default:
      return 0;
  }
};

export const getGradeDisplayName = (grade: string): string => {
  switch (grade?.toUpperCase()) {
    case 'LEGENDARY':
      return '레전더리';
    case 'UNIQUE':
      return '유니크';
    case 'RARE':
      return '희귀';
    case 'UNCOMMON':
      return '언커먼';
    case 'COMMON':
      return '커먼';
    case 'TRASH':
      return '쓰레기';
    default:
      return grade || 'UNKNOWN';
  }
};

export const getGradeHoverBgColor = (grade: string): string => {
  switch (grade?.toUpperCase()) {
    case 'LEGENDARY':
      return 'hover:bg-yellow-400/10';
    case 'UNIQUE':
      return 'hover:bg-orange-400/10';
    case 'RARE':
      return 'hover:bg-purple-400/10';
    case 'UNCOMMON':
      return 'hover:bg-blue-400/10';
    case 'COMMON':
      return 'hover:bg-green-400/10';
    case 'TRASH':
      return 'hover:bg-gray-400/10';
    default:
      return 'hover:bg-gray-400/10';
  }
};

export const getGradeHoverOverlayColor = (grade: string): string => {
  switch (grade?.toUpperCase()) {
    case 'LEGENDARY':
      return 'bg-yellow-400/20';
    case 'UNIQUE':
      return 'bg-orange-400/20';
    case 'RARE':
      return 'bg-purple-400/20';
    case 'UNCOMMON':
      return 'bg-blue-400/20';
    case 'COMMON':
      return 'bg-green-400/20';
    case 'TRASH':
      return 'bg-gray-400/20';
    default:
      return 'bg-gray-400/20';
  }
};
