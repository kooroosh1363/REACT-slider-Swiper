export const stories = Object.freeze([
  {
    id: "focus-order",
    category: "accessibility",
    eyebrow: "Keyboard systems",
    title: "Focus should travel with intent",
    summary: "Navigation controls, slide labels, and visible focus states make a carousel understandable without relying on pointer gestures.",
    metric: "4 controls",
    note: "Keyboard + A11y modules",
    tone: "sage"
  },
  {
    id: "reduced-motion",
    category: "accessibility",
    eyebrow: "Motion policy",
    title: "Reduced motion is a product state",
    summary: "The interface removes decorative transitions when the operating system requests less motion instead of treating accessibility as an afterthought.",
    metric: "0 auto-play",
    note: "User-controlled movement",
    tone: "clay"
  },
  {
    id: "responsive-density",
    category: "responsive",
    eyebrow: "Viewport logic",
    title: "Density adapts before content breaks",
    summary: "Breakpoints change visible card count and spacing while keeping the reading order and interaction model consistent across small and large screens.",
    metric: "3 layouts",
    note: "1 → 2 → 3 cards",
    tone: "blue"
  },
  {
    id: "deep-link-state",
    category: "state",
    eyebrow: "URL state",
    title: "A selected story can be shared",
    summary: "Category and active story are mirrored into query parameters so refreshes and copied URLs restore meaningful carousel context.",
    metric: "2 params",
    note: "category + story",
    tone: "violet"
  },
  {
    id: "state-recovery",
    category: "state",
    eyebrow: "Defensive state",
    title: "Invalid URLs recover predictably",
    summary: "Unknown categories or slide identifiers resolve to safe defaults instead of leaving the carousel empty or out of sync with its controls.",
    metric: "Deterministic",
    note: "Pure state policy",
    tone: "amber"
  },
  {
    id: "content-contract",
    category: "architecture",
    eyebrow: "Data contract",
    title: "Content is data, not markup duplication",
    summary: "Slides are generated from a small typed-by-convention data model, keeping presentation concerns separate from filtering and URL-state rules.",
    metric: "1 source",
    note: "Reusable card model",
    tone: "rose"
  }
]);

export const categories = Object.freeze(["all", "accessibility", "responsive", "state", "architecture"]);
