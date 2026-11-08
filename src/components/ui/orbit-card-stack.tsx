"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import {
  type CSSProperties,
  type FocusEvent,
  useMemo,
  useRef,
  useState,
} from "react";

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  href?: string;
  accent?: string;
  initials?: string;
  stat?: string;
}

interface OrbitCardStackProps {
  items?: OrbitStackItem[];
  className?: string;
  cardClassName?: string;
  defaultActiveIndex?: number;
  spread?: number;
  lift?: number;
  onActiveChange?: (item: OrbitStackItem, index: number) => void;
}

const defaultItems: OrbitStackItem[] = [
  {
    name: "Mira Vale",
    role: "Creative Lead",
    description:
      "Shapes visual systems with enough restraint to feel expensive and enough edge to be remembered.",
    accent: "#f8d66d",
    initials: "MV",
    stat: "Identity",
  },
  {
    name: "Noor Kade",
    role: "Product Strategy",
    description:
      "Turns loose ideas into sharp product moves, crisp priorities, and launchable experiences.",
    accent: "#78dcca",
    initials: "NK",
    stat: "Roadmap",
  },
  {
    name: "Ari Chen",
    role: "Founder",
    description:
      "Sets the taste bar, protects the details, and keeps the whole team pointed at the same high signal.",
    accent: "#f3f1ea",
    initials: "AC",
    stat: "Vision",
  },
  {
    name: "Sana Holt",
    role: "Frontend Engineer",
    description:
      "Builds the motion, polish, and interface texture that make the product feel calm under pressure.",
    accent: "#b9a7ff",
    initials: "SH",
    stat: "Motion",
  },
  {
    name: "Ezra Moon",
    role: "Operations",
    description:
      "Keeps the machine quiet, the handoffs clean, and the team moving without pointless friction.",
    accent: "#ff9d77",
    initials: "EM",
    stat: "Systems",
  },
];

function inRange(index: number, length: number) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function initialsFor(item: OrbitStackItem) {
  return (
    item.initials ??
    item.name
      .split(/\s+/)
      .map((part) => part.at(0))
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );
}

function Portrait({ item }: { item: OrbitStackItem }) {
  const initials = initialsFor(item);

  return (
    <div className="project-glyph" style={{ "--project-accent": item.accent ?? "#D58B5D" } as CSSProperties} aria-hidden="true">
      <svg viewBox="0 0 440 250" fill="none">
        <path className="project-glyph-grid" d="M16 48h408M16 96h408M16 144h408M16 192h408M68 20v210M136 20v210M204 20v210M272 20v210M340 20v210M408 20v210" />
        <path className="project-glyph-trace" d="M17 143h52l14-42 21 88 22-65 18 25h43l17-19 21 12h43l22-52 19 86 22-58 18 25h76" />
        <circle className="project-glyph-dot" cx="69" cy="143" r="4" />
        <text x="220" y="151" textAnchor="middle">{initials}</text>
      </svg>
      <span>{item.stat ?? "Project"}</span>
    </div>
  );
}

export function OrbitCardStack({
  items = defaultItems,
  className,
  cardClassName,
  defaultActiveIndex = 2,
  spread = 168,
  lift = 34,
  onActiveChange,
}: OrbitCardStackProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const cards = items.length ? items : defaultItems;
  const restingIndex = inRange(defaultActiveIndex, cards.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const midpoint = (cards.length - 1) / 2;

  const layouts = useMemo(
    () =>
      cards.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        return {
          open: {
            x: orbit * spread,
            y: Math.abs(orbit) * 30 + Math.max(0, Math.abs(orbit) - 1) * 10,
            rotation: orbit * 8.5,
          },
          closed: {
            x: stack * 10,
            y: Math.abs(stack) * 5,
            rotation: stack * 2.8,
          },
        };
      }),
    [cards, midpoint, restingIndex, spread],
  );

  const activate = (index: number) => {
    const next = inRange(index, cards.length);
    setOpen(true);
    setActiveIndex(next);
    onActiveChange?.(cards[next]!, next);
  };
  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
  };
  const leaveFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  return (
    <div
      className={cn(
        "relative flex min-h-full w-full items-center justify-center overflow-hidden p-8",
        className,
      )}
    >
      <div
        ref={stageRef}
        className="relative h-[470px] w-full max-w-[980px]"
        onMouseLeave={close}
        onBlur={leaveFocus}
        role="list"
        aria-label="Selected project card stack"
      >
        {cards.map((item, index) => {
          const position = open ? layouts[index]!.open : layouts[index]!.closed;
          const active = index === activeIndex;
          const style: CSSProperties = {
            zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${
              position.y - (open && active ? lift : 0)
            }px)) rotate(${position.rotation}deg) scale(${open ? 0.985 : 0.97})`,
            transitionDuration: reduceMotion ? "0ms" : "420ms",
          };

          return (
            <article
              key={`${item.name}-${index}`}
              role="listitem"
              tabIndex={0}
              aria-current={active ? "true" : undefined}
              className={cn(
                "absolute left-1/2 top-1/2 w-[min(78vw,21rem)] origin-bottom cursor-pointer rounded-[1.9rem] border border-white/10 bg-[#141319] p-4 text-[#f1edf6] outline-none",
                "transition-[transform] ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:ring-2 focus-visible:ring-violet-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0b0f]",
                cardClassName,
              )}
              style={style}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + cards.length) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
              }}
            >
              <div className="relative">
                <Portrait item={item} />
              </div>
              <div className="px-2 pb-2 pt-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {item.role}
                </p>
                <h3 className="mt-2 text-[1.8rem] font-semibold leading-none tracking-[-0.04em] text-[#f1edf6]">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-[17rem] text-[0.9rem] font-normal leading-[1.5] tracking-[-0.01em] text-[#aba6b1]">
                  {item.description}
                </p>
                <a className="orbit-project-link" href={item.href} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} aria-label={`Open project: ${item.name}`}>
                  <span>Open project</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
