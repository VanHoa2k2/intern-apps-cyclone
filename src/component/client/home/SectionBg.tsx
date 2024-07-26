"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/client.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import productImage from "@/assets/image/Product Image.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import DiscountCard from "./DiscountCard";

const SectionBg = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const leftVariants = {
    hidden: { opacity: 0, x: -110 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 110 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <div className="relative">
      <div className={styles["section-bg"]}>
        <div
          className={`${styles["container"]} flex items-center lg:gap-[133px]`}
        >
          <motion.div
            className="flex flex-col lg:w-[631px] lg:height-[323px] items-center lg:items-start"
            initial="hidden"
            animate="visible"
            variants={leftVariants}
          >
            <p className="text-[#272343] tracking-[1.68px] uppercase text-[14px] font-normal">
              {t("Welcome to chairy")}
            </p>
            <h1 className="font-bold text-[68px] leading-[110%] capitalize mt-2 text-center lg:text-start">
              {t("Best Furniture Collection for your interior.")}
            </h1>
            <button
              onClick={() => router.push("/shop")}
              className="ml-auto lg:ml-0 mr-auto mt-[38px] px-6 py-[14px] rounded-lg text-center bg-[#029FAE] text-[16px] font-semibold leading-[110%] text-[#fff]"
            >
              <span className="mr-5">{t("Shop Now")}</span>{" "}
              <ArrowRightOutlined />
            </button>
          </motion.div>

          <motion.div
            className="hidden lg:block relative w-[475px] h-[649px]"
            initial="hidden"
            animate="visible"
            variants={rightVariants}
          >
            <div className="relative z-10">
              <Image
                src={productImage}
                alt="Hero image"
                width={475}
                height={649}
                priority
                loading="eager"
                quality={75}
              />
              <div className="absolute top-0 right-[-40px] w-[140px] h-[124px] ">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="140"
                    height="124"
                    viewBox="0 0 140 124"
                    fill="none"
                  >
                    <path
                      d="M126.833 25.5452C139.793 42.9462 144.835 69.6385 134.363 89.7534C123.924 109.868 98.0042 123.406 71.0176 123.981C44.0635 124.555 16.0751 112.231 5.34509 91.9565C-5.38487 71.6819 1.14359 43.4571 15.1378 25.5133C29.132 7.53755 50.5919 -0.157211 71.761 0.00243103C92.9624 0.162073 113.841 8.17612 126.833 25.5452Z"
                      fill="white"
                    />
                  </svg>
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
                    <span className="text-center text-[36px] font-bold text-[#F05C52] leading-[110%]">
                      54%
                    </span>
                    <span className="text-[14px] leading-[110%] tracking-[0.28px]">
                      {t("Discount")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block absolute top-0 w-[700px] h-[700px] bg-[#E1E3E5] rounded-[50%] translate-x-[-146px] translate-y-[-200px]"></div>
          </motion.div>
        </div>
      </div>
      <div className="lg:absolute bottom-0 ml-auto mr-auto lg:translate-y-[50%] w-full">
        <div className={styles["container"]}>
          <DiscountCard />
        </div>
      </div>
    </div>
  );
};

export default memo(SectionBg);
