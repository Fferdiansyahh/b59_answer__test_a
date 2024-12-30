const express = require("express");
var methodOverride = require("method-override");
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();

const {
  renderHome,
  renderContact,
  renderMyproject,
  renderCreatemyproject,
  renderProjectDetail,
  renderProjectEdit,
  updateProject,
  renderTestimonial,
  renderBlog,
  addProject,
  delProject,

  render404,
} = require("./controllers/controller");

const {
  formatDataToWIB,
  getRelativeTime,
  getDuring,
  formatDate,
  formatNow,
} = require("./utils/time.js");
const { truncateText } = require("./utils/text.js");
const {
  checkboxInputa,
  checkboxInputb,
  checkboxInputc,
  checkboxInputd,
  attributeIconsa,
  attributeIconsb,
  attributeIconsc,
  attributeIconsd,
  classIconsa,
  classIconsb,
  classIconsc,
  classIconsd,
} = require("./utils/check.js");

const app = express();
const port = process.env.SERVER_PORT || 3330;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/asset", express.static(path.join(__dirname, "./asset")));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("formatDataToWIB", formatDataToWIB);
hbs.registerHelper("formatDate", formatDate);
hbs.registerHelper("formatNow", formatNow);
hbs.registerHelper("truncateText", truncateText);
hbs.registerHelper("checkboxInputa", checkboxInputa);
hbs.registerHelper("checkboxInputb", checkboxInputb);
hbs.registerHelper("checkboxInputc", checkboxInputc);
hbs.registerHelper("checkboxInputd", checkboxInputd);
hbs.registerHelper("attributeIconsa", attributeIconsa);
hbs.registerHelper("attributeIconsb", attributeIconsb);
hbs.registerHelper("attributeIconsc", attributeIconsc);
hbs.registerHelper("attributeIconsd", attributeIconsd);
classIconsa;
hbs.registerHelper("classIconsa", classIconsa);
hbs.registerHelper("classIconsb", classIconsb);
hbs.registerHelper("classIconsc", classIconsc);
hbs.registerHelper("classIconsd", classIconsd);

hbs.registerHelper("getDuring", getDuring);
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

app.get("/", renderHome);

app.get("/testimonial", renderTestimonial);
app.get("/myproject", renderMyproject);
app.get("/project-add", renderCreatemyproject);
app.get("/project-edit/:id", renderProjectEdit);
app.patch("/project-update:id", updateProject);

app.delete("/delete-project:id", delProject);
app.get("/project-detail/:id", renderProjectDetail);
app.get("/contact", renderContact);
app.get("/blog", renderBlog);
app.get("/blog-detail", renderBlog);
app.post("/myproject", addProject);

app.listen(port, () => {
  console.log(`server berjalan ${port}`);
  // console.log(`test dotenv ${process.env.URL_TEST}`);
});
