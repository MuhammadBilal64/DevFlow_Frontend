import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

/**
 * Custom hook to manage SignalR WebSocket connection to /notificationHub
 * (details.md Section 4 & Module 7)
 */
export const useSignalRNotification = (onNotificationReceived) => {
  const connectionRef = useRef(null);
  const callbackRef = useRef(onNotificationReceived);

  // Keep callbackRef up to date without triggering reconnection
  useEffect(() => {
    callbackRef.current = onNotificationReceived;
  }, [onNotificationReceived]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (!token) return;

    const hubUrl = import.meta.env.VITE_SIGNALR_HUB_URL || "https://localhost:7106/notificationHub";

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => localStorage.getItem("accessToken") || localStorage.getItem("token") || "",
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.None)
      .build();

    connection.on("ReceiveNotification", (notification) => {
      console.log("🔔 Real-time notification received via SignalR:", notification);
      if (callbackRef.current) {
        callbackRef.current(notification);
      }
    });

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR Notification Hub");
      })
      .catch((err) => {
        // Silent background warning
      });

    connectionRef.current = connection;

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, []);
};


export default useSignalRNotification;
