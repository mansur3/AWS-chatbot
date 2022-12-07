"use strict";

/**
 * A set of functions called "actions" for `post-report`
 */

module.exports = {
  async postReport(ctx, next) {
    try {
      const data = await strapi
        .service("api::posts-report.posts-report")
        .postReport();
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
