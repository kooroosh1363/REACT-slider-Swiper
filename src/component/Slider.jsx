import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export const Slider = ({ slides }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y,EffectCoverflow]}
            spaceBetween={50}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            effect={'coverflow'}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.image}>
                    <img src={slide.image} alt={slide.title} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider;
