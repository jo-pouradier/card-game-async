import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  removeNotification,
  selectNotifications,
} from "../../slices/notificationSlice";

const NotificationsSnackbars = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();

  const handleClose = (id: number) => {
    dispatch(removeNotification({ id }));
  };

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration || 4000}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ marginTop: "50px" }} // appear below the navbar
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            sx={{ width: "100%" }}
            severity={notification.severity || "info"}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default NotificationsSnackbars;
