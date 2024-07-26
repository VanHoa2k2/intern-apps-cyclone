"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  ShoppingCartOutlined,
  DashOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Avatar, Drawer, Dropdown, MenuProps, Space, message } from "antd";
import { Menu, ConfigProvider } from "antd";
import styles from "@/styles/client.module.scss";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setLogoutAction } from "@/redux/slice/accountSlice";
import { GrLanguage } from "react-icons/gr";
import ENLanguage from "@/assets/image/EN.png";
import VILanguage from "@/assets/image/VI.png";
import logo from "@/assets/logo/logo.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BiRegistered } from "react-icons/bi";

interface IProps {
  t: (key: string) => string;
  i18n: any;
  currentLanguage: string;
}

const Header = (props: IProps) => {
  const { t, i18n, currentLanguage } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => state?.account?.isAuthenticated
  );
  const user = useAppSelector((state) => state?.account?.user);

  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [current, setCurrent] = useState("home");
  const [searchProduct, setSearchProduct] = useState("");
  const pathname = usePathname();

  const headerRef = useRef<any>(null);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const items: MenuProps["items"] = [
    {
      label: <Link href={"/"}>{t("Home")}</Link>,
      key: "/",
    },
    {
      label: <Link href={"/shop"}>{t("Shop")}</Link>,
      key: "/shop",
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    setOpenMobileMenu(false);
  };

  const handleLogout = async () => {
    try {
      dispatch(setLogoutAction({}));
      message.success("Đăng xuất thành công");
      router.push("/");
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const stickyHeaderFunc = useCallback(() => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef?.current?.classList?.add(styles.sticky__header);
    } else {
      headerRef?.current?.classList?.remove(styles.sticky__header);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc);

    // Cleanup event listener when component unmount
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, [stickyHeaderFunc]);

  const itemsDropdown =
    user && user?.name
      ? [
          {
            label: (
              <Link href={"/purchase-order"} style={{ cursor: "pointer" }}>
                {t("Purchase order")}
              </Link>
            ),
            key: "purchase-order",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: <Link href={"/admin/product"}>{t("Dashboard")}</Link>,
            key: "admin",
            icon: <DashOutlined />,
          },
          {
            label: (
              <label
                style={{ cursor: "pointer" }}
                onClick={() => handleLogout()}
              >
                {t("Log out")}
              </label>
            ),
            key: "logout",
            icon: <LogoutOutlined />,
          },
        ]
      : [
          {
            label: <Link href={"/register"}>{t("Register")}</Link>,
            key: "register",
            icon: <BiRegistered />,
          },
          {
            label: <Link href={"/login"}>{t("Login")}</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ];

  const onLanguageChange: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(key);
  };

  const itemsLanguages = [
    {
      label: (
        <label className={styles["language-section"]}>
          <Image
            src={ENLanguage}
            alt="language english"
            width={100}
            height={20}
            style={{ height: "20px" }}
            loading="lazy"
          />
          English
        </label>
      ),
      key: "en",
    },
    {
      label: (
        <label className={styles["language-section"]}>
          <Image
            src={VILanguage}
            alt="language vietnam"
            width={100}
            height={20}
            loading="lazy"
          />
          Tiếng Việt
        </label>
      ),
      key: "vi",
    },
  ];

  const itemsMobiles = [...items, ...itemsDropdown];

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchProduct) {
      router.push(`/shop/?search=${searchProduct}`);
      setSearchProduct("");
    }
  };

  return (
    <div className={styles["header-app"]} ref={headerRef}>
      <div className={styles["header-section"]}>
        <div className={`${styles["container"]} ${styles["mobile-container"]}`}>
          {!isMobile ? (
            <div className="flex gap-[60px]">
              <Link href={"/"} className={styles["brand"]}>
                <Image
                  src={logo}
                  alt="logo"
                  width={40}
                  height={40}
                  loading="lazy"
                />
                <div className={styles["brand-name"]}>Comforty</div>
              </Link>
              <div className={styles["top-menu"]}>
                <div className="w-[240px]">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#272343",
                        colorBgContainer: "#d6d2d2",
                        colorText: "#272343",
                        fontSize: 18,
                      },
                    }}
                  >
                    <Menu
                      selectedKeys={[current]}
                      mode="horizontal"
                      items={items}
                    />
                  </ConfigProvider>
                </div>

                <form className="max-w-md">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-[340px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                      bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`${t("Search products")}...`}
                      required
                      value={searchProduct}
                      onChange={(e) => setSearchProduct(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-2 end-2.5 bottom-2.5 bg-[#272343] hover:bg-[#3c394a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={(e) => handleSearch(e)}
                    >
                      {t("Search")}
                    </button>
                  </div>
                </form>

                <div className={styles["extra"]}>
                  <Dropdown
                    menu={{ items: itemsLanguages, onClick: onLanguageChange }}
                    trigger={["click"]}
                  >
                    <Space style={{ cursor: "pointer" }}>
                      <span>
                        <GrLanguage />{" "}
                        {currentLanguage === "EN" ? "English" : "Tiếng Việt"}
                      </span>
                    </Space>
                  </Dropdown>
                  {isAuthenticated === false ? (
                    <div className="flex items-center">
                      <Link
                        className="pr-3 border-r border-solid border-[#ccc] leading-[120%]"
                        href={"/register"}
                      >
                        {t("Register")}
                      </Link>
                      <Link className="ml-3 leading-[120%]" href={"/login"}>
                        {t("Login")}
                      </Link>
                    </div>
                  ) : (
                    <Dropdown
                      menu={{ items: itemsDropdown }}
                      trigger={["click"]}
                    >
                      <Space style={{ cursor: "pointer" }}>
                        <span>{user?.name}</span>
                        <Avatar
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {" "}
                          {user?.name?.substring(0, 1)?.toUpperCase()}{" "}
                        </Avatar>
                      </Space>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["header-mobile"]}>
              <Link href={"/"} className={styles["brand"]}>
                <Image src={logo} alt="logo" width={40} height={40} />
                <div className={styles["brand-name"]}>Comforty</div>
              </Link>
              {user && user?.name && (
                <Space style={{ cursor: "pointer" }}>
                  <span>{user?.name}</span>
                  <Avatar style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    {user?.name?.substring(0, 1)?.toUpperCase()}{" "}
                  </Avatar>
                </Space>
              )}
              <MenuFoldOutlined onClick={() => setOpenMobileMenu(true)} />
            </div>
          )}
        </div>
      </div>
      <Drawer
        title="Chức năng"
        placement="right"
        onClose={() => setOpenMobileMenu(false)}
        open={openMobileMenu}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={itemsMobiles}
        />
      </Drawer>
    </div>
  );
};

export default memo(Header);
