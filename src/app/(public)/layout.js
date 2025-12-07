import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import ToastComponent from "@/components/ToastProvider";

export default function Layout({ children }) {
  return (
    <ChakraProvider>
      <div className="flex justify-center w-full overflow-x-hidden">
        <div className="max-w-[1920px] w-full">
          <Navbar />
        </div>
      </div>

      <div className="flex justify-center w-full overflow-x-hidden">
        <div className="my-36 max-w-[1920px] w-full">{children}</div>
      </div>

      <div className="flex justify-center w-full">
        <div className="mb-12 max-w-[2000px] w-full">
          <Footer />
        </div>
      </div>
    </ChakraProvider>
  );
}
