const SkeletonItem = () => (
  <table className="w-full text-sm  text-gray-500">
    <tbody className="animate-pulse">
      <tr className="bg-white border-b border-gray-50">
        <td className="py-3 px-6">
          <div className="h-16 w-16 rounded bg-gray-200"></div>
        </td>
        <td className="py-3">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </td>
        <td className="py-3">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </td>
        <td className="flex justify-center gap-1 py-3">
          <div className="h-7 w-7 rounded-sm bg-gray-200"></div>
          <div className="h-7 w-7 rounded-sm bg-gray-200"></div>
          <div className="h-7 w-7 rounded-sm bg-gray-200"></div>
        </td>
      </tr>
    </tbody>
  </table>
);

const SkeletonProductAdmin = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <SkeletonItem key={idx} />
      ))}
    </div>
  );
};

export default SkeletonProductAdmin;
