module.exports = {
  exportPathMap: function () {
    return Object.assign({
      "/": { page: "/" },
      "/snowball": { page: "/snowball" },
      // "/a-guide-to-flex": { page: "/a-guide-to-flex" },
      "/404": { page: "/_error" }
    }, {})
  }
}