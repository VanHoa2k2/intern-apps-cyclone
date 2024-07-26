import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import box from "@/assets/image/box.png";
import delivery from "@/assets/image/delivery-truck.png";
import hours from "@/assets/image/24-hours.png";
import shield from "@/assets/image/shield.png";

const DiscountCard = () => {
  const { t } = useTranslation();
  return (
    <div
      className="px-[50px] py-[30px] lg:py-[70px] bg-[#fff] flex flex-wrap lg:flex-nowrap gap-8 lg:gap-0 justify-between rounded-[12px]"
      style={{ boxShadow: "0px 24px 100px 0px rgba(22, 25, 50, 0.07)" }}
    >
      <div className="flex items-center gap-4">
        <Image src={box} alt="box" width={46} height={46} loading="lazy" />
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
        <Image
          src={delivery}
          alt="delivery"
          width={46}
          height={46}
          loading="lazy"
        />
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
        <Image src={hours} alt="hours" width={46} height={46} loading="lazy" />
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
        <Image
          src={shield}
          alt="shield"
          width={46}
          height={46}
          loading="lazy"
        />
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
  );
};

export default DiscountCard;
