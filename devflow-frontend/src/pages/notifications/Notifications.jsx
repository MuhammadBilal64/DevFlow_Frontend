import { useState, useEffect, useCallback } from "react";
import { Bell, Check, UserPlus, FolderKanban, CheckCircle2, Workflow as WorkflowIcon } from "lucide-react";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/notificationService";
import { dispatchNotificationCountRefresh } from "../../utils/notificationEvents";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";

const iconMap = {
  0: { icon: Bell, bg: "bg-[#3D2109] text-[#FBBF24]" }, // TaskAssigned
  1: { icon: CheckCircle2, bg: "bg-[#0B3B26] text-[#34D399]" }, // TaskCompleted
  2: { icon: FolderKanban, bg: "bg-[#0C2448] text-[#38BDF8]" }, // ProjectCreated
  3: { icon: UserPlus, bg: "bg-[#2D164B] text-[#C084FC]" }, // MemberAdded
  4: { icon: WorkflowIcon, bg: "bg-[#2D164B] text-[#C084FC]" }, // Workflow
};

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState("");

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getMyNotifications();
      const raw = response?.data || response;
      const items = Array.isArray(raw) ? raw : raw?.items ?? [];
      setNotifications(items);
    } catch (err) {
      console.warn("Could not fetch notifications:", err?.message || err);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    const previousNotifications = notifications;
    setActionError("");
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await markAllNotificationsAsRead();
      dispatchNotificationCountRefresh();
    } catch (err) {
      setNotifications(previousNotifications);
      setActionError(err?.message || "Failed to mark all notifications as read.");
    }
  };

  const handleMarkSingleRead = async (id) => {
    const previousNotifications = notifications;
    setActionError("");
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    try {
      await markNotificationAsRead(id);
      dispatchNotificationCountRefresh();
    } catch (err) {
      setNotifications(previousNotifications);
      setActionError(err?.message || "Failed to mark notification as read.");
    }
  };

  const handleNotificationKeyDown = (event, item) => {
    if (!item.isRead && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleMarkSingleRead(item.id);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Stay informed on activity, task mentions, and pipeline updates.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#121721] px-3.5 py-2 text-xs font-semibold text-white hover:border-[#374151] transition active:scale-95"
          >
            <Check size={14} />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {actionError && (
        <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
          {actionError}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-16 w-full" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No Notifications"
          description="You are all caught up! There are no unread or recent workspace notifications at this moment."
        />
      ) : (
        <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4">
          {notifications.map((item) => {
            const style = iconMap[item.type ?? 0] || iconMap[0];
            const IconComp = style.icon;
            const timeStr = item.createdAt
              ? new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "Recent";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => !item.isRead && handleMarkSingleRead(item.id)}
                onKeyDown={(event) => handleNotificationKeyDown(event, item)}
                disabled={item.isRead}
                className={`flex w-full items-start justify-between rounded-xl border p-4 text-left transition ${
                  item.isRead
                    ? "border-[#1F2937]/40 bg-[#0B0F17]/30 opacity-75 cursor-default"
                    : "border-[#1D63ED]/30 bg-[#0C2448]/20 hover:border-[#1D63ED] cursor-pointer"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.bg}`}>
                    <IconComp size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-semibold text-white">
                        {item.title || "Notification"}
                      </h3>
                      {!item.isRead && (
                        <span className="h-2 w-2 rounded-full bg-[#1D63ED]" />
                      )}
                    </div>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      {item.message || item.description}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-[#6B7280]">{timeStr}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notifications;
