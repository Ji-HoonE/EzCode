export default function NoRanking() {
  return (
    <li className="flex items-center  p-4  transition-colors duration-200 space-x-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
        !
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-white text-center w-full">아직 랭킹이 없습니다.</span>
      </div>
    </li>
  );
}
