import { Outfit} from "next/font/google";
import "./globals.css";

import QueryClientProviderWrapper from "./queryProvider"; // Import the new component
import { Toaster } from "react-hot-toast";



const outfit = Outfit({
  variable:"--outfit",
  subsets:["latin"]
})

export const metadata = {
  title: "FruitionMotors",
  description: "Your trusted partner in finding the perfect vehicle...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className}  antialiased`}>
        <QueryClientProviderWrapper>
          {children}
          <Toaster />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}