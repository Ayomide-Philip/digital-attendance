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

export function watchLocationWithBounds(onFinish, onError, options = {}) {
  if (typeof window === "undefined") {
    throw new Error("Geolocation only works in the browser");
  }

  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser");
  }

  const {
    minSamples = 5,
    maxSamples = 20,
    requiredAccuracy = 60,
    maxDurationMs = 60000,
    stopWhenEnoughSamples = false,
  } = options;

  const samples = [];
  const allSamples = [];
  let isStopped = false;

  const stop = (reason = "manual_stop") => {
    if (isStopped) {
      return;
    }

    isStopped = true;
    navigator.geolocation.clearWatch(watchId);
    clearTimeout(timeoutId);

    onFinish?.({
      reason,
      minSamplesRequired: minSamples,
      samples,
      allSamples,
      bestSample:
        samples.length > 0
          ? samples.reduce((best, sample) =>
              sample.coords.accuracy < best.coords.accuracy ? sample : best,
            )
          : null,
      count: samples.length,
      totalReceived: allSamples.length,
      hasEnoughSamples: samples.length >= minSamples,
    });
  };

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

      allSamples.push(fullData);

      if (allSamples.length > maxSamples) {
        allSamples.shift();
      }

      if (fullData.coords.accuracy <= requiredAccuracy) {
        samples.push(fullData);

        if (samples.length > maxSamples) {
          samples.shift();
        }
      }

      if (stopWhenEnoughSamples && samples.length >= minSamples) {
        stop("min_samples_reached");
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

  const timeoutId = setTimeout(() => {
    stop("timeout");
  }, maxDurationMs);

  return {
    stop,
  };
}

export function stopWatchLocation(watchId) {
  if (typeof window !== "undefined") {
    navigator.geolocation.clearWatch(watchId);
  }
}

// const connection =
// navigator.connection || navigator.mozConnection || navigator.webkitConnection;
