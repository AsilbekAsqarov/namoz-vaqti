const city = document.getElementById("city");
// Api namaz time
const getApi = (lat, lon) => {
  const now = new Date();
  let year = now.getFullYear();
  let mon = now.getMonth();
  let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let mons = months[mon];
  const url = `https://api.aladhan.com/v1/calendar/${year}/${mons}?latitude=${lat}&longitude=${lon}&method=3`;
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

Location();
