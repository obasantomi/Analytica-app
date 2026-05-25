"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import SkillRadarCardSkeleton from "./SkillRadarCardSkeleton";
import type { SkillRadarChartProps } from "./SkillRaderChart";

const SkillRadarCard = dynamic(() => import("./SkillRaderChart"), {
  ssr: false,
  loading: () => <SkillRadarCardSkeleton />,
}) as ComponentType<SkillRadarChartProps>;

export default SkillRadarCard;
