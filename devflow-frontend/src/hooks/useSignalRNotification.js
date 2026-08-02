import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { useAuth } from "../context/useAuth";

/**
 * Custom hook to manage SignalR WebSocket connection to /notificationHub
 */
export const useSignalRNotification = (onNotificationReceived) => {
  const connectionRef = useRef(null);
  const callbackRef = useRef(onNotificationReceived);
  const { accessToken } = useAuth();

  useEffect(() => {
    callbackRef.current = onNotificationReceived;
  }, [onNotificationReceived]);

  useEffect(() => {
    if (!accessToken) return;

    const hubUrl = import.meta.env.VITE_SIGNALR_HUB_URL || "http://localhost:5000/notificationHub";

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () =>
          localStorage.getItem("accessToken") || localStorage.getItem("token") || "",
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    connection.on("ReceiveNotification", (notification) => {
      if (callbackRef.current) {
        callbackRef.current(notification);
      }
    });

    connection
      .start()
      .then(() => {
        console.info("Connected to SignalR Notification Hub");
      })
      .catch((err) => {
        console.error("SignalR connection failed:", err?.message || err);
      });

    connectionRef.current = connection;

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
    };
  }, [accessToken]);
};

export default useSignalRNotification;
