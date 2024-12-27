export default {
  postSignUp: () => `auth/send-otp`,
  postOTPverify: () => `auth/verify-otp`,
  getCategories: () => `menu/categorys`,
  menuItems: () => `menu/menuItems`,
  orderCreate: () => `menu/order`,
  orderStatus: (id) => `menu/order/${id}`,
  getUser: () => `addviewuser`,
  getVideos: () => `getvideos`,
};
