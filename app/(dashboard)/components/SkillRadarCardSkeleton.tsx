"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkillRadarCardSkeleton = () => {
  return (
    <div className="w-full mx-auto mb-10 mt-15 bg-white rounded-xl p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Skeleton width={140} height={24} />
          <div className="mt-2">
            <Skeleton width={220} height={14} />
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4">
          <Skeleton width={80} height={14} />
          <Skeleton width={80} height={14} />
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="w-full h-80 flex items-center justify-center">
        <Skeleton circle width={240} height={240} />
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E0E3E5] text-center">
        <div>
          <Skeleton width={80} height={12} />
          <div className="mt-2">
            <Skeleton width={100} height={14} />
          </div>
        </div>

        <div>
          <Skeleton width={90} height={12} />
          <div className="mt-2">
            <Skeleton width={110} height={14} />
          </div>
        </div>

        <div>
          <Skeleton width={60} height={12} />
          <div className="mt-2 flex justify-center">
            <Skeleton width={80} height={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarCardSkeleton;