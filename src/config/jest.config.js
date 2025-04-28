module.exports = {
    testEnvironment: 'jest-environment-jsdom',  // Cấu hình môi trường kiểm thử cho React
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],  // Đảm bảo bạn có các matchers của jest-dom
  };
  