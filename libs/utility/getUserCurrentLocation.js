export default function getUserCurrentGeoLocation() {
  try {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
    }
    prin(navigator.geolocation.getCurrentPosition());
  } catch (err) {
    console.log(err);
  }
}
