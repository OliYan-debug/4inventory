export function LoadingSkeleton() {
  const rows = 10;

  const Item = ({ width, bgColor }) => (
    <div className="flex items-center py-2">
      <div className={`h-4 ${width} rounded-full ${bgColor}`}></div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {Array.from({ length: rows }).map((_, index) => {
        const opacityPercentage = (rows - 1 - index) * 10;

        return (
          <div
            key={index}
            style={{ opacity: `${opacityPercentage}%` }}
            className="flex flex-col items-center odd:bg-neutral-100 even:bg-neutral-200/60"
          >
            <div className="flex h-12 w-full animate-pulse justify-evenly">
              <Item width="w-36" bgColor="bg-neutral-300" />
              <Item width="w-70" bgColor="bg-neutral-300" />
              <Item width="w-40" bgColor="bg-neutral-300" />
              <Item width="w-60" bgColor="bg-neutral-300" />
              <Item width="w-20" bgColor="bg-neutral-300" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
