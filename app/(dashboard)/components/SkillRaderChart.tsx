"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const DEFAULT_DATA = [
  { subject: "DATA VISUALIZATION", current: 0, goal: 100 },
  { subject: "INSIGHT GENERATION", current: 0, goal: 100 },
  { subject: "STORYTELLING", current: 0, goal: 100 },
  { subject: "BIAS & STATISTICAL AWARENESS", current: 0, goal: 100 },
  { subject: "CLEANING", current: 0, goal: 100 },
];

function normalizeKey(key: string) {
  return key.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export type SkillRadarChartProps = {
  skills?: Record<string, number> | null;
};

const buildChartDataFromSkills = (
  skillsObj: Record<string, number> | null | undefined,
): typeof DEFAULT_DATA => {
  if (!skillsObj) return DEFAULT_DATA;

  const normalized: Record<string, number> = {};
  Object.entries(skillsObj).forEach(([k, v]) => {
    normalized[normalizeKey(k)] = Number(v) || 0;
  });

  return DEFAULT_DATA.map((d) => {
    const key = normalizeKey(d.subject);
    return {
      ...d,
      current: normalized[key] ?? d.current,
    };
  });
};

const SkillRadarCard = ({ skills }: SkillRadarChartProps) => {
  const [chartData, setChartData] = useState(() =>
    buildChartDataFromSkills(skills),
  );

  useEffect(() => {
    if (skills) {
      setChartData(buildChartDataFromSkills(skills));
      return;
    }

    let mounted = true;

    axios
      .get("/api/user/skills")
      .then((response) => {
        if (!mounted) return;
        const fetchedSkills = response.data?.skill ?? null;
        setChartData(buildChartDataFromSkills(fetchedSkills));
      })
      .catch(() => {
        // keep defaults on error
      });

    return () => {
      mounted = false;
    };
  }, [skills]);

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
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={chartData}>
            <PolarGrid
              gridType="polygon"
              radialLines={false}
              stroke="#e5e7eb"
            />

            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "4px",
                padding: "10px 28px",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              itemStyle={{ color: "#60a5fa" }}
            />

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
      </div>
    </div>
  );
};

export default SkillRadarCard;
