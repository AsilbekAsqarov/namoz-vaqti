const NamozVaqti = document.getElementById("Namoz-vaqti");
const NamozQoldiq = document.getElementById("Namoz-qoldiq");
const NamozInfo = document.getElementById("Namoz-info");
const localTime = document.querySelector(".local-time");
const KunHtml = document.getElementById("Kun");
const BomdodVaqti = document.getElementById("Bomdod-vaqti");
const QuyoshVaqti = document.getElementById("Quyosh-vaqti");
const PeshinVaqti = document.getElementById("Peshin-vaqti");
const AsrVaqti = document.getElementById("Asr-vaqti");
const ShomVaqti = document.getElementById("Shom-vaqti");
const XuftonVaqti = document.getElementById("Xufton-vaqti");
const oylikTable = document.querySelector(".oylik-table");
const oylikInfo = document.querySelector(".oylik-info");
const bomdodTr = document.querySelector(".bomdodtr");
const quyoshTr = document.querySelector(".quyoshtr");
const peshinTr = document.querySelector(".peshintr");
const asrTr = document.querySelector(".asrtr");
const shomTr = document.querySelector(".shomtr");
const xuftonTr = document.querySelector(".xuftontr");
const footerTime = document.getElementById("footer-time");
const jumaTime = document.querySelector(".juma-time");
//Oy-kun-yil
const oylar = [
  "Dekabr",
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
];
const hijriOylar = [
  "Zulhijja",
  "Muharram",
  "Safar",
  "Rabiulavval",
  "Rabiussoni",
  "Jumodilavval",
  "Jumodissoni",
  "Rajab",
  "Sha'bon",
  "Ramazon",
  "Shavvol",
  "Zulqa'da",
];

const namazMons = (data) => {
  const result = data.data;
  console.log(result);
  let s = new Date();
  let days = s.getDay();
  if (days == 5) {
    jumaTime.style.display = "block";
  } else {
    jumaTime.style.display = "none";
  }
  result.forEach((time) => {
    let d = new Date();
    let k = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    let kun = String(k);
    let kunApi = Object.values(time.date.gregorian)[2];
    let bom = time.timings.Fajr;
    let bomdod = bom.slice(0, 5);
    let quy = time.timings.Sunrise;
    let quyosh = quy.slice(0, 5);
    let pesh = time.timings.Dhuhr;
    let peshin = pesh.slice(0, 5);
    let as = time.timings.Asr;
    let asr = as.slice(0, 5);
    let sho = time.timings.Maghrib;
    let shom = sho.slice(0, 5);
    let xuf = time.timings.Isha;
    let xufton = xuf.slice(0, 5);
    let milodiyKun = time.date.gregorian.day;
    let milodiyOy = time.date.gregorian.month.en;
    let milodiyYil = time.date.gregorian.year;
    let hijriyKun = time.date.hijri.day;
    let hijriyOy = time.date.hijri.month.number;
    let hijriyYil = time.date.hijri.year;
    let oy = time.date.gregorian.month.number;
    let manba = time.meta.method.name;
    footerTime.innerHTML = Namoz vaqtlari: ${milodiyYil};
    oylikInfo.innerHTML = ${oylar[oy]} ${milodiyYil};
    const tr = document.createElement("tr");
    tr.innerHTML = 
   <td>${milodiyKun}</td>
   <td>${bomdod}</td>
   <td>${quyosh}</td>
   <td>${peshin}</td>
   <td>${asr}</td>
   <td>${shom}</td>
   <td>${xufton}</td>;
    oylikTable.appendChild(tr);
    //sekundamer
    function startTime(namazTime) {
      let bugun = new Date();
      let date = bugun.getDate() + 1;
      let ApiVaqti = ${milodiyOy} ${date} ${milodiyYil} ${namazTime}:00;
      let vaqt = new Date(ApiVaqti);
      let natija = vaqt - bugun;
      let h = Math.floor((natija % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let H = h < 10 ? "0" + h : h;
      let m = Math.floor((natija % (1000 * 60 * 60)) / (1000 * 60));
      let M = m < 10 ? "0" + m : m;
      let s = Math.floor((natija % (1000 * 60)) / 1000);
      let S = s < 10 ? "0" + s : s;
      NamozQoldiq.innerHTML = ${H}:${M}:${S};
      return ${H}:${M}:${S};
    }
    if (kunApi == kun) {
      KunHtml.innerHTML = Milodiy: ${milodiyKun}-${oylar[oy]}, ${milodiyYil}, Hijriy: ${hijriyKun}-${hijriOylar[hijriyOy]}, ${hijriyYil};
      setInterval(function () {
        let setDate = new Date();
        let hours =
          setDate.getHours() < 10
            ? "0" + setDate.getHours()
            : setDate.getHours();
        let minutes =
          setDate.getMinutes() < 10
            ? "0" + setDate.getMinutes()
            : setDate.getMinutes();
        let seconds =
          setDate.getSeconds() < 10
            ? "0" + setDate.getSeconds()
            : setDate.getSeconds();
        localTime.innerHTML = Mahaliy vaqt:${hours}:${minutes}:${seconds};
        let soat = ${hours}:${minutes}:${seconds};
        if (soat >= bomdod && soat < quyosh) {
          const getQuyosh = setInterval(function () {
            startTime(quyosh);
          }, 1000);
          NamozVaqti.innerHTML = Bomdod vaqti;
          NamozInfo.innerHTML = "Quyoshgacha:";
          xuftonTr.classList.remove("active");
          bomdodTr.classList.add("active");
          setTimeout(function () {
            clearInterval(getQuyosh);
          }, 1000);
        } else if (soat >= quyosh && soat < peshin) {
          const getPeshin = setInterval(function () {
            startTime(peshin);
          }, 1000);
          NamozVaqti.innerHTML = Quyosh vaqti;
          NamozInfo.innerHTML = "Peshingacha:";
          bomdodTr.classList.remove("active");
          quyoshTr.classList.add("active");
          setTimeout(function () {
            clearInterval(getPeshin);
          }, 1000);
        } else if (soat >= peshin && soat < asr) {
          const getAsr = setInterval(function () {
            startTime(asr);
          }, 1000);
          NamozVaqti.innerHTML = Peshin vaqti;
          NamozInfo.innerHTML = "Asrgacha:";
          quyoshTr.classList.remove("active");
          peshinTr.classList.add("active");
          setTimeout(function () {
            clearInterval(getAsr);
          }, 1000);
        } else if (soat >= asr && soat < shom) {
          const getShom = setInterval(function () {
            startTime(shom);
          }, 1000);
          NamozVaqti.innerHTML = Asr vaqti;
          NamozInfo.innerHTML = "Shomgacha:";
          peshinTr.classList.remove("active");
          asrTr.classList.add("active");
          setTimeout(function () {
            clearInterval(getShom);
          }, 1000);
        } else if (soat >= shom && soat < xufton) {
          const getXufton = setInterval(function () {
            startTime(xufton);
          }, 1000);
          NamozVaqti.innerHTML = Shom vaqti;
          NamozInfo.innerHTML = "Xuftongacha:";
          asrTr.classList.remove("active");
          shomTr.classList.add("active");
          setTimeout(function () {
            clearInterval(getXufton);
          }, 1000);
        } else if (soat >= "00:00") {
          const getBomdod = setInterval(function () {
            startTime(bomdod);
          }, 1000);
          NamozVaqti.innerHTML = Xufton vaqti;
          NamozInfo.innerHTML = "Bomdodgacha:";
          shomTr.classList.remove("active");
          xuftonTr.classList.add("active");
          setTimeout(function () {
            clearInterval(getBomdod);
          }, 1000);
        } else {
          alert("Namoz vaqtlarida xatolik...");
        }
      }, 1000);
      BomdodVaqti.innerHTML = bomdod;
      QuyoshVaqti.innerHTML = quyosh;
      PeshinVaqti.innerHTML = peshin;
      AsrVaqti.innerHTML = asr;
      ShomVaqti.innerHTML = shom;
      XuftonVaqti.innerHTML = xufton;
      tr.classList.add("active");
    }
  });
};
