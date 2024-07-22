import React from "react";
import styles from "@/styles/client.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import productImage from "@/assets/image/Product Image.png";
import box from "@/assets/image/box.png";
import delivery from "@/assets/image/delivery-truck.png";
import hours from "@/assets/image/24-hours.png";
import shield from "@/assets/image/shield.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const SectionBg = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className={styles["section-bg"]}>
        <div
          className={`${styles["container"]} flex items-center lg:gap-[133px]`}
        >
          <div className="flex flex-col lg:w-[631px] lg:height-[323px] items-center lg:items-start">
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
          </div>

          <div className="hidden lg:block relative w-[475px] h-[649px]">
            <div className="relative z-10">
              <Image
                src={productImage}
                alt="Hero image"
                width={475}
                height={649}
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
          </div>
        </div>
      </div>
      <div className="lg:absolute bottom-0 ml-auto mr-auto lg:translate-y-[50%] w-full">
        <div className={styles["container"]}>
          <div
            className="px-[50px] py-[30px] lg:py-[70px] bg-[#fff] flex flex-wrap gap-8 lg:gap-0 justify-between rounded-[12px]"
            style={{ boxShadow: "0px 24px 100px 0px rgba(22, 25, 50, 0.07)" }}
          >
            <div className="flex items-center gap-4">
              <Image src={box} alt="box" width={46} height={46} />
              <div>
                <div className="text-[18px] font-medium leading-[110%]">
                  {t("Discount")}
                </div>
                <div className="text-[15px] text-[#9A9CAA] font-normal">
                  {t("Every week new sales")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image src={delivery} alt="box" width={46} height={46} />
              <div>
                <div className="text-[18px] font-medium leading-[110%]">
                  {t("Free Delivery")}
                </div>
                <div className="text-[15px] text-[#9A9CAA] font-normal">
                  {t("100% Free for all orders")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image src={hours} alt="box" width={46} height={46} />
              <div>
                <div className="text-[18px] font-medium leading-[110%]">
                  {t("Great Support 24/7")}
                </div>
                <div className="text-[15px] text-[#9A9CAA] font-normal">
                  {t("We care your experiences")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image src={shield} alt="box" width={46} height={46} />
              <div>
                <div className="text-[18px] font-medium leading-[110%]">
                  {t("Secure Payment")}
                </div>
                <div className="text-[15px] text-[#9A9CAA] font-normal">
                  {t("100% Secure Payment Methods")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBg;
