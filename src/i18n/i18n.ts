import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const locales = {
  en: "EN",
  vi: "VI",
};

const resources = {
  en: {
    translation: {
      Home: "Home",
      Shop: "Shop",
      "Log out": "Log out",
      Login: "Login",
      "Purchase order": "Purchase order",
      Dashboard: "Dashboard",
      Search: "Search",

      "Welcome to chairy": "Welcome to chairy",
      "Best Furniture Collection for your interior.":
        "Best Furniture Collection For Your Interior.",
      "Shop Now": "Shop Now",
      Discount: "Discount",
      "Every week new sales": "Every week new sales",
      "Free Delivery": "Free Delivery",
      "100% Free for all orders": "100% Free for all orders",
      "Great Support 24/7": "Great Support 24/7",
      "We care your experiences": "We care your experiences",
      "Secure Payment": "Secure Payment",
      "100% Secure Payment Methods": "100% Secure Payment Methods",
      "Featured Products": "Featured Products",
      Support: "Support",
      "Help & Support": "Help & Support",
      "Terms & Conditions": "Terms & Conditions",
      "Privacy Policy": "Privacy Policy",
      Help: "Help",
      Newsletter: "Newsletter",
      "Your email": "Your email",

      // admin product
      Name: "Name",
      "Url name": "Url name",
      "Base price": "Base price",
      "Discount percentage": "Discount percentage",
      Stock: "Stock",
      Description: "Description",
      Picture: "Picture",
      Actions: "Actions",
      "List of products": "List of products",
      "Add new": "Add new",
      "out of": "out of",
      rows: "rows",
      Save: "Save",
      "Select Image": "Save",
      "Are you sure you want to delete this product?":
        "Are you sure you want to delete this product?",
      "Updated product images successfully":
        "Updated product images successfully",
      "Product deletion successful": "Product deletion successful",
      "Top categories": "Top categories",
      "What Client Says About Us": "What Client Says About Us",
      "Recently Added": "Recently Added",

      // product list
      Category: "Category",
      All: "All",
      Quantity: "Quantity",
      "Search products": "Search products",

      // product detail
      Purchase: "Purchase",
      "Generic product": "Generic product",

      // Purchase order
      Amount: "Amount",
      "Total Price": "Total Price",
      "Purchase Date": "Purchase Date",
      "Review Product": "Review Product",
      Review: "Review",
      Rating: "Rating",
      Comment: "Comment",

      // checkout success
      "Successful purchase!": "Successful purchase!",
      "Congratulations on your successful order":
        "Congratulations on your successful order",
      "Your order code is": "Your order code is",
      "We will contact you as soon as possible":
        "We will contact you as soon as possible",
      "Wish you have a good day": "Wish you have a good day",
      "Continue shopping": "Continue shopping",
      "Order details": "Order details",
    },
  },
  vi: {
    translation: {
      Home: "Trang chủ",
      "Log out": "Đăng xuất",
      Login: "Đăng nhập",
      "Purchase order": "Đơn hàng",
      Dashboard: "Quản lý",
      Search: "Tìm kiếm",

      "Welcome to chairy": "Chào mừng đến chairy",
      "Best Furniture Collection for your interior.":
        "Bộ sưu tập nội thất tốt nhất cho nội thất của bạn.",
      "Shop Now": "Đến Cửa Hàng",
      Discount: "Giảm giá",
      "Every week new sales": "Doanh số bán hàng mới mỗi tuần",
      "Free Delivery": "Giao hàng miễn phí",
      "100% Free for all orders": "Miễn phí 100% cho mọi đơn hàng",
      "Great Support 24/7": "Hổ trợ 24/7",
      "We care your experiences": "Quan tâm đến trải nghiệm của bạn",
      "Secure Payment": "Thanh toán an toàn",
      "100% Secure Payment Methods": "Phương thức thanh toán an toàn 100%",
      "Featured Products": "Sản phẩm nổi bật",
      "Top categories": "Danh mục hàng đầu",
      "What Client Says About Us": "Khách hàng nói gì về chúng tôi",
      "Recently Added": "Đã thêm gần đây",
      Support: "Hỗ trợ",
      "Help & Support": "Trợ giúp & Hỗ trợ",
      "Terms & Conditions": "Điều khoản và điều kiện",
      Help: "Hỗ trợ",
      Newsletter: "Bản tin",
      "Your email": "Email của bản",
      "Privacy Policy": "Chính sách bảo mật",

      // admin product
      Name: "Tên",
      Shop: "Cửa hàng",
      "Url name": "Tên Url",
      "Base price": "giá cơ bản",
      "Discount percentage": "Tỷ lệ phần trăm giảm giá",
      Stock: "Hàng trong kho",
      Description: "Mô tả",
      Picture: "Hình ảnh",
      Actions: "Hành động",
      "List of products": "Danh sách sản phẩm",
      "Add new": "Thêm mới",
      "out of": "trên",
      rows: "hàng",
      Save: "Lưu",
      "Select Image": "Chọn ảnh",
      "Are you sure you want to delete this product?":
        "Bạn có chắc chắn muốn xóa sản phẩm này?",
      "Updated product images successfully":
        "Cập nhật hình ảnh sản phẩm thành công",
      "Product deletion successful": "Xóa sản phẩm thành công",

      // product list
      Category: "Danh mục",
      All: "Tất cả",
      Quantity: "Số lượng",
      "Search products": "Tìm kiếm sản phẩm",

      // product detail
      Purchase: "Đặt hàng",
      "Generic product": "Sản phẩm cùng loại",

      // Purchase order
      Amount: "Tổng",
      "Total Price": "Tổng giá",
      "Purchase Date": "Ngày đặt hàng",
      "Review Product": "Đánh giả sản phẩm",
      Review: "Đánh giá",
      Rating: "Xếp hạng",
      Comment: "Bình luận",

      // checkout success
      "Successful purchase!": "Đặt hàng thành công!",
      "Congratulations on your successful order":
        "Chúc mừng bạn đã đặt hàng thành công",
      "Your order code is": "Mã đơn hàng của bạn là",
      "We will contact you as soon as possible":
        "Chúng tôi sẽ liên hệ với bạn ngay khi có thể",
      "Wish you have a good day": "Chúc bạn một ngày tốt lành",
      "Continue shopping": "Tiếp tục mua sắm",
      "Order details": "Chi tiết đặt hàng",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
