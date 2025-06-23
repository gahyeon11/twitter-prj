import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { NotificationProps } from "pages/notifiaction";
import { useNavigate } from "react-router-dom";

import styles from "./Notification.module.scss";

export default function NotificationBox({
  notification,
}: {
  notification: NotificationProps;
}) {
  const navigate = useNavigate();
  const onClickNotification = async (url: string) => {
    const ref = doc(db, "notifications", notification.id);
    await updateDoc(ref, {
      isRead: true,
    });
    navigate(url);
  };
  return (
    <div key={notification.id} className={styles.notification}>
      <div onClick={() => onClickNotification(notification?.url)}>
        <div className= {styles.notification_flex}>
          <div className={styles.notification_createdAt}>
            {notification?.createdAt}
          </div>
          {notification?.isRead === false && (
            <div className={styles.notification_unread} />
          )}
        </div>
        <div className={styles.notification_content}>{notification.content}</div>
      </div>
    </div>
  );
}
