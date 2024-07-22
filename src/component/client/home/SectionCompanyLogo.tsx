import React from "react";
import styles from "@/styles/client.module.scss";
import Image from "next/image";
import logo from "@/assets/image/Logo.png";
import logo1 from "@/assets/image/Logo (1).png";
import logo2 from "@/assets/image/Logo (2).png";
import logo3 from "@/assets/image/Logo (3).png";
import logo4 from "@/assets/image/Logo (4).png";
import logo5 from "@/assets/image/Logo (5).png";
import logo6 from "@/assets/image/Logo (6).png";

const SectionCompanyLogo = () => {
  return (
    <div className={`${styles["container"]} mt-[40px] lg:mt-[100px]`}>
      <div className="flex flex-wrap justify-between items-center">
        <Image src={logo} alt="Văn Hòa" width={85} height={87} />
        <Image src={logo1} alt="Văn Hòa" width={107} height={109} />
        <Image src={logo2} alt="Văn Hòa" width={135} height={139} />
        <Image src={logo3} alt="Văn Hòa" width={63} height={65} />
        <Image src={logo4} alt="Văn Hòa" width={98} height={101} />
        <Image src={logo5} alt="Văn Hòa" width={113} height={115} />
        <Image src={logo6} alt="Văn Hòa" width={84} height={87} />
      </div>
    </div>
  );
};

export default SectionCompanyLogo;
