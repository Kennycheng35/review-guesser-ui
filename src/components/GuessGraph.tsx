import React from "react";

type GuessGraphProps = {
    data: number[]
}

const GuessGraph:React.FC<GuessGraphProps> = ({ data }) => {
  const max = Math.max(...data);

  return (
    <div className="w-full p-4 space-y-2">
      {data.map((count, i) => (
        <div key={i} className="flex items-center space-x-2">
          <div className="w-4 text-right text-2xl text-black pb-2 pt-1">{i === 4 ? 'X' : i + 1}</div>
          <div
            className={`${i === 4 ? 'bg-red-400':'bg-green-500'} text-white text-sm px-2 py-1 pr-4`}
            style={{
              width: `${(count / max) * 100}%`,
              minWidth: count > 0 ? "2rem" : "0.5rem",
            }}
          >
            {count}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuessGraph;