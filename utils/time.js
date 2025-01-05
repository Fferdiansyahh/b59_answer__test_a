function formatDataToWIB(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agus",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  let day = date.getDate().toString().padStart(2, "0");
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

  return formattedDate;
}

function formatDate(date) {
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();
  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function formatNow() {
  date = new Date();
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();

  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

function getRelativeTime(targetDate) {
  let now = new Date();
  let diffInSeconds = Math.floor((now - targetDate) / 1000); // 7.2 = 7 satuan detik /1000

  //   console.log(now);
  // console.log(diffInSeconds);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  }

  let diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  let diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  let diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 24) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }
  // console.log(diffInDays);
}

function getDuring(sDate, eDate) {
  targetDate = eDate - sDate;
  // console.log(targetDate);
  let diffInDayss = Math.floor(targetDate);

  let diffInMonthss = Math.floor(diffInDayss / 2592000000);
  //   let diffInDaysss = diffInDayss - diffInMonthss * 30;

  if (diffInMonthss > 0) {
    return `${diffInMonthss} month${diffInMonthss > 1 ? "s" : ""}`;
  }
  //   if (diffInDaysss > 0) {
  // `${diffInDaysss} month${diffInDaysss > 1 ? "s" : ""}`;
  //   }
  //   console.log(diffInDaysss, diffInMonthss);
}

module.exports = {
  formatDataToWIB,
  formatDate,
  formatNow,
  getRelativeTime,
  getDuring,
};
