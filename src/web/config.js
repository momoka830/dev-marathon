const config = {
  apiUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:5403"
      : "/api_momoka_yamazaki",
};

export default config;
