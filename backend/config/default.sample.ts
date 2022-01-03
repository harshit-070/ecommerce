export default {
  port: 4000,
  dbUrl: "mongodb://localhost:27017/ecommerce",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: "YOUR_ACCESS_TOKEN_PRIVATE_KEY",
  accessTokenPublicKey: "YOUR_ACCESS_TOKEN_PUBLIC_KEY",
  refreshTokenPrivateKey: "YOUR_REFRESH_TOKEN_PRIVATE_KEY",
  refreshTokenPublicKey: "YOUR_REFRESH_TOKEN_PUBLIC_KEY",
  GOOGLE_CLIENT_ID: "YOUR_GOOGLE_CLIEND_ID",
  GOOGLE_CLIENT_SECRET: "YOUR_GOOGLE_CLIEND_SECRET",
  productLimitPerPage: 15,
  reviewLimitPerPage: 15,
};
