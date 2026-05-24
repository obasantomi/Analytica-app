"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";

const data = [
  { subject: "DATA VIZ", current: 80, goal: 90 },
  { subject: "INSIGHT GENERATION", current: 70, goal: 85 },
  { subject: "STORYTELLING", current: 50, goal: 80 },
  { subject: "BIAS & STATISTICAL AWARENESS", current: 45, goal: 75 },
  { subject: "CLEANING", current: 60, goal: 70 },
];

const SkillRadarCard = () => {
  return (
    <div className="w-full mx-auto mb-10 mt-15 bg-white rounded-xl p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Skill Radar</h2>
          <p className="text-slate-500 text-sm">
            Strength evolution across current projects
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            Current
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            Goal
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: "320px" }}>
        (
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={data}>
            <PolarGrid
              gridType="polygon"
              radialLines={false}
              stroke="#e5e7eb"
            />

            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <Tooltip />

            <Radar
              dataKey="goal"
              stroke="#34d399"
              fill="transparent"
              strokeWidth={2}
              strokeDasharray="5 5"
            />

            <Radar
              dataKey="current"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.35}
              strokeWidth={3}
            />
          </RadarChart>
        </ResponsiveContainer>
        )
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-[#E0E3E5] border-t text-center">
        <div>
          <p className="text-xs text-[#001736]">BEST AREA</p>
          <p className="font-semibold text-[12px] text-[#43474F]">Data Viz</p>
        </div>

        <div>
          <p className="text-xs text-[#001736]">GROWTH AREA</p>
          <p className="font-semibold text-[12px] text-[#43474F]">
            Engineering
          </p>
        </div>

        <div>
          <p className="text-xs text-[#001736]">INSIGHT</p>
          <p className="font-semibold text-[#43474F] text-[12px] flex items-center justify-center gap-1">
            <FiTrendingUp className="text-emerald-500" />
            +12% Gain
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarCard;
