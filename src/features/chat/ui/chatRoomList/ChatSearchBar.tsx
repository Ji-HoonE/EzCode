import { Search } from 'lucide-react';

interface ChatSearchBarProps {
  onSearch: (value: string) => void;
  searchQuery: string;
}
export default function ChatSearchBar({ onSearch, searchQuery }: ChatSearchBarProps) {
  return (
    <div className="border-b border-[#214d35]/20">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#888]" />
        <input
          type="text"
          placeholder="채팅방 검색..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-[#1a2332] border border-primary/30 rounded-[10px] pl-10 pr-4 py-2.5 text-white placeholder-[#888] focus:outline-none focus:border-[#00d084] transition-colors"
        />
      </div>
    </div>
  );
}
