import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>
}));

vi.mock("swiper/modules", () => ({ A11y: {}, Keyboard: {}, Navigation: {}, Pagination: {} }));
vi.mock("swiper/css", () => ({}));
vi.mock("swiper/css/a11y", () => ({}));
vi.mock("swiper/css/navigation", () => ({}));
vi.mock("swiper/css/pagination", () => ({}));

import App from "./App.jsx";

describe("StoryRail UI", () => {
  it("renders the project scope and all stories by default", () => {
    window.history.replaceState(null, "", "/");
    render(<App />);

    expect(screen.getByRole("heading", { name: "StoryRail", level: 1 })).toBeTruthy();
    expect(screen.getByText("6 stories")).toBeTruthy();
    expect(screen.getByText("Focus should travel with intent")).toBeTruthy();
  });

  it("filters stories and updates the URL state", () => {
    window.history.replaceState(null, "", "/?ref=test");
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "state" }));

    expect(screen.getByText("2 stories")).toBeTruthy();
    expect(screen.queryByText("Focus should travel with intent")).toBeNull();
    expect(window.location.search).toContain("category=state");
    expect(window.location.search).toContain("story=deep-link-state");
    expect(window.location.search).toContain("ref=test");
  });
});
