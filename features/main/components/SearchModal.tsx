"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useUISearchStore } from "@/stores/useUIStore";
import { useState, useEffect } from "react";
import { SearchPostList } from "./SearchPostList";

export function SearchModal() {
  const isSearchState = useUISearchStore((state) => state.isSearchState);
  const handleSearchState = useUISearchStore(
    (state) => state.handleSearchState
  );

  const [keyWord, setKeyword] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const handleKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const resetSearch = () => {
    handleSearchState();
    setKeyword("");
    setDebouncedValue("");
  };

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      setDebouncedValue(keyWord);
    }, 200);
    return () => clearTimeout(searchDebounce);
  }, [keyWord]);

  if (!isSearchState) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white backdrop-blur-sm overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* 1. 닫기 버튼 */}
        <div className="flex justify-end mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer p-6"
            onClick={() => resetSearch()}
          >
            {/* <FiX className="text-3xl" /> */}
            <XIcon className="size-10" />
          </Button>
        </div>

        {/* 2. 검색어 입력 */}
        <div className="relative border-b-4 border-black pb-2 mb-12">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full text-4xl font-bold placeholder-gray-300 outline-none bg-transparent"
            autoFocus
            value={keyWord}
            onChange={handleKeyWordChange}
          />
        </div>

        <div className="space-y-2">
          <SearchPostList keyWord={debouncedValue} />
        </div>
      </div>
    </div>
  );
}
