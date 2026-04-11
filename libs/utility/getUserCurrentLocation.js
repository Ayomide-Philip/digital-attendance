export default async function getUserCurrentGeoLocation() {
  try {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
    }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });

  } catch (err) {
    console.log(err);
    throw new Error("Failed to get user's current location.");
  }
}
