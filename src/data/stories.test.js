import { describe, expect, it } from "vitest";
import { categories, stories } from "./stories.js";

describe("story content contract", () => {
  it("uses unique stable story ids", () => {
    const ids = stories.map((story) => story.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps every story in a declared category", () => {
    expect(stories.every((story) => categories.includes(story.category))).toBe(true);
  });

  it("provides portfolio-facing content fields for every story", () => {
    for (const story of stories) {
      expect(story.title.trim().length).toBeGreaterThan(0);
      expect(story.summary.trim().length).toBeGreaterThan(40);
      expect(story.metric.trim().length).toBeGreaterThan(0);
      expect(story.note.trim().length).toBeGreaterThan(0);
    }
  });
});
