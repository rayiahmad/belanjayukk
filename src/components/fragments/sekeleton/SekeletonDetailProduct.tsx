const SekeletonDetailProduct = () => {
  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex-shrink-0 w-full md:w-[400px] h-64 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="flex-grow">
            <div className="w-3/4 h-8 bg-gray-200 animate-pulse mb-4"></div>
            <div className="w-1/2 h-4 bg-gray-200 animate-pulse mb-4"></div>
            <div className="w-1/2 h-8 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
            <div className="flex items-center mb-4">
              <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="mx-4 w-16 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div className="w-1/2 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-8">
          <div className="flex space-x-4 border-b border-gray-200">
            <div className="py-2 px-4 text-lg font-medium w-32 h-6 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="py-2 px-4 text-lg font-medium w-32 h-6 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="mt-4">
            <div className="w-full h-24 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SekeletonDetailProduct;
