import React, { useRef } from "react";
import styles from "@/styles/client.module.scss";
import { useTranslation } from "react-i18next";
import image1 from "@/assets/image/Image1.png";
import image2 from "@/assets/image/Image2.png";
import image3 from "@/assets/image/Image3.png";
import image4 from "@/assets/image/Image4.png";
import image5 from "@/assets/image/Image5.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { isMobile } from "react-device-detect";

const SectionTopCategory = () => {
  const { t } = useTranslation();

  const swiperRef = useRef<any>(null);

  const backgroundImage1 = {
    backgroundImage: `url(${image1.src})`,
    backgroundColor: "lightgray",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const backgroundImage2 = {
    backgroundImage: `url(${image2.src})`,
    backgroundColor: "lightgray",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const backgroundImage3 = {
    backgroundImage: `url(${image3.src})`,
    backgroundColor: "lightgray",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const backgroundImage4 = {
    backgroundImage: `url(${image4.src})`,
    backgroundColor: "lightgray",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const backgroundImage5 = {
    backgroundImage: `url(${image5.src})`,
    backgroundColor: "lightgray",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

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
    <div className={`${styles["container"]} my-[60px]`}>
      <div className="flex justify-between items-center mb-[45px]">
        <div className="text-[32px] font-semibold leading-[110px]">
          {t("Top categories")}
        </div>
        <div className="flex items-center gap-[18px]">
          <div
            className="w-[44px] h-[44px] rounded-[26px] bg-[#F0F2F3] flex justify-center items-center
             text-[24px] cursor-pointer transition-all duration-300 hover:bg-[#007580] hover:text-[#F0F2F3]"
            onClick={() => handlePrevClick()}
          >
            <IoIosArrowRoundBack />
          </div>
          <div
            className="w-[44px] h-[44px] rounded-[26px] bg-[#F0F2F3] flex justify-center items-center
             text-[24px] cursor-pointer transition-all duration-300 hover:bg-[#007580] hover:text-[#F0F2F3]"
            onClick={() => handleNextClick()}
          >
            <IoIosArrowRoundForward />
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={isMobile ? 1 : 3}
        spaceBetween={24}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        modules={[Navigation, Autoplay]}
        className="swiper-container rounded-xl"
        ref={swiperRef}
      >
        <SwiperSlide>
          <div
            className="w-[410px] h-[410px] rounded-xl flex flex-col justify-end"
            style={backgroundImage1}
          >
            <div className="flex gap-2 p-5 flex-col items-start bg-black-70 text-[#fff] rounded-b-xl">
              <div className="text-[20px] font-semibold leading-[110%]">
                Wing Chair
              </div>
              <div className="text-[14px] leading-[110%]">3,584 Products</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-[410px] h-[410px] rounded-xl flex flex-col justify-end"
            style={backgroundImage2}
          >
            <div className="flex gap-2 p-5 flex-col items-start bg-black-70 text-[#fff] rounded-b-xl">
              <div className="text-[20px] font-semibold leading-[110%]">
                Wooden Chair
              </div>
              <div className="text-[14px] leading-[110%]">157 Products</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-[410px] h-[410px] rounded-xl flex flex-col justify-end"
            style={backgroundImage3}
          >
            <div className="flex gap-2 p-5 flex-col items-start bg-black-70 text-[#fff] rounded-b-xl">
              <div className="text-[20px] font-semibold leading-[110%]">
                Desk Chair
              </div>
              <div className="text-[14px] leading-[110%]">184 Products</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-[410px] h-[410px] rounded-xl flex flex-col justify-end"
            style={backgroundImage4}
          >
            <div className="flex gap-2 p-5 flex-col items-start bg-black-70 text-[#fff] rounded-b-xl">
              <div className="text-[20px] font-semibold leading-[110%]">
                Park Bench
              </div>
              <div className="text-[14px] leading-[110%]">154 Products</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-[410px] h-[410px] rounded-xl flex flex-col justify-end"
            style={backgroundImage5}
          >
            <div className="flex gap-2 p-5 flex-col items-start bg-black-70 text-[#fff] rounded-b-xl">
              <div className="text-[20px] font-semibold leading-[110%]">
                Park Bench
              </div>
              <div className="text-[14px] leading-[110%]">154 Products</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SectionTopCategory;
