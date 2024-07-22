import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hook";
import styles from "../../../styles/client.module.scss";
import "@/styles/clientResetAntd.scss";
import { ICategory, IProduct } from "../../../types/backend";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import { fetchProduct } from "../../../redux/slice/productSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Divider, Dropdown, Input, Skeleton, Space } from "antd";
import { MenuProps } from "antd/lib";
import { DownOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { useSearchParams } from "next/navigation";
import CardProduct from "../card.product";

const Product = () => {
  const offsetInit = 6;
  const limitInit = 6;
  const [offset, setOffset] = useState(offsetInit);
  const [limit, setLimit] = useState(limitInit);
  const [productName, setProductName] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Load all products when component mounts or when search changes
  useEffect(() => {
    const loadInitialProducts = async () => {
      setLoadingMore(true);
      setHasMore(true);
      setProducts([]);

      const resultAction = await dispatch(
        fetchProduct(`page=1&offset=1000&productName=${search || productName}`)
      );

      setLoadingMore(false);

      if (resultAction.payload.length === 0) {
        setHasMore(false);
      } else {
        setProducts(resultAction.payload);
        setOffset(limit);
      }
    };

    loadInitialProducts();
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(fetchCategory(`page=1&offset=10`));
  }, [dispatch]);

  const isFetchingProducts = useAppSelector(
    (state) => state.product.isFetching
  );
  const isFetchingCategories = useAppSelector(
    (state) => state.category.isFetching
  );
  const categories = useAppSelector((state) => state.category.result);

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product?.categories?.some(
            (category: any) => category?.name === selectedCategory
          )
        )
      );
    }
  }, [selectedCategory, products]);

  const loadMoreProducts = async () => {
    if (
      !isFetchingProducts &&
      hasMore &&
      !loadingMore &&
      !productName &&
      !search
    ) {
      setLoadingMore(true);

      setTimeout(() => {
        const nextOffset = offset + limit;

        if (nextOffset >= filteredProducts.length) {
          setHasMore(false);
          setLoadingMore(false);
          return;
        }

        setOffset(nextOffset);
        setLoadingMore(false);
      }, 1000);
    }
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setLimit(Number(key));
    setOffset(Number(key));
  };

  const items: MenuProps["items"] = [
    {
      label: "6 products",
      key: "6",
    },
    {
      label: "8 products",
      key: "8",
    },
    {
      label: "12 products",
      key: "12",
    },
  ];

  const { Search } = Input;

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (value === "") handleFilterByCategory("");
    setProductName(value);
    setOffset(limit);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleFilterByCategory = (categorySelect: string | undefined) => {
    setSelectedCategory(categorySelect);
  };

  const displayedProducts = filteredProducts.slice(0, offset);

  return (
    <div
      className={`${styles["container"]} ${styles["product-section"]} mb-[80px]`}
    >
      <div>
        <div className="text-[32px] font-semibold leading-[110%] text-center">
          Our Products
        </div>
        {categories && (
          <div className="flex justify-center align-center gap-2 my-6 overflow-auto whitespace-nowrap">
            <div
              className={`group flex justify-center items-center p-2 hover:text-[#27234381] hover:border-b
             hover:border-solid hover:border-[#038053] cursor-pointer transition-all duration-300 ml-[100%] lg:ml-[0] ${
               selectedCategory === "" &&
               "text-[#272343] border-b border-solid border-[#038053]"
             }`}
              onClick={() => handleFilterByCategory("")}
            >
              <div
                className={`text-[16px] leading-[110%] font-medium
               tracking-[0.8px] uppercase group-hover:text-[#272343] transition-all duration-300
                ${
                  selectedCategory === "" ? "text-[#272343]" : "text-[#9A9CAA]"
                }`}
              >
                ALL
              </div>
            </div>
            {categories.map((category: ICategory) => (
              <div
                key={category.id}
                className={`group p-2 hover:text-[#272343] hover:border-b hover:border-solid
                 hover:border-[#038053] cursor-pointer transition-all duration-300 ${
                   selectedCategory === category.name &&
                   "text-[#272343] border-b border-solid border-[#038053]"
                 }`}
                onClick={() => handleFilterByCategory(category.name)}
              >
                <div
                  className={`text-[16px] leading-[110%] font-medium tracking-[0.8px]
                 uppercase group-hover:text-[#272343] ${
                   selectedCategory === category.name
                     ? "text-[#272343]"
                     : "text-[#9A9CAA]"
                 }`}
                >
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles["product-section__content-entry"]}>
          <Dropdown menu={{ items, onClick }} placement="bottomLeft" arrow>
            <Button style={{ height: "40px" }}>
              <Space>
                {t("Quantity")}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Search
            size="large"
            placeholder={t("Search products")}
            onSearch={onSearch}
            enterButton
            style={{ width: isMobile ? "auto" : "100%", margin: "10px 0" }}
          />
        </div>
        <Divider />
        <InfiniteScroll
          dataLength={displayedProducts?.length ?? 0}
          next={loadMoreProducts}
          hasMore={hasMore && !productName && !search}
          loader={
            <div className="my-4">
              <Skeleton />
            </div>
          }
          scrollThreshold={0.9}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {displayedProducts?.map((product: IProduct) => (
              <CardProduct
                key={product.id}
                urlName={product?.urlName}
                name={product?.name}
                basePrice={product?.basePrice}
                picture={product?.picture}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Product;
