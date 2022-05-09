require("babel-register")({
  presets: ["es2015", "react"],
});
const router = require("./route").default;
const Sitemap = require("react-router-sitemap").default;
const axios = require("axios").default;

async function generateSitemap() {
  try {
    let idMap = [];
    let { data } = await axios.get("https://api.thehosteller.com/rest/v1/seo");

    data.map((item) => {
      let params = item.url.split("/");
      idMap.push({ type: params[1], name: params[2] });
    });


    const paramsConfig = {
      "/:type/:name": idMap,
    };
    return new Sitemap(router)
      .applyParams(paramsConfig)
      .build("https://www.thehosteller.com/")
      .save("./public/sitemap.xml");
  } catch (e) {
    console.log(e);
  }
}

generateSitemap();
