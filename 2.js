function discount(promo, value) {
  let result = "";
  let cut = "";
  let promo1 = "DumbWaysJos";
  let promo2 = "DumbWaysMantap";
  const valpromo1 = 0.211;
  const valpromo2 = 0.3;
  const maxpromo1 = 20000;
  const maxpromo2 = 30000;
  const buypromo1 = 50000;
  const buypromo2 = 80000;

  if (promo == promo1 || promo == promo2) {
    if (promo == promo1 && value >= buypromo1) {
      cut = value * valpromo1;
      if (cut < maxpromo1) {
        cut = cut;
      } else {
        cut = maxpromo1;
      }
      result = value - cut;
    } else if (promo == promo2 && value >= buypromo2) {
      cut = value * valpromo2;
      if (cut < maxpromo2) {
        cut = cut;
      } else {
        cut = maxpromo2;
      }
    }
    result = value - cut;
    if (
      (promo == promo1 && value >= buypromo1) ||
      (promo == promo2 && value >= buypromo2)
    ) {
      console.log("Uang yang harus dibayar : RP.", result);
      console.log("Diskon : Rp.", cut);
    } else {
      console.log(`Belanjaan  anda kurang  untuk menikmati promo ${promo}!`);
      console.log("Promo DumbWaysJos min belanja : Rp.", buypromo1);
      console.log("Promo DumbWaysMantap min belanja : Rp.", buypromo2);
      console.log("Belanjaan anda : Rp", value);
      if (promo === promo1) {
        console.log(`Tambah : Rp. ${buypromo1 - value} lagi`);
      } else if (promo == promo2) {
        console.log(`Tambah : Rp. ${buypromo2 - value} lagi`);
      }
    }
  } else {
    console.log("Promo yang yang masukkan tidak ada !");
    console.log("Pastikan anda memilih promo yang benar ");
    console.log("Promo DumbWaysJos min belanja : Rp.", buypromo1);
    console.log("Promo DumbWaysMantap min belanja : Rp.", buypromo2);
  }
}

// discount("DumbWaysJos", 140000);
discount("DumbWaysMantap", 80000);
