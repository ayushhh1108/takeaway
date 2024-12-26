export default {
  postSignUp: () => `auth/send-otp`,
  postOTPverify: () => `auth/verify-otp`,
  getCategories: () => `menu/categorys`,
  menuItems: () => `menu/menuItems`,
  getUser: () => `addviewuser`,
  getVideos: () => `getvideos`,
};
