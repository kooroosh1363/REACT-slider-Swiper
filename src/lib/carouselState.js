export function normalizeCategory(value, categories) {
  return categories.includes(value) ? value : "all";
}

export function filterStories(stories, category) {
  return category === "all" ? stories : stories.filter((story) => story.category === category);
}

export function resolveStoryId(stories, requestedId) {
  if (!stories.length) return "";
  return stories.some((story) => story.id === requestedId) ? requestedId : stories[0].id;
}

export function readCarouselState(search, stories, categories) {
  const params = new URLSearchParams(search);
  const category = normalizeCategory(params.get("category") || "all", categories);
  const visibleStories = filterStories(stories, category);
  const storyId = resolveStoryId(visibleStories, params.get("story"));
  return { category, storyId };
}

export function writeCarouselState(search, nextState) {
  const params = new URLSearchParams(search);

  if (nextState.category && nextState.category !== "all") params.set("category", nextState.category);
  else params.delete("category");

  if (nextState.storyId) params.set("story", nextState.storyId);
  else params.delete("story");

  const next = params.toString();
  return next ? `?${next}` : "";
}
