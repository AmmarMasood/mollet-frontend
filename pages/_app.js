import "../styles/globals.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
