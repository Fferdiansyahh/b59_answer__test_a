var button = document.getElementById("my-button-41");
button.addEventListener("click", changeColor);

// var buttons = document.getElementById("my-button-2");
// buttons.addEventListener("click", sweetAlertConfirm);

function confirmDel() {
  Swal.fire({
    title: "Are you sure?",
    text: "You want change Color!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      return (
        (style.backgroundColor = "#ffff00"),
        Swal.fire({
          title: "Change!",
          text: "Color has been Change .",
          icon: "success",
        })
      );
    } else {
      return false;
    }
  });
}
function changeColor() {
  Swal.fire({
    title: "Are you sure?",
    text: "You want change Color!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      return (
        alert(),
        Swal.fire({
          title: "Change!",
          text: "Color has been Change .",
          icon: "success",
        })
      );
    }
  });
}

function sweetAlertConfirm() {
  event.preventDefault();
  swal({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(
    function () {
      return isConfirmed;
    },
    function () {
      return isDismissed;
    }
  );
}

function alert() {
  document.getElementById("my-button-41").style.backgroundColor = "green";
}
