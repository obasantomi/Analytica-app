import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import {
  FiAlertTriangle,
  FiCpu,
  FiTarget,
  FiTrendingDown,
} from "react-icons/fi";
import DashboardStatCard from "../components/DashboardStatCard";
import SkillRadarCard from "../components/SkillRadarCard";

function calculateOverallScore(skills?: Record<string, number> | null) {
  if (!skills) return 0;

  const values = Object.values(skills).map((value) => Number(value) || 0);

  if (!values.length) return 0;

  return Number(
    (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1),
  );
}

function buildSkillSummary(skills?: Record<string, number> | null) {
  const entries = skills
    ? Object.entries(skills).map(([subject, value]) => ({
        subject,
        score: Number(value) || 0,
      }))
    : [];

  if (!entries.length) {
    return {
      bestArea: null,
      growthArea: null,
      criticalAreas: [] as { subject: string; score: number }[],
    };
  }

  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const critical = sorted.slice(-3).reverse();

  return {
    bestArea: sorted[0],
    growthArea: sorted[sorted.length - 1],
    criticalAreas: critical,
  };
}

const SkillProfilePage = async () => {
  const session = await getServerSession();
  let skillData: Record<string, number> | null = null;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      const userSkill = await prisma.userSkill.findUnique({
        where: { userId: user.id },
        select: { skill: true },
      });
      skillData = (userSkill?.skill as Record<string, number>) ?? null;
    }
  }

  const { bestArea, growthArea, criticalAreas } = buildSkillSummary(skillData);
  const overallScore = calculateOverallScore(skillData);

  return (
    <section className="h-full w-full">
      <div className="mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <p className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Skill Radar
              </p>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-[15px]">
                Explore your core strengths, growth focus, and the skills that
                need the most attention.
              </p>
            </div>

            <div className="flex max-w-xl items-start gap-2 rounded bg-[#001736] p-2.5 text-[12px] italic text-white sm:p-3 sm:text-[13px]">
              <img src="/images/Icon.svg" alt="" className="mt-0.5" />
              <p>
                Powered by AI to highlight your strongest areas and the next
                skills to sharpen.
              </p>
            </div>
          </div>

          <div className="w-full max-w-sm">
            <DashboardStatCard
              title="Overall skill score"
              value={`${overallScore.toFixed(1)}%`}
              description="Average across all tracked skill areas"
              icon={<FiCpu className="h-5 w-5" />}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-15 ">
          <div className="flex-1">
            <SkillRadarCard skills={skillData} />
          </div>

          <div className="space-y-6">
            <p className="text-xl font-semibold text-slate-900">
              Intelligence Summary
            </p>
            <div className="rounded  bg-[#001736] px-10 pb-15 pt-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-swhite">
                Performance snapshot
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded border-l-4 border-[#58FBDA]  bg-[#001F45] text-white p-5 pr-25">
                  <p className="text-xs ">Best area</p>
                  <p className="mt-2 text-xl font-semibold ">
                    {bestArea ? bestArea.subject : "No data available"}
                  </p>
                  {bestArea ? (
                    <p className="mt-1 text-sm text-[#58FBDA]">
                      Score {bestArea.score}
                    </p>
                  ) : null}
                </div>

                <div className="rounded border-l-4 border-[#FFDAD6] bg-[#001F45] text-white p-5 pr-25">
                  <p className="text-xs">Growth area</p>
                  <p className="mt-2 text-xl font-semibold">
                    {growthArea ? growthArea.subject : "No data available"}
                  </p>
                  {growthArea ? (
                    <p className="mt-1 text-sm text-[#FFDAD6]">
                      Score {growthArea.score}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-slate-100 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:mt-10 sm:p-8 lg:p-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-900 text-white shadow-sm">
                <FiAlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Critical areas
                </p>
                <p className="mt-1 text-sm text-slate-600 sm:text-[15px]">
                  Focus on the lowest scoring skills first.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {criticalAreas.length ? (
              criticalAreas.map((area, index) => {
                const Icon = [FiTarget, FiAlertTriangle, FiTrendingDown][
                  index % 3
                ];

                return (
                  <div
                    key={area.subject}
                    className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-[0_6px_16px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-900">
                          {area.subject}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Priority focus
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-600">
                        Score
                      </span>
                      <div className="rounded-md bg-slate-900 px-3.5 py-1.5 text-sm font-semibold text-white">
                        {area.score}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 bg-white/70 p-6 text-sm text-slate-500">
                No critical skill data available yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillProfilePage;
