import NotificationBox from "components/notifications/NotificationBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { useContext, useEffect, useState } from "react";
export interface NotificationProps {
  id: string;
  uid: string;
  url: string;
  isRead: boolean;
  content: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const t = useTranslation();

  useEffect(() => {
    if (user) {
      let ref = collection(db, "notifications");
      let notificationQuery = query(
        ref,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(notificationQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setNotifications(dataObj as NotificationProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home_top">
        <div className="home_title">
          <div className="home_title_text">{t("MENU_NOTI")}</div>
        </div>
      </div>
      <div className="post">
        {notifications?.length > 0 ? (
          notifications.map((notification) => (
            <NotificationBox notification={notification} key={notification.id} />
          ))
        ) : (
          <div className="post_no-posts">
            <div className="post_text">{t("NO_NOTIFICATIONS")}</div>
          </div>
        )}
      </div>
    </div>
  );
}
