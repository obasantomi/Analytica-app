"use client";
import dynamic from "next/dynamic";
import SkillRadarCardSkeleton from "./SkillRadarCardSkeleton";

const SkillRadarCard = dynamic(() => import("./SkillRaderChart"), {
  ssr: false,
  loading: () => <SkillRadarCardSkeleton />,
});

export default SkillRadarCard;
