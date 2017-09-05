module.exports = {
  exportPathMap: function () {
    return Object.assign({
      "/": { page: "/" },
      "/about": { page: "/about" }
    }, {
      "/archives/aaa": {
        page: "/post",
        query: {
          slug: "aaa"
        }
      },
      "/archives/bbb": {
        page: "/post",
        query: {
          slug: "bbb"
        }
      }
    })
  }
}