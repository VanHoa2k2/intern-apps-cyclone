import { useAppSelector } from "@/redux/hook";
import styles from "@/styles/client.module.scss";
import { ICategory } from "@/types/backend";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategory } from "@/redux/slice/categorySlice";

interface IProps {
  t: (key: string) => string;
}

const Footer = (props: IProps) => {
  const { t } = props;
  const categories = useAppSelector((state) => state?.category?.result);
  const year = new Date().getFullYear();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory(`page=1&offset=10`));
  }, [dispatch]);

  const iconSocial = [
    {
      id: 1,
      icon: <FaFacebook className="w-4 h-4" />,
    },
    {
      id: 2,
      icon: <FaTwitter />,
    },
    {
      id: 3,
      icon: <FaInstagram />,
    },
    {
      id: 4,
      icon: <FaPinterest />,
    },
    {
      id: 5,
      icon: <FaYoutube />,
    },
  ];

  return (
    <footer>
      <div className="border-y border-solid border-[#E1E3E5] pt-[40px] lg:pt-[80px] pb-[60px]">
        <div
          className={`${styles["container"]} flex justify-between flex-wrap gap-10 lg:gap-0`}
        >
          <div className="flex flex-col gap-6 items-center lg:items-start w-full lg:w-auto">
            <Link href={"/"} className="flex items-center gap-2">
              <Image src={logo} alt="logo" width={40} height={40} />
              <div className="text-[26px] font-medium leading-[120%]">
                Comforty
              </div>
            </Link>
            <p className="w-[350px] text-[16px] leading-6 opacity-60">
              Vivamus tristique odio sit amet velit semper, eu posuere turpis
              interdum. Cras egestas purus{" "}
            </p>
            <div className="flex items-center gap-1 h-10">
              {iconSocial.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-center items-center w-[38px] h-[38px] rounded-[50%] transition-all duration-300
                  hover:border hover:border-solid hover:border-[#007580] hover:text-[#007580]"
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[#9A9CAA] text-[14px] font-medium leading-[110%] tracking-[0.84px] uppercase mb-5">
              {t("Category")}
            </div>
            <div className="flex flex-col gap-3">
              {categories.map((category: ICategory) => (
                <div key={category.id} className="text-[16px] leading-[21px]">
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[#9A9CAA] text-[14px] font-medium leading-[110%] tracking-[0.84px] uppercase mb-5">
              {t("Support")}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[16px] leading-[21px]">
                {t("Help & Support")}
              </div>
              <div className="text-[16px] leading-[21px]">
                {t("Terms & Conditions")}
              </div>
              <div className="text-[16px] leading-[21px]">
                {t("Privacy Policy")}
              </div>
              <div className="text-[16px] leading-[21px]">{t("Help")}</div>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-[424px]">
            <div className="text-[#9A9CAA] text-[14px] font-medium leading-[110%] tracking-[0.84px] uppercase mb-2 lg:mb-5">
              {t("Newsletter")}
            </div>
            <div className="flex items-center gap-3 mt-2 lg:mt-5 mb-[15px]">
              <input
                className="w-[285px] h-[46px] rounded-lg border border-solid border-[#E1E3E5] pl-5 text-[16px]"
                type="text"
                placeholder={t("Your email")}
              />
              <button className="py-[12px] px-[24px] rounded-lg flex justify-center items-center bg-[#029FAE] text-[#fff] text-[16px]">
                Subscribe
              </button>
            </div>
            <p className="text-[15px] leading-[150%] opacity-60">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tincidunt erat enim.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: 15,
          textAlign: "center",
          background: "#f0f2f3",
          color: "#272343",
        }}
      >
        Copyright {year} developed by &copy;Hoa Pham. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
