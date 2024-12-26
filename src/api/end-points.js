export default {
  postSignUp: () => `auth/send-otp`,
  postOTPverify: () => `auth/verify-otp`,
  getCategories: () => `menu/categorys`,
  menuItems: () => `menu/menuItems`,
  orderCreate: () => `menu/order`,
  getUser: () => `addviewuser`,
  getVideos: () => `getvideos`,
};
