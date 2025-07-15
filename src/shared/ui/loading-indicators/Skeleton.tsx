export const SkeletonBox = ({ width = 80, height = 16 }: { width?: number; height?: number }) => (
  <div
    className="animate-pulse bg-[#c4c0c0]/60 rounded mx-auto"
    style={{ width: `${width}px`, height: `${height}px` }}
  />
);

export const SkeletonCircle = ({ width, height }: { width?: number; height?: number }) => (
  <div
    className="animate-pulse rounded-[999px] bg-[#c4c0c0]"
    style={{ width: width ? width + 'px' : '100%', height }}
  />
);
