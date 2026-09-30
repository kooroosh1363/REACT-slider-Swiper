import { describe, expect, it } from "vitest";
import { categories, stories } from "../data/stories.js";
import { filterStories, normalizeCategory, readCarouselState, resolveStoryId, writeCarouselState } from "./carouselState.js";

describe("carousel state policy", () => {
  it("normalizes unknown categories to all", () => {
    expect(normalizeCategory("unknown", categories)).toBe("all");
  });

  it("filters stories without mutating the source collection", () => {
    const filtered = filterStories(stories, "state");
    expect(filtered.map((story) => story.id)).toEqual(["deep-link-state", "state-recovery"]);
    expect(stories).toHaveLength(6);
  });

  it("resolves unknown story ids to the first visible story", () => {
    const visible = filterStories(stories, "accessibility");
    expect(resolveStoryId(visible, "missing")).toBe("focus-order");
  });

  it("reads valid category and story values from the URL", () => {
    expect(readCarouselState("?category=state&story=state-recovery", stories, categories)).toEqual({
      category: "state",
      storyId: "state-recovery"
    });
  });

  it("recovers when the requested story is outside the selected category", () => {
    expect(readCarouselState("?category=state&story=focus-order", stories, categories)).toEqual({
      category: "state",
      storyId: "deep-link-state"
    });
  });

  it("writes compact URL state and preserves unrelated query parameters", () => {
    expect(writeCarouselState("?ref=portfolio", { category: "all", storyId: "focus-order" })).toBe("?ref=portfolio&story=focus-order");
  });

  it("removes carousel params when state is cleared", () => {
    expect(writeCarouselState("?category=state&story=deep-link-state", { category: "all", storyId: "" })).toBe("");
  });
});
