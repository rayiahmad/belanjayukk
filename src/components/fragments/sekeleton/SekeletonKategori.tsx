const SkeletonItem = () => (
    <div className="border p-4 rounded-lg shadow-md">
      <div className="w-full bg-slate-200 h-[100px] object-cover mb-2"></div>
      <div className="flex flex-col">
        <div className="text-gray-600 mt-3 w-28 h-5 bg-slate-300"></div>
        <div className="text-gray-600 mt-3 w-20 h-5 bg-slate-300"></div>
      </div>
    </div>
  );
  
  const SkeletonKategori = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonItem key={idx} />
        ))}
      </div>
    );
  };
  
  export default SkeletonKategori;
  