export default function getUserCurrentGeoLocation() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Geolocation only works in the browser"));
  }

  if (!navigator.geolocation) {
    return Promise.reject(
      new Error("Geolocation is not supported by this browser."),
    );
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
}

export function watchLocationWithBounds(onFinish, onError) {
  if (typeof window === "undefined") {
    throw new Error("Geolocation only works in the browser");
  }

  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser");
  }

  let firstLocation = null;
  let lastLocation = null;

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      };

      // set first location only once
      if (!firstLocation) {
        firstLocation = coords;
      }

      // always update last location
      lastLocation = coords;
    },
    (error) => {
      onError?.(error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    },
  );

  // return control function
  return {
    stop: () => {
      navigator.geolocation.clearWatch(watchId);

      onFinish?.({
        firstLocation,
        lastLocation,
      });
    },
  };
}

export function stopWatchLocation(watchId) {
  if (typeof window !== "undefined") {
    navigator.geolocation.clearWatch(watchId);
  }
}

// const connection =
// navigator.connection || navigator.mozConnection || navigator.webkitConnection;
