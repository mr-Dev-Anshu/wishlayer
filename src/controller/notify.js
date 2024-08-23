import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const notify = (num, message) => {
  console.log(num);
  if (num === 1) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000, // auto close the toast after 3 seconds
    });
  } else {
    toast.error(message, {
      position: "top-left",
      autoClose: false, // makes the toast persistent (until manually closed)
    });
  }
};
