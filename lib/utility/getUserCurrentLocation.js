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

  const samples = [];

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const fullData = {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        },
        timestamp: position.timestamp,
      };

      samples.push(fullData);

      if (samples.length > 20) {
        samples.shift();
      }
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

  return {
    stop: () => {
      navigator.geolocation.clearWatch(watchId);

      onFinish?.({
        samples,
        first: samples[0] || null,
        last: samples[samples.length - 1] || null,
        count: samples.length,
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
