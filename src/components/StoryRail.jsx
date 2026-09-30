import { useEffect, useMemo, useRef, useState } from "react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { categories, stories } from "../data/stories.js";
import { filterStories, readCarouselState, resolveStoryId, writeCarouselState } from "../lib/carouselState.js";

function updateBrowserUrl(category, storyId) {
  const nextSearch = writeCarouselState(window.location.search, { category, storyId });
  const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
  window.history.replaceState(null, "", nextUrl);
}

export function StoryRail() {
  const initialState = useMemo(
    () => readCarouselState(window.location.search, stories, categories),
    []
  );
  const [category, setCategory] = useState(initialState.category);
  const [activeId, setActiveId] = useState(initialState.storyId);
  const swiperRef = useRef(null);

  const visibleStories = useMemo(() => filterStories(stories, category), [category]);
  const activeIndex = Math.max(0, visibleStories.findIndex((story) => story.id === activeId));
  const activeStory = visibleStories[activeIndex] || visibleStories[0];

  useEffect(() => {
    const validId = resolveStoryId(visibleStories, activeId);
    if (validId !== activeId) setActiveId(validId);
  }, [activeId, visibleStories]);

  useEffect(() => {
    if (activeStory) updateBrowserUrl(category, activeStory.id);
  }, [activeStory, category]);

  function selectCategory(nextCategory) {
    if (nextCategory === category) return;
    const nextStories = filterStories(stories, nextCategory);
    setCategory(nextCategory);
    setActiveId(nextStories[0]?.id || "");
  }

  function handleSwiper(swiper) {
    swiperRef.current = swiper;
  }

  useEffect(() => {
    if (!swiperRef.current || !activeStory) return;
    const nextIndex = visibleStories.findIndex((story) => story.id === activeStory.id);
    if (nextIndex >= 0 && swiperRef.current.activeIndex !== nextIndex) {
      swiperRef.current.slideTo(nextIndex, 0);
    }
  }, [activeStory, visibleStories]);

  return (
    <main className="shell" id="storyrail">
      <header className="hero">
        <div>
          <p className="eyebrow">React · Swiper · interaction architecture</p>
          <h1>StoryRail</h1>
          <p className="hero__copy">
            A focused carousel lab for responsive density, keyboard access, reduced motion, and URL-backed interaction state.
          </p>
        </div>
        <aside className="hero__note" aria-label="Project scope">
          <strong>Scope boundary</strong>
          This is a front-end interaction demo. It has no backend, analytics, account system, or fake commerce flow.
        </aside>
      </header>

      <section className="control-panel" aria-labelledby="filter-title">
        <div>
          <p className="eyebrow">View</p>
          <h2 id="filter-title">Filter the interaction stories</h2>
        </div>
        <div className="filter-group" aria-label="Story categories">
          {categories.map((item) => (
            <button
              className="filter-button"
              data-active={category === item}
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => selectCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="rail" aria-label="Carousel interaction stories">
        <div className="rail__meta" aria-live="polite">
          <span>{visibleStories.length} stories</span>
          <span>{activeStory ? `${activeIndex + 1} / ${visibleStories.length}` : "0 / 0"}</span>
        </div>

        <Swiper
          key={category}
          modules={[A11y, Keyboard, Navigation, Pagination]}
          onSwiper={handleSwiper}
          onSlideChange={(swiper) => setActiveId(visibleStories[swiper.activeIndex]?.id || activeId)}
          initialSlide={activeIndex}
          navigation
          keyboard={{ enabled: true, onlyInViewport: true }}
          pagination={{ clickable: true, dynamicBullets: true }}
          watchOverflow
          grabCursor
          spaceBetween={18}
          slidesPerView={1.08}
          breakpoints={{
            640: { slidesPerView: 1.65, spaceBetween: 20 },
            960: { slidesPerView: 2.4, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 28 }
          }}
          a11y={{
            enabled: true,
            containerMessage: "StoryRail interaction carousel",
            prevSlideMessage: "Previous interaction story",
            nextSlideMessage: "Next interaction story",
            slideLabelMessage: "{{index}} of {{slidesLength}}"
          }}
        >
          {visibleStories.map((story, index) => (
            <SwiperSlide key={story.id}>
              <article className={`story-card story-card--${story.tone}`} aria-labelledby={`story-${story.id}`}>
                <div className="story-card__visual" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i />
                  <i />
                  <i />
                </div>
                <div className="story-card__content">
                  <div className="story-card__topline">
                    <span>{story.eyebrow}</span>
                    <span>{story.category}</span>
                  </div>
                  <h3 id={`story-${story.id}`}>{story.title}</h3>
                  <p>{story.summary}</p>
                  <dl>
                    <div>
                      <dt>Signal</dt>
                      <dd>{story.metric}</dd>
                    </div>
                    <div>
                      <dt>Implementation</dt>
                      <dd>{story.note}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div>
          <p className="eyebrow">Engineering angle</p>
          <h2 id="principles-title">The carousel is a stateful control, not decoration.</h2>
        </div>
        <div className="principles__grid">
          <article><strong>01</strong><h3>State</h3><p>Category and active story have explicit recovery rules and a shareable URL representation.</p></article>
          <article><strong>02</strong><h3>Access</h3><p>Keyboard navigation, semantic cards, focus visibility, and Swiper A11y messages are part of the core flow.</p></article>
          <article><strong>03</strong><h3>Motion</h3><p>No autoplay competes for attention, and reduced-motion preferences remove decorative animation.</p></article>
          <article><strong>04</strong><h3>Scope</h3><p>No backend, fake API, or unnecessary state library was added to make a small interaction demo sound larger.</p></article>
        </div>
      </section>
    </main>
  );
}
