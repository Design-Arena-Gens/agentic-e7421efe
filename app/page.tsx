"use client";

import { useMemo, useState, useEffect } from "react";

type Segment = {
  readonly id: string;
  readonly timecode: string;
  readonly title: string;
  readonly logline: string;
  readonly narration: string;
  readonly vitals: {
    readonly distance: number;
    readonly ammo: number;
    readonly heartRate: number;
    readonly integrity: number;
  };
};

const missionSegments: Segment[] = [
  {
    id: "ignite",
    timecode: "00:00",
    title: "Ignition Point",
    logline: "Burning wreckage and dwindling cover mark the opening beats of the extraction.",
    narration:
      "Agent Slade crouched behind the burning wreckage, the smell of gasoline and gunpowder thick in the air. His left arm screamed in pain; the bullet wound pulsed through the makeshift bandage. The extraction point glowed 500 meters away through enemy territory. Three rounds. One knife. One minute of advantage—maybe.",
    vitals: { distance: 500, ammo: 3, heartRate: 128, integrity: 64 }
  },
  {
    id: "counterfire",
    timecode: "00:26",
    title: "Counterfire",
    logline: "Incoming automatic bursts force a lethal sprint between pockets of cover.",
    narration:
      "Tracer fire stitched the wreckage, sparks raining past his face. Slade exhaled, rolled from cover, and squeezed twice. Two silhouettes dropped. He darted forward, boots biting into grit as rounds carved trenches at his heels. There were no second chances left out here.",
    vitals: { distance: 420, ammo: 1, heartRate: 146, integrity: 58 }
  },
  {
    id: "steel",
    timecode: "00:51",
    title: "Steel on Steel",
    logline: "Close-quarters violence in the blind spot of the perimeter floodlights.",
    narration:
      "A shadow lunged from the right—a blade flashing, close enough that gunplay meant suicide. Instinct seized him. Steel kissed air, then flesh as Slade drove the combat knife up beneath the attacker’s jaw. Hot arterial spray misted the night. He lifted the dead weight aside. No time to think.",
    vitals: { distance: 360, ammo: 1, heartRate: 158, integrity: 54 }
  },
  {
    id: "shockwave",
    timecode: "01:17",
    title: "Shockwave",
    logline: "An unexpected explosion resets every plan in real time.",
    narration:
      "The perimeter wall loomed ahead. Almost clear. Then the world erupted—an explosion undercutting the courtyard, flinging Slade into the air. Concrete met bone. His ears rang. Vision ghosted in white noise. Four armored silhouettes fanned out through the smoke, rifles hunting for his heartbeat.",
    vitals: { distance: 220, ammo: 1, heartRate: 171, integrity: 37 }
  },
  {
    id: "threshold",
    timecode: "01:39",
    title: "Threshold",
    logline: "Improvised tactics turn the enemy’s formation into a corridor of opportunity.",
    narration:
      "Instinct found his last bullet. He baited their flank, fired high, and shattered a floodlight. Darkness bloomed. The men hesitated. Slade rolled left, scooped a fallen SMG, and swept the line in a ten-round scythe. Three fell. The fourth bolted. Slade vaulted the broken barricade, bleeding but alive.",
    vitals: { distance: 110, ammo: 24, heartRate: 162, integrity: 29 }
  },
  {
    id: "exfil",
    timecode: "02:00",
    title: "Extraction Arc",
    logline: "The evac VTOL descends into the firestorm for a narrow pickup window.",
    narration:
      "The evac beacon flared to life. Rotor thunder punched through the haze as the VTOL dropped a steel cable. Slade clipped in, every nerve on fire. Enemy reinforcements spilled from the barracks. He dangled above a burning courtyard, covering fire raining from the craft. The ground shrank; the night swallowed the chaos. BLOOD RUN 02:00—complete.",
    vitals: { distance: 0, ammo: 18, heartRate: 149, integrity: 21 }
  }
];

const intelHighlights = [
  {
    label: "Extraction Window",
    value: "02:00",
    detail: "Two minutes from ignition to VTOL clearance."
  },
  {
    label: "Confirmed Hostiles",
    value: "11",
    detail: "Seven neutralized at range, four in close quarters."
  },
  {
    label: "Critical Injury",
    value: "Left bicep gunshot",
    detail: "Blood loss stabilized with improvised tourniquet."
  },
  {
    label: "Asset Status",
    value: "Secure",
    detail: "Agent Slade en route to debrief aboard Specter-9."
  }
];

function useTelemetryUpdater(distance: number) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPulse(distance);
    });
    return () => cancelAnimationFrame(frame);
  }, [distance]);

  return pulse;
}

export default function Page() {
  const [activeId, setActiveId] = useState<string>(missionSegments[0]?.id ?? "");
  const activeSegment = useMemo(
    () => missionSegments.find((segment) => segment.id === activeId) ?? missionSegments[0],
    [activeId]
  );

  const distancePulse = useTelemetryUpdater(activeSegment.vitals.distance);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18),_transparent_55%)]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-16 md:px-10 lg:px-16">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-10 shadow-2xl shadow-red-700/20 backdrop-blur">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(248,113,113,0.24),transparent_55%)]" />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="tracking-[0.3em] text-sm uppercase text-red-400">Operation Codename</p>
              <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">
                Blood Run <span className="text-red-500">02:00</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
                Enter the extraction gauntlet alongside Agent Slade. Track every heartbeat, every round,
                and every decision within the narrow two-minute window between survival and oblivion.
              </p>
            </div>
            <div className="grid gap-4 rounded-2xl border border-white/5 bg-white/5 p-6">
              <h2 className="text-xs uppercase tracking-[0.3em] text-slate-300">Mission Telemetry</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-200">
                <TelemetryStat label="Distance to Extraction" value={`${activeSegment.vitals.distance} m`} />
                <TelemetryStat label="Remaining Ammo" value={`${activeSegment.vitals.ammo} rounds`} />
                <TelemetryStat label="Heart Rate" value={`${activeSegment.vitals.heartRate} bpm`} />
                <TelemetryStat label="Armor Integrity" value={`${activeSegment.vitals.integrity}%`} />
              </div>
              <ProgressMeter value={100 - Math.min(distancePulse / 5, 100)} />
            </div>
          </div>
        </header>

        <section className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-400">Field Report</p>
                <h2 className="mt-2 text-3xl font-semibold uppercase text-white">
                  Extraction Timeline
                </h2>
              </div>
              <p className="text-sm text-slate-400">Scroll or tap to relive the run.</p>
            </div>
            <div className="mt-8 flex flex-col gap-6">
              {missionSegments.map((segment) => {
                const isActive = segment.id === activeSegment.id;
                return (
                  <button
                    key={segment.id}
                    className={`relative w-full rounded-2xl border p-6 text-left transition-all duration-200 ${
                      isActive
                        ? "border-red-500/60 bg-red-500/10 shadow-lg shadow-red-900/30"
                        : "border-white/5 bg-white/5 hover:border-red-400/40 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveId(segment.id)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                        {segment.timecode}
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-[0.4em] ${
                          isActive ? "text-red-300" : "text-slate-500"
                        }`}
                      >
                        {isActive ? "Active" : "Standby"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold uppercase text-white">
                      {segment.title}
                    </h3>
                    <p className="mt-2 text-sm italic text-red-200/80">{segment.logline}</p>
                    <p className="mt-4 text-base leading-relaxed text-slate-200">{segment.narration}</p>
                  </button>
                );
              })}
            </div>
          </article>

          <aside className="flex flex-col gap-8">
            <section className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-red-400">Signal Relay</p>
              <h2 className="mt-3 text-2xl font-semibold uppercase text-white">Command Highlights</h2>
              <ul className="mt-6 space-y-4">
                {intelHighlights.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                    <p className="mt-1 text-xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-slate-400">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="overflow-hidden rounded-3xl border border-red-500/40 bg-gradient-to-br from-black via-black/80 to-red-950/40 p-8 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-red-400">Combat Visualizer</p>
              <h2 className="mt-3 text-2xl font-semibold uppercase text-white">Trajectory Grid</h2>
              <TrajectoryGrid activeSegment={activeSegment} />
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}

function TelemetryStat({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="space-y-1 rounded-xl border border-white/5 bg-black/40 p-4">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function ProgressMeter({ value }: { readonly value: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
        <span>Extraction Clearance</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-400 via-red-500 to-amber-400 transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

function TrajectoryGrid({ activeSegment }: { readonly activeSegment: Segment }) {
  const intensity = useMemo(() => {
    const normalized = Math.max(0, Math.min(1, 1 - activeSegment.vitals.distance / 500));
    return normalized;
  }, [activeSegment.vitals.distance]);

  const gridCells = useMemo(() => {
    const base = 36;
    const highlighted = Math.round(intensity * base);
    return Array.from({ length: base }, (_, index) => index < highlighted);
  }, [intensity]);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-6 gap-2">
        {gridCells.map((isHot, index) => (
          <div
            key={index}
            className={`aspect-square rounded-lg border border-red-500/10 transition-colors duration-300 ${
              isHot ? "bg-red-500/40 shadow-inner shadow-red-500/30" : "bg-white/5"
            }`}
          />
        ))}
      </div>
      <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-400">
        Segment: <span className="text-red-300">{activeSegment.title}</span>
      </p>
      <p className="mt-2 text-sm text-slate-300">
        Tactical density increases as Agent Slade closes on extraction. Each hot cell marks a field of
        fire neutralized during the two-minute run.
      </p>
    </div>
  );
}
