const { Sequelize, QueryType, QueryTypes, where } = require("sequelize");
const config = require("../config/config.json");
const { SELECT } = require("sequelize/lib/query-types");
const bcrypt = require("bcrypt");
const { types } = require("pg");
const { Heroes, User, Type } = require("../models");
const session = require("express-session");
const fs = require("fs");
const $ = require("jquery");
const path = require("path");

const Swal = require("sweetalert2");

const saltRound = 10;

const sequelize = new Sequelize(config.development);

function renderLogin(req, res) {
  const { user } = req.session;
  if (user) {
    res.redirect("/");
  }
  res.render("auth-login");
}

function renderRegister(req, res) {
  const user = req.session.user;
  if (user) {
    res.redirect("/");
  }
  res.render("auth-register");
}

function renderHome(req, res) {
  const { user } = req.session;

  res.render("index", { user });
}

async function authRegister(req, res) {
  const { username, email, password } = req.body;
  const userCheck = await User.findOne({ where: { username } });
  const emailCheck = await User.findOne({ where: { email } });

  if (userCheck) {
    req.flash("error", "User Already Exists.");
    res.redirect("/register");
  } else if (emailCheck) {
    req.flash("error", "Email Already Exists.");
    res.redirect("/register");
  } else {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.flash("success", "Berhasil Mendaftar silahkan login");
    res.redirect("/login");
  }
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  // check if password user axit
  const user = await User.findOne({ where: { email } });

  if (!user) {
    req.flash("error", "User Not Found.");
    return res.redirect("login");
  }
  // cheack password
  const isValidated = await bcrypt.compare(password, user.password);
  if (!isValidated) {
    req.flash("error", "Password incorrect.");
    Swal.fire({
      title: "Edited!",
      text: "Heroes has been edited .",
      icon: "Success",
      background: "#1d2333",
    });
    return res.redirect("login");
  }

  let loggedInUser = user.toJSON();
  delete loggedInUser.password;

  req.session.user = loggedInUser;
  console.log(loggedInUser);
  req.flash("success", "Berhasil login");
  res.redirect("/");
}

//my heroes
async function renderMyheroes(req, res) {
  const { user } = req.session;
  const myheroes = await Heroes.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });
  // console.log(myheroes[1]);
  res.render("myheroes", { blogs: myheroes, user });
}

function authLogout(req, res) {
  req.session.user = null;

  res.redirect("login");
}

function renderCreatemyheroes(req, res) {
  const { user } = req.session;

  if (user) {
    res.render("heroes-add", { user });
  } else {
    res.redirect("/login");
  }
}

async function updateHeroes(req, res) {
  let user = req.session.user;
  const { id } = req.params;
  const heroesEdit = await Heroes.findOne({ where: { id } });
  const image = "http://localhost:4040/" + req.file.path;

  let imagepPath =
    "./uploads/" + heroesEdit.photo.split("\\").pop().split("/").pop();
  let imageOld = "./uploads/" + image.split("\\").pop().split("/").pop();
  console.log("Image Patch", req.file.path);
  console.log("Image Local", imageOld);
  console.log("Image path", imagepPath);
  if (imagepPath !== imageOld) {
    try {
      fs.unlinkSync(imagepPath);
      console.log("File deleted!");
    } catch (err) {
      // Handle specific error if any
      console.error(err.message);
    }
  }

  if (heroesEdit.user_id === user.id) {
    const { name, type } = req.body;
    // const image = req.file.path;
    console.log("Gambar", image);
    const result = await Heroes.update(
      {
        name,

        type_id: type,
        photo: image,

        updatedAt: sequelize.fn("NOW"),
        // image,
      },
      {
        where: { id: id },
      }
    );
    console.log(result);
    res.redirect("/");
  } else {
    req.flash("error", "Edit your heroes only");
    res.redirect("/");
  }
}

async function renderHeroesEdit(req, res) {
  const { user } = req.session;
  const { id } = req.params;

  const heroesEdit = await Heroes.findOne({ where: { id } });
  // console.log("user_id :", heroesEdit.user_id);

  if (heroesEdit.user_id === user.id) {
    res.render("heroes-edit", { data: heroesEdit, user });
  } else if (heroesEdit.user_id !== user.id) {
    req.flash("error", "Access is not permitted");
    res.redirect("/");
  }
}

async function renderHeroesDetail(req, res) {
  let { user } = req.session;
  const { id } = req.params;

  const heroesDetail = await Heroes.findOne({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    where: {
      id: id,
    },
  });

  if (heroesDetail === null) {
    res.render("page-404", { message: "Heroes", user });
  } else {
    // console.log(heroesDetail);

    res.render("heroes-detail", { data: heroesDetail, user });
  }
}

async function delHeroes(req, res) {
  let { user } = req.session;
  const { id } = req.params;
  const heroesEdit = await Heroes.findOne({ where: { id } });

  if (heroesEdit.user_id === user.id) {
    const result = Heroes.destroy({
      where: { id },
    });

    let imagepPath =
      "./uploads/" + heroesEdit.photo.split("\\").pop().split("/").pop();

    console.log("Image path", imagepPath);

    try {
      fs.unlinkSync(imagepPath);
      console.log("File deleted!");
    } catch (err) {
      // Handle specific error if any
      console.error(err.message);
    }

    // console.log("Result Query Delete :", result);
    res.redirect("/");
  } else {
    res.redirect("/");
    req.flash("error", "Delete your heroes only");
  }
}
async function addHeroes(req, res) {
  let { user } = req.session;

  const { name, type } = req.body;
  const image = "http://localhost:4040/" + req.file.path;
  // console.log("Hasil Gambar".req.file.path);
  console.log("Gambar upload", req.file);
  const result = await Heroes.create({
    name,

    photo: image,
    type_id: type,
    user_id: user.id,
    createdAt: sequelize.fn("NOW"),
    updatedAt: sequelize.fn("NOW"),
  });

  res.redirect("/");
}

function renderCreatemytype(req, res) {
  const { user } = req.session;

  if (user) {
    res.render("type-add", { user });
  } else {
    res.redirect("/login");
  }
}

async function updateType(req, res) {
  let user = req.session.user;
  const { id } = req.params;
  const heroesEdit = await Type.findOne({ where: { id } });
  const image = "http://localhost:4040/" + req.file.path;

  let imagepPath =
    "./uploads/" + heroesEdit.image.split("\\").pop().split("/").pop();
  let imageOld = "./uploads/" + image.split("\\").pop().split("/").pop();
  console.log("Image Patch", req.file.path);
  console.log("Image Local", imageOld);
  console.log("Image path", imagepPath);
  if (imagepPath !== imageOld) {
    try {
      fs.unlinkSync(imagepPath);
      console.log("File deleted!");
    } catch (err) {
      // Handle specific error if any
      console.error(err.message);
    }
  }

  if (heroesEdit.user_id === user.id) {
    const { name, type } = req.body;
    // const image = req.file.path;
    console.log("Gambar", image);
    const result = await Type.update(
      {
        typename: name,
        type_id: type,
        image: image,
        updatedAt: sequelize.fn("NOW"),
        // image,
      },
      {
        where: { id: id },
      }
    );
    console.log(result);
    res.redirect("/");
  } else {
    req.flash("error", "Edit your heroes only");
    res.redirect("/");
  }
}

async function renderTypeEdit(req, res) {
  const { user } = req.session;
  const { id } = req.params;

  const heroesEdit = await Type.findOne({ where: { id } });
  // console.log("user_id :", heroesEdit.user_id);

  if (heroesEdit.user_id === user.id) {
    res.render("heroes-edit", { data: heroesEdit, user });
  } else if (heroesEdit.user_id !== user.id) {
    req.flash("error", "Access is not permitted");
    res.redirect("/");
  }
}
async function delTypes(req, res) {
  let { user } = req.session;
  const { id } = req.params;
  const heroesEdit = await Type.findOne({ where: { id } });

  if (heroesEdit.user_id === user.id) {
    const result = Type.destroy({
      where: { id },
    });

    let imagepPath =
      "./uploads/" + heroesEdit.image.split("\\").pop().split("/").pop();

    console.log("Image path", imagepPath);

    try {
      fs.unlinkSync(imagepPath);
      console.log("File deleted!");
    } catch (err) {
      // Handle specific error if any
      console.error(err.message);
    }

    // console.log("Result Query Delete :", result);
    res.redirect("/");
  } else {
    res.redirect("/");
    req.flash("error", "Delete your heroes only");
  }
}
async function addType(req, res) {
  let { user } = req.session;

  const { name, type } = req.body;
  const image = "http://localhost:4040/" + req.file.path;
  // console.log("Hasil Gambar".req.file.path);
  console.log("Gambar upload", req.file);
  const result = await Type.create({
    typename: name,

    image: image,
    type_id: type,
    user_id: user.id,
    createdAt: sequelize.fn("NOW"),
    updatedAt: sequelize.fn("NOW"),
  });

  res.redirect("/");
}

// tesimonial
function renderTestimonial(req, res) {
  const { user } = req.session;
  res.render("testimonial", { user });
}
function renderContact(req, res) {
  const { user } = req.session;
  res.render("contact", { user });
}

function render404(req, res) {
  const { user } = req.session;
  res.render("page-404", { user });
}

module.exports = {
  renderLogin,
  renderRegister,
  authRegister,
  authLogin,
  authLogout,
  renderHome,
  renderMyheroes,
  renderCreatemyheroes,
  renderCreatemytype,
  renderHeroesDetail,
  renderHeroesEdit,
  renderTypeEdit,
  updateHeroes,
  updateType,
  renderTestimonial,
  renderContact,
  render404,
  addHeroes,
  delHeroes,
  addType,
  delTypes,
};
