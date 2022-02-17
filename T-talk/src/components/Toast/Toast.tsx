import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const Toast = () => {
   return (
<ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
   )
   
}
export const showToast = (alertMessage: any) => {
   toast(alertMessage.message, {
      position: 'top-center',
      type: alertMessage.status,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
}
export default Toast;