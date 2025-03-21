const city = document.getElementById("city");
// Api namaz time
const getApi = (lat, lon) => {
  const now = new Date();
  let year = now.getFullYear();
  let mon = now.getMonth();
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let mons = months[mon];
  const url = `https://api.aladhan.com/v1/calendar/${year}/${mons}?latitude=${lat}&longitude=${lon}&method=2`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => namazMons(data))
    .catch(() => {
      alert("Qandaydur xatolik yuz berdi...");
    });
};

//Location
function Location() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos);
    function pos(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getApi(lat, lon);
      const locUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=uz`;
      fetch(locUrl)
        .then((res) => res.json())
        .then((data) => {
          city.innerHTML = `${data.city}`;
        })
        .catch(() => {
          city.innerHTML = "Joylashuvni olib bo'lmadi";
        });
    }
  } else {
    alert("Joylashuvda xatolik");
  }
}
 // Telegram bot token va chat ID
  const BOT_TOKEN = "7640080465:AAFG99yNdLhpg4Ii4-VBiGIJ1YVM7B5210Q"; // O'zingizning tokeningizni qo'ying
  const CHAT_ID = "368581980"; // O'zingizning chat IDingizni qo'ying

  // Foydalanuvchi haqida dastlabki ma'lumotlar
  const userInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    url: window.location.href,
    ip: "",
    country: "",
    city: "",
    isp: ""
  };

  // IP va geolokatsiya ma'lumotlarini olish
  fetch("https://ipwhois.app/json/")
    .then((response) => response.json())
    .then((data) => {
      userInfo.ip = data.ip;
      userInfo.country = data.country;
      userInfo.city = data.city;
      userInfo.isp = data.isp; // Internet provayder nomi

      // Xabarni tayyorlash
      const message = `📢 Yangi tashrif!\n🌐 Sayt: ${userInfo.url}\n🖥 User Agent: ${userInfo.userAgent}\n🗣 Til: ${userInfo.language}\n📍 IP: ${userInfo.ip}\n🌍 Davlat: ${userInfo.country}\n🏙 Shahar: ${userInfo.city}\n📡 ISP: ${userInfo.isp}`;

      // Telegram botga xabar yuborish
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });
    })
    .catch((error) => console.error("Geolokatsiya ma'lumotlarini olishda xatolik:", error));


Location();

 
