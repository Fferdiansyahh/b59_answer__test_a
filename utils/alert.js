const Swal = require("sweetalert2");

function sendAlert(title, message) {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
  });
}

function confirmDelProject() {
  return Swal.fire({
    title: "The Internet?",
    text: "That thing is still around?",
    icon: "question",
  });
}

function alertLogin() {}

module.exports = {
  sendAlert,
  confirmDelProject,
  alertLogin,
};
