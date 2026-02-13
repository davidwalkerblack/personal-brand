import React from "react";
import {
  Activity,
  ArrowUpRight,
  Droplets,
  Globe,
  HeartPulse,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  Maximize2,
  Minus,
  NotebookPen,
  PenLine,
  Video,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const TUMBLR_PROSE_URL = "https://gladmadman.tumblr.com/";
const TUMBLR_MUSIC_URL = "https://www.tumblr.com/walker-black";
const TUMBLR_JOURNAL_URL = "https://www.tumblr.com/davidwalkerblack";

// Single-file, production-ready homepage component.
// Tailwind is assumed. Works inside Next.js (App Router) as `app/page.tsx`.

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

type NavItem = { label: string; href: string };

type Links = {
  music: string;
  latestVideo: string;
  worksHub: string;

  gaiaNova: string;
  theowater: string;
  cgn: string;

  instagram: string;
  linkedin: string;
  youtube: string;

  email: string;

  bookingsAll: string;
  bookingsChiro: string;
  bookingsStretch: string;
  pilatesWaitlist: string;
};

type LinkItem = { label: string; href: string; icon: LucideIcon };

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

type JournalPost = {
  id: string;
  label: string;
  title: string;
  excerpt: string;
  body: string;
};

type ArtistKey = "music" | "prose" | "photos";

type EntrepreneurKey = "gaiaNova" | "theowater" | "cgn" | "philosophy";

type ArtistPanel = {
  key: ArtistKey;
  label: string;
  title: string;
  body: string;
  links?: Array<{ label: string; href: string }>;
};

type EntrepreneurPanel = {
  key: EntrepreneurKey;
  label: string;
  title: string;
  body: string;
  links?: Array<{ label: string; href: string }>;
};

const isExternal = (href: string) => /^https?:\/\//i.test(href);
const isLikelyUrl = (href: string) => /^https?:\/\//i.test(href);

const ExternalProps = ({ href }: { href: string }) =>
  isExternal(href)
    ? { target: "_blank" as const, rel: "noreferrer" as const }
    : ({} as const);

const Section = ({ id, eyebrow, title, subtitle, children }: SectionProps) => (
  <section id={id} className="scroll-mt-28">
    <div className="pb-4">
      {eyebrow && <div className="text-xs tracking-[0.22em] uppercase text-sky-300/80">{eyebrow}</div>}
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-zinc-100">{title}</h2>
      {subtitle && <p className="mt-2 text-zinc-400 max-w-3xl leading-relaxed">{subtitle}</p>}
    </div>
    {children}
  </section>
);

type MiniCardProps = {
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
};

const MiniCard = ({ title, desc, href, icon: Icon }: MiniCardProps) => (
  <a
    href={href}
    {...ExternalProps({ href })}
    className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition shadow-sm hover:bg-zinc-800 hover:border-sky-400/30 hover:-translate-y-0.5"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="font-semibold text-zinc-100">{title}</div>
        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{desc}</p>
      </div>
      <div className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center transition group-hover:border-sky-400/40">
        <Icon className="h-5 w-5 text-zinc-100 transition group-hover:text-sky-300" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
      <span className="underline underline-offset-4 decoration-zinc-300 group-hover:decoration-zinc-700 transition">
        Learn more
      </span>
      <ArrowUpRight className="h-4 w-4 text-zinc-500" />
    </div>
  </a>
);

type MiniActionCardProps = {
  title: string;
  desc: string;
  onClick: () => void;
  icon: LucideIcon;
};

const MiniActionCard = ({ title, desc, onClick, icon: Icon }: MiniActionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group w-full text-left rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition shadow-sm hover:bg-zinc-800 hover:border-sky-400/30 hover:-translate-y-0.5"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="font-semibold text-zinc-100">{title}</div>
        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{desc}</p>
      </div>
      <div className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center transition group-hover:border-sky-400/40">
        <Icon className="h-5 w-5 text-zinc-100 transition group-hover:text-sky-300" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
      <span className="underline underline-offset-4 decoration-zinc-300 group-hover:decoration-zinc-700 transition">
        Learn more
      </span>
      <ArrowUpRight className="h-4 w-4 text-zinc-500" />
    </div>
  </button>
);

function JournalModal({ post, onClose }: { post: JournalPost; onClose: () => void }) {
  const paragraphs = React.useMemo(() => post.body.split("\n\n"), [post.body]);

  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
    >
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/60" aria-label="Close modal" />

      <div className="relative h-full w-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{post.label}</div>
                  <div className="mt-2 text-2xl sm:text-3xl font-semibold text-zinc-100">{post.title}</div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 prose prose-invert max-w-none">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-xs text-zinc-500">Tip: press Esc to close. Scroll to read the full entry.</div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                >
                  Close
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ArtistModal({
  panel,
  minimized,
  onMinimize,
  onRestore,
  onClose,
}: {
  panel: ArtistPanel;
  minimized: boolean;
  onMinimize: () => void;
  onRestore: () => void;
  onClose: () => void;
}) {
  const paragraphs = React.useMemo(() => panel.body.split("\n\n"), [panel.body]);

  if (minimized) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="text-sm font-semibold text-zinc-100">{panel.title}</div>
            <div className="flex-1" />
            <button
              type="button"
              onClick={onRestore}
              className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
              aria-label="Restore"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={panel.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
    >
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/60" aria-label="Close modal" />

      <div className="relative h-full w-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{panel.label}</div>
                  <div className="mt-2 text-2xl sm:text-3xl font-semibold text-zinc-100">{panel.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onMinimize}
                    className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
                    aria-label="Minimize"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {panel.key === "prose" ? (
                <div className="mt-6">
                  <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800">
                    <iframe
                      title="Prose & Poetry (Tumblr)"
                      src={TUMBLR_PROSE_URL}
                      width="100%"
                      height={900}
                      frameBorder={0}
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    <a
                      href={TUMBLR_PROSE_URL}
                      {...ExternalProps({ href: TUMBLR_PROSE_URL })}
                      className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                    >
                      Open on Tumblr
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <div className="text-xs text-zinc-500">
                      If the embed doesn’t load, Tumblr is blocking iframe display in some browsers.
                    </div>
                  </div>
                </div>
              ) : panel.key === "music" ? (
                <div className="mt-6">
                  <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800">
                    <iframe
                      title="Music & Videos (Tumblr)"
                      src={TUMBLR_MUSIC_URL}
                      width="100%"
                      height={900}
                      frameBorder={0}
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    <a
                      href={TUMBLR_MUSIC_URL}
                      {...ExternalProps({ href: TUMBLR_MUSIC_URL })}
                      className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                    >
                      Open on Tumblr
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <div className="text-xs text-zinc-500">
                      If the embed doesn't load, Tumblr is blocking iframe display in some browsers.
                    </div>
                  </div>
                </div>
              ) : panel.key === "photos" ? (
                <div className="mt-6">
                  <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800">
                    <iframe
                      title="Journal (Tumblr)"
                      src={TUMBLR_JOURNAL_URL}
                      width="100%"
                      height={900}
                      frameBorder={0}
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-3 flex-wrap">
                    <a
                      href={TUMBLR_JOURNAL_URL}
                      {...ExternalProps({ href: TUMBLR_JOURNAL_URL })}
                      className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                    >
                      Open on Tumblr
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <div className="text-xs text-zinc-500">
                      If the embed doesn't load, Tumblr is blocking iframe display in some browsers.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 prose prose-invert max-w-none">
                  {paragraphs.map((para, idx) => (
                    <p key={idx} className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {panel.links && panel.links.length > 0 && (
                <div className="mt-6 grid gap-2">
                  {panel.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      {...ExternalProps({ href: l.href })}
                      className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
                    >
                      <span className="text-zinc-200">{l.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-sky-300 transition" />
                    </a>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-xs text-zinc-500">Tip: press Esc to close. Minimize to keep browsing.</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onMinimize}
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                  >
                    Minimize
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                  >
                    Close
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function EntrepreneurModal({
  panel,
  minimized,
  onMinimize,
  onRestore,
  onClose,
}: {
  panel: EntrepreneurPanel;
  minimized: boolean;
  onMinimize: () => void;
  onRestore: () => void;
  onClose: () => void;
}) {
  const paragraphs = React.useMemo(() => panel.body.split("\n\n"), [panel.body]);

  if (minimized) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="text-sm font-semibold text-zinc-100">{panel.title}</div>
            <div className="flex-1" />
            <button
              type="button"
              onClick={onRestore}
              className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
              aria-label="Restore"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={panel.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
    >
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/60" aria-label="Close modal" />

      <div className="relative h-full w-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{panel.label}</div>
                  <div className="mt-2 text-2xl sm:text-3xl font-semibold text-zinc-100">{panel.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onMinimize}
                    className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
                    aria-label="Minimize"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 prose prose-invert max-w-none">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {para}
                  </p>
                ))}
              </div>

              {panel.links && panel.links.length > 0 && (
                <div className="mt-6 grid gap-2">
                  {panel.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      {...ExternalProps({ href: l.href })}
                      className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
                    >
                      <span className="text-zinc-200">{l.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-sky-300 transition" />
                    </a>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-xs text-zinc-500">Tip: press Esc to close. Minimize to keep browsing.</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onMinimize}
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                  >
                    Minimize
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                  >
                    Close
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function runDevTests() {
  console.assert(isExternal("https://example.com"), "Expected external URL to be detected.");
  console.assert(!isExternal("#section"), "Expected hash link to be treated as internal.");
  console.assert(!isExternal("/path"), "Expected relative path to be treated as internal.");
  console.assert("a\n\nB".split("\n\n").length === 2, "Expected paragraph split to work.");
  console.assert(isLikelyUrl("https://x.com"), "Expected likely URL to pass.");
  console.assert(!isLikelyUrl("PASTE_URL"), "Expected placeholder to fail.");
}

export default function DWBHome() {
  const LINKS: Links = {
    music: "https://www.tumblr.com/blog/walker-black",
    latestVideo: "#", // TODO: Add your latest video URL here
    worksHub: "#artist",

    gaiaNova: "https://gaianova.org",
    theowater: "https://drinktheowater.com",
    cgn: "https://childrenofgaianova.com",

    instagram: "https://www.instagram.com/davidwalkerblack/",
    linkedin: "https://www.linkedin.com/in/gaia-nova/",
    youtube: "https://www.youtube.com/@davidwalkerblack",

    email: "david@gaianova.org",

    bookingsAll: "#contact", // TODO: Add your booking calendar URL here
    bookingsChiro: "#contact", // TODO: Add your chiropractic booking URL here
    bookingsStretch: "#contact", // TODO: Add your stretch therapy booking URL here
    pilatesWaitlist: "#contact", // TODO: Add your Pilates waitlist URL here
  };

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") runDevTests();
  }, []);

  const nav: NavItem[] = [
    { label: "Healer", href: "#healer" },
    { label: "Entrepreneur", href: "#entrepreneur" },
    { label: "Artist", href: "#artist" },
    { label: "Journal", href: "#essays" },
    { label: "Bookings", href: "#bookings" },
    { label: "Contact", href: "#contact" },
  ];

  const posts: JournalPost[] = [
    {
      id: "p1",
      label: "Journal • Jan 11, 2026",
      title: "Placeholder title: Make it sharp, specific, and useful",
      excerpt: "Two-sentence excerpt. What’s the problem, what’s the insight, and why should a smart person keep reading?",
      body: "This is placeholder body copy. Replace with your real post content.\n\nKeep it skimmable: short paragraphs, clear claims, and a clean ending.",
    },
    {
      id: "p2",
      label: "Journal • Jan 12, 2026",
      title: "Placeholder title: Make it sharp, specific, and useful",
      excerpt: "Two-sentence excerpt. What’s the problem, what’s the insight, and why should a smart person keep reading?",
      body: "Placeholder body copy. You can paste the full essay here.\n\nIf it’s long, the modal will scroll cleanly.",
    },
    {
      id: "p3",
      label: "Journal • Jan 13, 2026",
      title: "Placeholder title: Make it sharp, specific, and useful",
      excerpt: "Two-sentence excerpt. What’s the problem, what’s the insight, and why should a smart person keep reading?",
      body: "Placeholder body copy. Structure suggestion: Problem → Insight → Practice → Closing line.",
    },
  ];

  const [activePostId, setActivePostId] = React.useState<string | null>(null);

  const artistPanels: Record<ArtistKey, ArtistPanel> = {
    music: { key: "music", label: "Artist", title: "Music & Videos", body: "Content coming soon." },
    prose: { key: "prose", label: "Artist", title: "Prose & Poetry", body: "Content coming soon." },
    photos: { key: "photos", label: "Artist", title: "Journal", body: "Content coming soon." },
  };

  const entrepreneurPanels: Record<EntrepreneurKey, EntrepreneurPanel> = {
    philosophy: {
      key: "philosophy",
      label: "Philosophy",
      title: "How I think about health & systems",
      body: `The human body is a perfect, self-healing organism.


The same intelligence which created the Universe creates the human in the mother’s womb.


The same intelligence which creates the body is that which heals it.


All symptoms of disease are a result of obstruction to the free flow of this intelligence.


Discomfort = Dis-ease.


Discomfort results from dysfunction.


Dysfunction is preliminary to disease.


Discomfort causes more dysfunction.


Dysfunction is the result of biological stress.


Biological stress originates from Thoughts, Traumas, and/or Toxins.


In the same way contradiction causes dissonance, things contrary to life and its mechanisms cause biological stress.


Biological stress = dysfunction = obstruction to the free flow of the intelligence which creates and heals the body.


To address dysfunction, the body creates compensation patterns so that it can function as close to perfectly as possible, keeping the human well enough to survive.


But compensations are dysfunctional biomechanics that are symptoms of biological stress, and they perpetuate dis-ease.


The good healer will:


• Ask questions to understand the source of biological stress.

• Assess the body’s posture, tissues, and movement to identify compensation patterns.

• Address the source of biological stress and clear compensation patterns.

• Remove the obstruction of the body’s intelligence that causes dysfunction.

• Teach patients to interact with their body–mind in a way that facilitates self-healing.`,
    },
    gaiaNova: {
      key: "gaiaNova",
      label: "Entrepreneur",
      title: "GAIA NOVA",
      body: "GAIA NOVA is an integrated ecosystem of business, health, and charity, built to improve both individual and planetary wellbeing. Where conscious commerce funds humanitarian work, and practical healing meets long-term global responsibility. Since it seems that some form of fundamental change is needed, I’ve created a singular project with a fractal nature focused on the fundamentals of life: Childhood and Water.",
      links: [{ label: "Visit gaianova.org", href: LINKS.gaiaNova }],
    },
    theowater: {
      key: "theowater",
      label: "Entrepreneur",
      title: "Theowater",
      body: `Theowater's mission is to create a New Earth by vitalizing humanity with water, consciousness, and the consciousness of water. A premium bottled water company designed for the compassionate consumer, Theowater exists to support charities focused on orphan welfare around the world.`,
      links: [{ label: "Visit drinktheowater.com", href: LINKS.theowater }],
    },
    cgn: {
      key: "cgn",
      label: "Entrepreneur",
      title: "Children of Gaia Nova",
      body: "Children of Gaia Nova is a future-focused charity dedicated to improving orphan welfare through long-term, systems-based solutions. It operates within the GAIA NOVA ecosystem by directing funds to trusted partner organizations like Share Tanzania, allowing immediate impact while building toward self-sustaining projects of its own.",
      links: [{ label: "Visit childrenofgaianova.com", href: LINKS.cgn }],
    },
  };

  const [activeArtistKey, setActiveArtistKey] = React.useState<ArtistKey | null>(null);
  const [artistMinimized, setArtistMinimized] = React.useState(false);
  const [activeEntrepreneurKey, setActiveEntrepreneurKey] = React.useState<EntrepreneurKey | null>(null);
  const [entrepreneurMinimized, setEntrepreneurMinimized] = React.useState(false);

  const activePost = posts.find((p) => p.id === activePostId) || null;
  const activeArtist = activeArtistKey ? artistPanels[activeArtistKey] : null;
  const activeEntrepreneur = activeEntrepreneurKey ? entrepreneurPanels[activeEntrepreneurKey] : null;

  const closeArtist = () => {
    setActiveArtistKey(null);
    setArtistMinimized(false);
  };

  const closeEntrepreneur = () => {
    setActiveEntrepreneurKey(null);
    setEntrepreneurMinimized(false);
  };

  const openArtist = (key: ArtistKey) => {
    setActivePostId(null);
    closeEntrepreneur();
    setActiveArtistKey(key);
    setArtistMinimized(false);
  };

  const openEntrepreneur = (key: EntrepreneurKey) => {
    setActivePostId(null);
    closeArtist();
    setActiveEntrepreneurKey(key);
    setEntrepreneurMinimized(false);
  };

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePostId(null);
        closeArtist();
        closeEntrepreneur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const startHere: Array<
    | ({ kind: "link" } & LinkItem)
    | { kind: "action"; label: string; icon: LucideIcon; onClick: () => void }
  > = [
    { kind: "link", label: "Book a session", href: "#bookings", icon: HeartPulse },
    { kind: "action", label: "Read the philosophy", icon: PenLine, onClick: () => openEntrepreneur("philosophy") },
    { kind: "link", label: "View art", href: "#artist", icon: Video },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="sticky top-0 z-40 border-b border-zinc-800/70 bg-zinc-950/75 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center">
              <span className="text-sm font-semibold">D</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold">David W. Black</div>
              <div className="text-xs text-zinc-400">Healer • Artist • Entrepreneur</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-5 text-sm text-zinc-400">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-sky-300 transition">
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#bookings"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-sky-300 text-zinc-900 px-3.5 py-2 text-sm shadow-sm hover:bg-sky-200 transition"
            >
              <HeartPulse className="h-4 w-4" />
              Bookings
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm hover:bg-zinc-800 transition"
            >
              Contact
              <ArrowUpRight className="h-4 w-4 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>

      <main id="top" className="relative">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-10">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
                <div className="text-xs tracking-[0.22em] uppercase text-sky-300/80">DAVID W. BLACK</div>
                <h1 className="mt-3 text-4xl sm:text-5xl font-semibold text-zinc-100 leading-[1.05]">
                  I work at the intersection of personal and planetary health.
                </h1>
              </motion.div>

              <motion.p
                variants={fadeUp}
                custom={1}
                initial="hidden"
                animate="show"
                className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl"
              >
                I’m a healer, artist, and entrepreneur. My work is centered on blurring boundaries — between person and planet, business and charity,
                mind and body, art and science — in service of a more coherent world.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={2}
                initial="hidden"
                animate="show"
                className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <a
                  href="#healer"
                  className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm transition shadow-sm hover:bg-zinc-800 hover:border-sky-400/30 hover:-translate-y-0.5"
                >
                  <span className="font-medium">Healing sessions</span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-sky-300 transition" />
                </a>
                <a
                  href="#artist"
                  className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm transition shadow-sm hover:bg-zinc-800 hover:border-sky-400/30 hover:-translate-y-0.5"
                >
                  <span className="font-medium">Creative work</span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-sky-300 transition" />
                </a>
                <a
                  href="#entrepreneur"
                  className="group inline-flex items-center justify-between gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm transition shadow-sm hover:bg-zinc-800 hover:border-sky-400/30 hover:-translate-y-0.5"
                >
                  <span className="font-medium">GAIA NOVA</span>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-sky-300 transition" />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className="mt-8 grid sm:grid-cols-3 gap-3">
                {[
                  { k: "Focus", v: "Systems" },
                  { k: "Mode", v: "Grounded" },
                  { k: "Output", v: "Clarity" },
                ].map((m) => (
                  <div key={m.k} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{m.k}</div>
                    <div className="mt-1 font-semibold text-zinc-100">{m.v}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1.5}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm"
              >
                <div className="text-sm font-semibold">Start here</div>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">If you’re new, start here — the fastest way to understand what I do.</p>
                <div className="mt-5 grid gap-2">
                  {startHere.map((l) => {
                    const ItemIcon = l.icon;
                    if (l.kind === "action") {
                      return (
                        <button
                          key={l.label}
                          type="button"
                          onClick={l.onClick}
                          className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
                        >
                          <span className="flex items-center gap-2">
                            <ItemIcon className="h-4 w-4 text-zinc-400" />
                            {l.label}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-sky-300 transition" />
                        </button>
                      );
                    }
                    return (
                      <a
                        key={l.label}
                        href={l.href}
                        {...ExternalProps({ href: l.href })}
                        className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
                      >
                        <span className="flex items-center gap-2">
                          <ItemIcon className="h-4 w-4 text-zinc-400" />
                          {l.label}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-sky-300 transition" />
                      </a>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Working thesis</div>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                    {"Pain and dis-ease arise from obstruction to the free flow of vital energy through body systems.\nWhen body and mind are integrated, health is the default state that is maintained effortlessly.\nIndividual vitality radiates outward, shaping relationships, communities, and the planet itself."}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="py-12 sm:py-14 bg-zinc-800/60 border-y border-zinc-800/70">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <Section
              id="healer"
              eyebrow="HEALER"
              title="Healing sessions"
              subtitle="Concierge chiropractic care grounded in care, science, and coherent systems."
            >
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
                  <div className="text-sm font-semibold">Approach</div>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">I offer an integrative approach to health and systems.</p>
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                    Healthcare implicitly requires someone who cares. The healing arts would be nothing without science; Science must be artfully applied
                    to be effective.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href="#bookings"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-300 text-zinc-900 px-5 py-3 text-sm hover:bg-sky-200 transition"
                    >
                      Book a healing session
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => openEntrepreneur("philosophy")}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm hover:bg-zinc-800 transition"
                    >
                      How I think about health &amp; systems
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
                  <div id="healer-philosophy" className="text-sm font-semibold">
                    How I think about health &amp; systems
                  </div>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                    Clear assessment, clean execution, and measurable change. I treat structure, function, and signal as one conversation.
                  </p>
                  <ol className="mt-5 grid gap-3">
                    {[
                      { k: "1", t: "Assess", d: "Movement + history + what matters to you." },
                      { k: "2", t: "Treat", d: "Adjustments + soft tissue + targeted drills." },
                      { k: "3", t: "Integrate", d: "A simple home plan that actually happens." },
                    ].map((s) => (
                      <li key={s.k} className="rounded-2xl border border-zinc-800 bg-zinc-800 p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-semibold">
                            {s.k}
                          </div>
                          <div>
                            <div className="font-semibold">{s.t}</div>
                            <div className="text-sm text-zinc-400">{s.d}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Section>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-14">
          <Section
            id="entrepreneur"
            eyebrow="ENTREPRENEUR"
            title="Building GAIA NOVA"
            subtitle="An ecosystem where commerce funds impact — and impact makes commerce worth doing."
          >
            <div className="grid md:grid-cols-3 gap-5">
              <MiniActionCard
                title="GAIA NOVA"
                desc="The umbrella: systems thinking, regenerative commerce, and planetary betterment."
                onClick={() => openEntrepreneur("gaiaNova")}
                icon={Globe}
              />
              <MiniActionCard
                title="Theowater"
                desc="A premium water brand designed to fund impact — credible, clean commerce."
                onClick={() => openEntrepreneur("theowater")}
                icon={Droplets}
              />
              <MiniActionCard
                title="Children of Gaia Nova"
                desc="The nonprofit arm: practical welfare initiatives you can see and measure."
                onClick={() => openEntrepreneur("cgn")}
                icon={Leaf}
              />
            </div>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-14">
          <Section
            id="bookings"
            eyebrow="BOOKINGS"
            title="Sessions"
            subtitle="Book directly through my Google Calendar. Stretch and Pilates are delivered by practitioners personally selected by me whose philosophy and knowledge of anatomy are trustworthy for holistic healing."
          >
            <div className="grid lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
                <div className="text-sm font-semibold">Choose a service</div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Each service maps to a dedicated booking page. Payments (if enabled) happen during booking.
                </p>

                <div className="mt-5 grid gap-3">
                  <a
                    href={LINKS.bookingsChiro}
                    {...ExternalProps({ href: LINKS.bookingsChiro })}
                    className="group rounded-2xl border border-sky-400/30 bg-zinc-900 px-4 py-4 text-sm transition hover:bg-zinc-800"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-zinc-100">Chiropractic</div>
                        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                          Book your initial exam to get adjusted at The Life Center. Vitalistic philosophy with a scientific approach. Click here to book an exam and see the details of your first visit.
                        </p>
                      </div>
                      <div className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                        <HeartPulse className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
                      <span className="underline underline-offset-4 decoration-zinc-300 group-hover:decoration-zinc-700 transition">
                        Book
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500" />
                    </div>
                  </a>

                  {[
                    {
                      title: "Concierge wellness",
                      desc: "Assessment-led care focused on mechanics, nervous system load, and clean execution. An assortment of practices from myofascial release and exercise science, to reflexology and postural restoration, catered to your needs.",
                      href: LINKS.bookingsChiro,
                      icon: HeartPulse,
                      tag: "Unique approach",
                      disabled: false,
                    },
                    {
                      title: "Concierge stretch sessions",
                      desc: "Guided assisted stretching to restore range and reduce tone — delivered by vetted practitioners.",
                      href: LINKS.bookingsStretch,
                      icon: Activity,
                      tag: "Vetted team",
                      disabled: false,
                    },
                    
                    {
                      title: "Public speaking and performances",
                      desc: "Keynotes, talks, workshops, and performance inquiries.",
                      href: "#contact",
                      icon: Video,
                      tag: "Inquiries",
                      disabled: false,
                    },
                  ].map((s) => {
                    const ServiceIcon = s.icon;
                    const cardHref = s.disabled ? "#contact" : s.href;
                    return (
                      <a
                        key={s.title}
                        href={cardHref}
                        {...ExternalProps({ href: cardHref })}
                        className={`group rounded-2xl border border-zinc-800 px-4 py-4 text-sm transition ${
                          s.disabled ? "bg-zinc-800 text-zinc-500 hover:bg-zinc-800" : "bg-zinc-900 hover:bg-zinc-800"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="font-semibold text-zinc-100">{s.title}</div>
                              <span className="text-[11px] px-2 py-0.5 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-300">
                                {s.tag}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                          </div>
                          <div className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                            <ServiceIcon className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
                          <span className="underline underline-offset-4 decoration-zinc-300 group-hover:decoration-zinc-700 transition">
                            {s.disabled ? "Join waitlist" : "Book"}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-zinc-500" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-sm font-semibold">Booking page embed</div>
                    <p className="mt-1 text-sm text-zinc-400">Paste your Google “Website embed” URL below.</p>
                  </div>
                  <a
                    href={LINKS.bookingsAll}
                    {...ExternalProps({ href: LINKS.bookingsAll })}
                    className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                  >
                    Open full booking page
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-5 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800">
                  {isLikelyUrl(LINKS.bookingsAll) ? (
                    <iframe title="Bookings" src={LINKS.bookingsAll} width="100%" height={900} frameBorder={0} />
                  ) : (
                    <div className="p-6 text-sm text-zinc-400">
                      Paste a valid Google booking embed URL into <span className="text-zinc-200">LINKS.bookingsAll</span> to enable the embed.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Section>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-14">
          <Section
            id="artist"
            eyebrow="ARTIST"
            title="Music, art, essays, videos"
            subtitle="A clean hub for releases and writing — sharp, minimal, and easy to navigate."
          >
            <div className="grid md:grid-cols-3 gap-5">
              <MiniActionCard
                title="Music & Videos"
                desc="Music releases, visual work, and filmed pieces — cinematic, direct, and human."
                onClick={() => openArtist("music")}
                icon={Video}
              />
              <MiniActionCard
                title="Prose & Poetry"
                desc="Essays, short prose, and poetry exploring health, systems, and meaning."
                onClick={() => openArtist("prose")}
                icon={PenLine}
              />
              <MiniActionCard
                title="Journal"
                desc="Essays and newsletters — composed writing from the work."
                onClick={() => openArtist("photos")}
                icon={NotebookPen}
              />
            </div>

            <div className="mt-7 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-sm font-semibold">Gallery / grid (optional)</div>
                  <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
                    Use a simple grid of 6–12 tiles for cover art, still frames, or essay cards. Keep it editorial.
                  </p>
                </div>
                <a
                  href={LINKS.worksHub}
                  {...ExternalProps({ href: LINKS.worksHub })}
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm hover:bg-zinc-800 transition"
                >
                  View all works
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl border border-zinc-800 bg-zinc-800"
                    title="Replace with cover art thumbnails"
                  />
                ))}
              </div>
            </div>
          </Section>
        </div>

        <div className="py-12 sm:py-14 bg-zinc-800/60 border-y border-zinc-800/70">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <Section
              id="essays"
              eyebrow="JOURNAL"
              title="Journal."
              subtitle="Short entries, longer essays, and notes from the work. Open, skim, and move through it without leaving the page."
            >
              <div className="grid gap-4">
                {posts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      closeArtist();
                      closeEntrepreneur();
                      setActivePostId(p.id);
                    }}
                    className="text-left group rounded-3xl border border-zinc-800 bg-zinc-900 p-6 hover:bg-zinc-800 transition shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{p.label}</div>
                        <div className="mt-2 text-lg font-semibold text-zinc-100">{p.title}</div>
                        <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-3xl">{p.excerpt}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-sky-300 transition" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 flex-wrap">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm hover:bg-zinc-800 transition"
                >
                  Share an idea
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <div className="text-xs text-zinc-500">(These entries open in a popup so you can skim fast.)</div>
              </div>
            </Section>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-14">
          <Section id="contact" eyebrow="CONTACT" title="Get in touch" subtitle="For chiropractic care, collaborations, creative work, or GAIA NOVA inquiries.">
            <div className="grid lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
                <div className="text-sm font-semibold">Message</div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Replace this form with your preferred solution (Formspree, Tally, HubSpot, or a simple mailto).
                </p>
                <form
                  className="mt-5 grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Wire this form to your backend or form provider.");
                  }}
                >
                  <input
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-300/20 focus:border-sky-400/20"
                    placeholder="Name"
                    required
                  />
                  <input
                    type="email"
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-300/20 focus:border-sky-400/20"
                    placeholder="Email"
                    required
                  />
                  <textarea
                    className="min-h-[120px] rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-300/20 focus:border-sky-400/20"
                    placeholder="What are you reaching out about?"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-300 text-zinc-900 px-5 py-3 text-sm hover:bg-sky-200 transition"
                  >
                    Send
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <p className="mt-2 text-xs text-zinc-500">*Filling this form will add you to the GAIA NOVA and DWB newsletters.</p>
                </form>
              </div>

              <div className="lg:col-span-5 grid gap-4">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
                  <div className="text-sm font-semibold">Direct</div>
                  <div className="mt-3 grid gap-2">
                    <a
                      href={`mailto:${LINKS.email}`}
                      className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-zinc-400" />
                        {LINKS.email}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-sky-300 transition" />
                    </a>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
                  <div className="text-sm font-semibold">Social</div>
                  <div className="mt-3 grid gap-2">
                    <a
                      href={LINKS.instagram}
                      {...ExternalProps({ href: LINKS.instagram })}
                      className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-zinc-400" />
                        Instagram
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-sky-300 transition" />
                    </a>
                    <a
                      href={LINKS.linkedin}
                      {...ExternalProps({ href: LINKS.linkedin })}
                      className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-zinc-400" />
                        LinkedIn
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-sky-300 transition" />
                    </a>
                    <a
                      href={LINKS.youtube}
                      {...ExternalProps({ href: LINKS.youtube })}
                      className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm hover:bg-zinc-700 transition"
                    >
                      <span className="flex items-center gap-2">
                        <Youtube className="h-4 w-4 text-zinc-400" />
                        YouTube
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-sky-300 transition" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <footer className="border-t border-zinc-800/70 py-10">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-zinc-400">© {new Date().getFullYear()} David W. Black</div>
            <div className="text-xs text-zinc-500 text-center">📍 Venice, CA</div>
            <div className="text-sm text-zinc-400">The New Earth is Here.</div>
          </div>
        </footer>

        <AnimatePresence>{activePost && <JournalModal post={activePost} onClose={() => setActivePostId(null)} />}</AnimatePresence>

        <AnimatePresence>
          {activeArtist && (
            <ArtistModal
              panel={activeArtist}
              minimized={artistMinimized}
              onMinimize={() => setArtistMinimized(true)}
              onRestore={() => setArtistMinimized(false)}
              onClose={closeArtist}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeEntrepreneur && (
            <EntrepreneurModal
              panel={activeEntrepreneur}
              minimized={entrepreneurMinimized}
              onMinimize={() => setEntrepreneurMinimized(true)}
              onRestore={() => setEntrepreneurMinimized(false)}
              onClose={closeEntrepreneur}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
