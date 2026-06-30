import SmoothScroll from "@/components/providers/SmoothScroll";
import Grain from "@/components/ui/Grain";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Grain />
      <Cursor />
      <Nav />
      <SmoothScroll>
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
