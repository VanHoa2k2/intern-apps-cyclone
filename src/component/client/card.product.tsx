import Image from "next/image";
import Link from "next/link";
import React from "react";
import buy from "@/assets/icon/Buy.svg";
import { IProduct } from "@/types/backend";

interface IProps extends IProduct {
  key: string | undefined;
}

const CardProduct = (props: IProps) => {
  const { urlName, name, basePrice, picture, key } = props;
  return (
    <Link href={`/${urlName}`} key={key}>
      <div className="group flex flex-col border border-solid border-gray-300 rounded-lg cursor-pointer overflow-hidden shadow-card">
        <div className="relative overflow-hidden">
          <Image
            src={`http://${picture}`}
            alt={name}
            width={312}
            height={312}
            layout="responsive"
            objectFit="cover"
            className="rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="flex gap-[12px] justify-between border-t border-solid border-gray-300 p-3">
          <div className="flex flex-col gap-[10px]">
            <div className="text-4 font-normal leading-[130%] text-[#007580]">
              {name}
            </div>
            <div className="text-[18px] font-semibold leading-[110%]">
              {basePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
            </div>
          </div>
          <div className="w-[44px] h-[44px] rounded-lg bg-[#F0F2F3] flex justify-center items-center">
            <Image src={buy} alt="icon buy" width={24} height={24} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
