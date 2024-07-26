"use client";

import React, { useRef } from "react";
import avatar from "@/assets/image/Image-avatar.png";
import avatar1 from "@/assets/image/Image-avatar1.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { isMobile } from "react-device-detect";
import styles from "@/styles/client.module.scss";

const SectionTestimonial = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<any>(null);

  const testimonials = [
    {
      id: 1,
      text: `"Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Vivamus Sit Amet Mi Nec Massa Tincidunt Blandit Et Eu Sem. Maecenas Laoreet Ultrices Diam Dignissim Posuere. Aenean Ultrices Dui At Ipsum Sagittis, Pharetra Lacinia Dui Faucibus. In Ac Bibendum Ex. Aenean Dolor Massa, EuisMod Sit Amet Suscipit Et"`,
      name: "Kristin Watson",
      position: "Fashion Designer",
      image: avatar,
    },
    {
      id: 2,
      text: `"Nullam Sapien Elit, Dignissim Eu Viverra Et, Scelerisque Et Felis. Aliquam Egestas Dui Elit, Quis Tincidunt Lacus Aliquam Et. Duis Nulla Velit, Dignissim Ut Odio Ac, Eleifend Luctus Leo. Ut Ac Imperdiet Velit. Aliquam Semper Ex In Volutpat Rutrum."`,
      name: "Esther Howard",
      position: "Fashion Designer",
      image: avatar1,
    },
    {
      id: 3,
      text: `"Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Vivamus Sit Amet Mi Nec Massa Tincidunt Blandit Et Eu Sem. Maecenas Laoreet Ultrices Diam Dignissim Posuere. Aenean Ultrices Dui At Ipsum Sagittis, Pharetra Lacinia Dui Faucibus. In Ac Bibendum Ex. Aenean Dolor Massa, EuisMod Sit Amet Suscipit Et"`,
      name: "Kristin Watson",
      position: "Fashion Designer",
      image: avatar,
    },
    {
      id: 4,
      text: `"Nullam Sapien Elit, Dignissim Eu Viverra Et, Scelerisque Et Felis. Aliquam Egestas Dui Elit, Quis Tincidunt Lacus Aliquam Et. Duis Nulla Velit, Dignissim Ut Odio Ac, Eleifend Luctus Leo. Ut Ac Imperdiet Velit. Aliquam Semper Ex In Volutpat Rutrum."`,
      name: "Esther Howard",
      position: "Fashion Designer",
      image: avatar1,
    },
  ];

  const handlePrevClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="py-[80px] bg-[#F0F2F3]">
      <div className={styles["container"]}>
        <div className="flex justify-between items-center gap-2 lg:gap-0 mb-[45px] lg:mx-0">
          <h2 className="text-4xl font-semibold">
            {t("What Client Says About Us")}
          </h2>
          <div className="flex items-center gap-[18px]">
            <div
              className="w-[44px] h-[44px] rounded-[26px] bg-[#fff] flex justify-center items-center
             text-[24px] cursor-pointer transition-all duration-300 hover:bg-[#007580] hover:text-[#fff]"
              onClick={() => handlePrevClick()}
            >
              <IoIosArrowRoundBack />
            </div>
            <div
              className="w-[44px] h-[44px] rounded-[26px] bg-[#fff] flex justify-center items-center
             text-[24px] cursor-pointer transition-all duration-300 hover:bg-[#007580] hover:text-[#fff]"
              onClick={() => handleNextClick()}
            >
              <IoIosArrowRoundForward />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={isMobile ? 1 : 2}
          spaceBetween={30}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Navigation, Autoplay]}
          className="swiper-container rounded-lg"
          ref={swiperRef}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start 
              justify-between w-auto lg:w-[560px] h-[320px] lg:h-[230px] lg:mx-0"
              >
                <p className="text-lg mb-4 pl-[24px] border-l-2 border-[#029FAE] h-[224px] lg:h-auto overflow-y-auto lg:overflow-y-hidden">
                  {testimonial.text}
                </p>
                <div className="flex items-center mt-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SectionTestimonial;
