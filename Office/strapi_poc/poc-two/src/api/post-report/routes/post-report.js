module.exports = {
  routes: [
    {
      method: "GET",
      path: "/post-report",
      handler: "post-report.postReport",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/post-report",
      handler: "post-report.postReport",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
