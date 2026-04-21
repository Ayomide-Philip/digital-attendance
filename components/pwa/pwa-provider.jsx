"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { toast } from "sonner";

const PwaContext = createContext(null);

export function PwaProvider({ children }) {
  const deferredPromptRef = useRef(null);
  const waitingWorkerRef = useRef(null);
  const shouldReloadRef = useRef(false);
  const [canInstall, setCanInstall] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .getRegistrations()
          .then((registrations) => {
            registrations.forEach((registration) => registration.unregister());
          })
          .catch(() => {});
      }

      setCanInstall(false);
      setUpdateAvailable(false);
      return;
    }

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    setIsInstalled(isStandalone);

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      deferredPromptRef.current = event;

      if (!isStandalone) {
        setCanInstall(true);
      }
    };

    const handleAppInstalled = () => {
      deferredPromptRef.current = null;
      setCanInstall(false);
      setIsInstalled(true);
      toast.success("Attendify installed successfully.");
    };

    const handleControllerChange = () => {
      if (shouldReloadRef.current) {
        shouldReloadRef.current = false;
        window.location.reload();
      }
    };

    const registerServiceWorker = async () => {
      if (!("serviceWorker" in navigator)) {
        return;
      }

      try {
        const registration = await navigator.serviceWorker.register("/sw.js");

        if (registration.waiting && navigator.serviceWorker.controller) {
          waitingWorkerRef.current = registration.waiting;
          setUpdateAvailable(true);
        }

        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;

          if (!installingWorker) {
            return;
          }

          installingWorker.addEventListener("statechange", () => {
            if (
              installingWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              waitingWorkerRef.current =
                registration.waiting || installingWorker;
              setUpdateAvailable(true);
              toast.info("A new version is ready. Update to refresh the app.");
            }
          });
        });

        navigator.serviceWorker.addEventListener(
          "controllerchange",
          handleControllerChange,
        );
      } catch {
        toast.error("Service worker registration failed.");
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    registerServiceWorker();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      navigator.serviceWorker?.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
    };
  }, []);

  const promptInstall = async () => {
    const deferredPrompt = deferredPromptRef.current;

    if (!deferredPrompt) {
      toast.error("Install prompt is not ready yet.");
      return false;
    }

    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      deferredPromptRef.current = null;
      setCanInstall(false);

      if (choiceResult?.outcome === "accepted") {
        toast.success("Installing Attendify in standalone mode.");
        return true;
      }

      toast("Install dismissed.");
      return false;
    } catch {
      toast.error("Unable to open the install prompt.");
      return false;
    }
  };

  const applyUpdate = async () => {
    const waitingWorker = waitingWorkerRef.current;

    if (!waitingWorker) {
      toast.error("Update is not ready yet.");
      return false;
    }

    try {
      shouldReloadRef.current = true;
      waitingWorkerRef.current = null;
      setUpdateAvailable(false);
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      toast.success("Updating to the latest version...");
      return true;
    } catch {
      shouldReloadRef.current = false;
      toast.error("Unable to apply the update.");
      return false;
    }
  };

  const value = useMemo(
    () => ({
      canInstall: canInstall && !isInstalled,
      updateAvailable,
      isInstalled,
      promptInstall,
      applyUpdate,
    }),
    [canInstall, updateAvailable, isInstalled],
  );

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
}

export function usePwa() {
  const context = useContext(PwaContext);

  if (!context) {
    throw new Error("usePwa must be used within a PwaProvider.");
  }

  return context;
}
