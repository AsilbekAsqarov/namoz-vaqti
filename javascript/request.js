const city = document.getElementById("city");

// Namoz vaqtlarini olish
const getApi = async (lat, lon) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() 0 dan boshlanadi, shuning uchun 1 qo‘shamiz
    const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lon}&method=2`;
    
    const res = await fetch(url);
    const data = await res.json();
    namazMons(data);
  } catch (error) {
    console.error("API xatosi:", error);
    alert("Qandaydur xatolik yuz berdi...");
  }
};

// Joylashuvni aniqlash
const getLocation = async () => {
  if (!navigator.geolocation) {
    alert("Joylashuvni aniqlab bo‘lmadi");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getApi(lat, lon);

      const locUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=uz`;
      const res = await fetch(locUrl);
      const data = await res.json();

      city.innerHTML = data.city || "Joylashuvni olib bo‘lmadi";
    } catch (error) {
      console.error("Joylashuv xatosi:", error);
      city.innerHTML = "Joylashuvni olib bo‘lmadi";
    }
  }, (error) => {
    console.error("Geolocation xatosi:", error);
    alert("Joylashuvni aniqlashda muammo yuz berdi.");
  });
};

getLocation();
