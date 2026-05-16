"use client";

import type { Fixture } from "@/lib/data";
import { toLocalFixtures } from "@/lib/localFixture";
import MatchCard from "./MatchCard";

export default function UpcomingMatchCards({
  fixtures
}: {
  fixtures: Fixture[];
}) {
  return (
    <div className="space-y-3">
      {toLocalFixtures(fixtures).map((f) => (
        <MatchCard key={f.id} fixture={f} />
      ))}
    </div>
  );
}
