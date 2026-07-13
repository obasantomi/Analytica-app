import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import SkillRadarCard from "../components/SkillRadarCard";

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

const SkillRadarPage = async () => {
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

  return (
    <section className="h-full w-full">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-3xl font-semibold text-slate-900">Skill Radar</p>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Explore your core strengths, growth focus, and the skills that
              need the most attention.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div>
            <SkillRadarCard skills={skillData} />
          </div>

          <div className="space-y-6">
            <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Performance snapshot
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs text-slate-500">Best area</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {bestArea ? bestArea.subject : "No data available"}
                  </p>
                  {bestArea ? (
                    <p className="mt-1 text-sm text-slate-600">
                      Score {bestArea.score}
                    </p>
                  ) : null}
                </div>

                <div className="rounded border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs text-slate-500">Growth area</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {growthArea ? growthArea.subject : "No data available"}
                  </p>
                  {growthArea ? (
                    <p className="mt-1 text-sm text-slate-600">
                      Score {growthArea.score}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Critical areas
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Focus on the lowest scoring skills first.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {criticalAreas.length ? (
                  criticalAreas.map((area) => (
                    <div
                      key={area.subject}
                      className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {area.subject}
                        </p>
                        <p className="text-sm text-slate-600">Score</p>
                      </div>
                      <div className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                        {area.score}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                    No critical skill data available yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillRadarPage;
