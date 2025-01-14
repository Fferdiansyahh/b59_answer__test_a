const express = require("express");
var seesion = require("express-session");
var flash = require("express-flash");
var methodOverride = require("method-override");
const path = require("path");
const hbs = require("hbs");
require("dotenv").config();

const {
  renderMyheroes,
  renderHeroesDetail,
  renderHeroesEdit,
  updateHeroes,
  addHeroes,
  delHeroes,
  renderLogin,
  renderRegister,
  authRegister,
  authLogin,
  authLogout,
  renderHome,
  renderContact,
  renderCreatemyheroes,
  renderTestimonial,
  render404,
  delTypes,
  renderTypeEdit,
  updateType,
  addType,
  renderCreatemytype,
} = require("./controllers/controller-v2");

const {
  formatDataToWIB,
  getRelativeTime,
  getDuring,
  formatDate,
  formatNow,
} = require("./utils/time.js");
const {
  truncateText,
  alertDelete,
  textTechnologies,
} = require("./utils/text.js");
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
const { confirmDelProj, alertLogin } = require("./utils/alert.js");

const upload = require("./middlewares/upload-file.js");
const { sendAlert } = require("./Asset/js/alerts.js");

const app = express();
const port = process.env.SERVER_PORT || 3330;

app.use(
  seesion({
    name: "my-session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/asset", express.static(path.join(__dirname, "./asset")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/utils", express.static(path.join(__dirname, "./utils")));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("formatDataToWIB", formatDataToWIB);
hbs.registerHelper("formatDate", formatDate);
hbs.registerHelper("formatNow", formatNow);
hbs.registerHelper("truncateText", truncateText);
hbs.registerHelper("alertDelete", alertDelete);
hbs.registerHelper("textTechnologies", textTechnologies);

hbs.registerHelper("checkboxInputa", checkboxInputa);
hbs.registerHelper("checkboxInputb", checkboxInputb);
hbs.registerHelper("checkboxInputc", checkboxInputc);
hbs.registerHelper("checkboxInputd", checkboxInputd);
// hbs.registerHelper("sendAlert", sendAlert);

hbs.registerHelper("attributeIconsa", attributeIconsa);
hbs.registerHelper("attributeIconsb", attributeIconsb);
hbs.registerHelper("attributeIconsc", attributeIconsc);
hbs.registerHelper("attributeIconsd", attributeIconsd);
hbs.registerHelper("classIconsa", classIconsa);
hbs.registerHelper("classIconsb", classIconsb);
hbs.registerHelper("classIconsc", classIconsc);
hbs.registerHelper("classIconsd", classIconsd);
hbs.registerHelper("confirmDelProj", confirmDelProj);
sendAlert;
hbs.registerHelper("sendAlert", sendAlert);
hbs.registerHelper("getDuring", getDuring);
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});

// app.get("/", renderHome);

app.get("/testimonial", renderTestimonial);
app.get("/login", renderLogin);
app.get("/register", renderRegister);

app.post("/login", authLogin);
app.post("/register", authRegister);
app.get("/logout", authLogout);

app.get("/", renderMyheroes);
app.get("/heroes-add", renderCreatemyheroes);
app.get("/type-add", renderCreatemytype);
app.get("/heroes-edit/:id", renderHeroesEdit);
app.get("/type-edit/:id", renderTypeEdit);
app.patch("/heroes-update:id", upload.single("image"), updateHeroes);
app.patch("/type-update:id", upload.single("image"), updateType);

app.delete("/delete-heroes:id", delHeroes);
app.delete("/delete-type:id", delTypes);
app.get("/heroes-detail/:id", renderHeroesDetail);

app.post("/heroes-add", upload.single("image"), addHeroes);
app.post("/type-add", upload.single("image"), addType);
app.get("/404", render404);

app.listen(port, () => {
  console.log(`server berjalan ${port}`);
  // console.log(`test dotenv ${process.env.URL_TEST}`);
});
