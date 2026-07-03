/* import './globals.css'; */
import Navbar from './components/Navbar';

export const metadata = {
  title: 'SAZIN Innovative Industries Ltd. — Industrial Valve Solutions',
  description: 'Premium industrial valves: Gate, Butterfly, Check, Pressure Control, Alarm Valves & Y-Strainers. EN & ISO certified.',
};

export default function RootLayout({ children }) {
  return (
      <div className="antialiased ">
        {/* <CartProvider> */}
          <Navbar />
          <main className="min-h-screen ">{children}</main>
          {/* <Footer /> */}
        {/* </CartProvider> */}
      </div>
  );
}