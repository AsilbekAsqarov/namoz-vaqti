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
const footerTime = document.getElementById("footer-time");
const jumaTime = document.querySelector(".juma-time");

// Oylik nomlar
const oylar = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
const hijriOylar = ["Muharram", "Safar", "Rabiulavval", "Rabiussoni", "Jumodilavval", "Jumodissoni", "Rajab", "Sha'bon", "Ramazon", "Shavvol", "Zulqa'da", "Zulhijja"];

// **⏳ Sekundomer - Namoz vaqtigacha qolgan vaqtni hisoblash**
const startTime = (namazTime) => {
    let bugun = new Date();
    let vaqt = new Date(`${bugun.getFullYear()}-${bugun.getMonth() + 1}-${bugun.getDate()} ${namazTime}:00`);
    
    // Agar vaqt o'tib ketgan bo‘lsa, keyingi kunni olish
    if (vaqt < bugun) vaqt.setDate(vaqt.getDate() + 1);

    let natija = vaqt - bugun;
    let h = String(Math.floor((natija / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    let m = String(Math.floor((natija / (1000 * 60)) % 60)).padStart(2, "0");
    let s = String(Math.floor((natija / 1000) % 60)).padStart(2, "0");

    NamozQoldiq.innerHTML = `${h}:${m}:${s}`;
};

// **📅 API dan kelgan ma'lumotlarni qayta ishlash**
const namazMons = (data) => {
    let result = data.data;
    let d = new Date();
    let bugunKun = d.getDate();
    let days = d.getDay();
     if (days == 5) {
    jumaTime.style.display = "block";
  } else {
    jumaTime.style.display = "none";
  }

    oylikTable.innerHTML = ""; // Eski jadvalni tozalash

    result.forEach((time) => {
        let apiKun = parseInt(time.date.gregorian.day);
        let bomdod = time.timings.Fajr.slice(0, 5);
        let quyosh = time.timings.Sunrise.slice(0, 5);
        let peshin = time.timings.Dhuhr.slice(0, 5);
        let asr = time.timings.Asr.slice(0, 5);
        let shom = time.timings.Maghrib.slice(0, 5);
        let xufton = time.timings.Isha.slice(0, 5);

        // Jadvalga qo'shish
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${apiKun}</td><td>${bomdod}</td><td>${quyosh}</td><td>${peshin}</td><td>${asr}</td><td>${shom}</td><td>${xufton}</td>`;
        oylikTable.appendChild(tr);

        if (bugunKun === apiKun) {
            KunHtml.innerHTML = `Milodiy: ${apiKun}-${oylar[d.getMonth()]}, ${d.getFullYear()}, Hijriy: ${time.date.hijri.day}-${hijriOylar[time.date.hijri.month.number - 1]}, ${time.date.hijri.year}`;
            
            BomdodVaqti.innerHTML = bomdod;
            QuyoshVaqti.innerHTML = quyosh;
            PeshinVaqti.innerHTML = peshin;
            AsrVaqti.innerHTML = asr;
            ShomVaqti.innerHTML = shom;
            XuftonVaqti.innerHTML = xufton;

            setInterval(() => {
                let hozirgiSoat = new Date().toTimeString().slice(0, 8);
                    localTime.innerHTML = Mahaliy vaqt:${hours}:${minutes}:${seconds};
                if (hozirgiSoat < bomdod) {
                    xuftonTr.classList.remove("active");
                    bomdodTr.classList.add("active");
                    NamozVaqti.innerHTML = `Bomdod vaqti`;
                    NamozInfo.innerHTML = "Quyoshgacha:";
                    startTime(quyosh);
                } else if (hozirgiSoat < quyosh) {
                    bomdodTr.classList.remove("active");
                    quyoshTr.classList.add("active");
                    NamozVaqti.innerHTML = `Quyosh vaqti`;
                    NamozInfo.innerHTML = "Peshingacha:";
                    startTime(peshin);
                } else if (hozirgiSoat < peshin) {
                    quyoshTr.classList.remove("active");
                    peshinTr.classList.add("active");
                    NamozVaqti.innerHTML = `Peshin vaqti`;
                    NamozInfo.innerHTML = "Asrgacha:";
                    startTime(asr);
                } else if (hozirgiSoat < asr) {
                    peshinTr.classList.remove("active");
                    asrTr.classList.add("active");
                    NamozVaqti.innerHTML = `Asr vaqti`;
                    NamozInfo.innerHTML = "Shomgacha:";
                    startTime(shom);
                } else if (hozirgiSoat < shom) {
                    asrTr.classList.remove("active");
                    shomTr.classList.add("active");
                    NamozVaqti.innerHTML = `Shom vaqti`;
                    NamozInfo.innerHTML = "Xuftongacha:";
                    startTime(xufton);
                } else {
                    shomTr.classList.remove("active");
                    xuftonTr.classList.add("active");
                    NamozVaqti.innerHTML = `Xufton vaqti`;
                    NamozInfo.innerHTML = "Bomdodgacha:";
                    startTime(bomdod);
                }
            }, 1000);
        }
    });
};
