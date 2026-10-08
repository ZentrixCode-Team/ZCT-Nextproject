import Navbar from "./Navbar";
import Footer from "./Footer";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen bg-[#05070a] text-white selection:bg-cyan-400/20 selection:text-cyan-300">
      <Navbar />

      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>

      <Footer />
    </div>
  );
}