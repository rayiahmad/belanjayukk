"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";

const SearchAdmin = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((value: string) => {
    console.log(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex items-center justify-center w-48 mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="w-full border border-gray-400 py-2 pl-10 pr-4 text-sm outline-none rounded-full focus:border-blue-400 transition-all duration-300"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString()}
      />
      <IoSearch className="absolute left-3 h-5 w-5 text-gray-500" />
    </div>
  );
};

export default SearchAdmin;
