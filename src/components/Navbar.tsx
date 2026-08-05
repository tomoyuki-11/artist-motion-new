"use client";

import { useState, useEffect } from "react";
import { InstagramIcon, LineIcon, YouTubeIcon } from "@/components/icons/BrandIcons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setVisible(true);
      } else if (y > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    window.history.pushState(null, "", `#${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image
            src="/images/logo-transparent.png"
            alt="ARTIST MOTION Logo"
            width={40}
            height={40}
            priority
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold text-slate-800">
            ARTISTMOTION
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-8">
          {isHome ? (
            <button
              onClick={() => scrollToSection("news")}
              className="text-slate-700 hover:text-slate-900 transition font-semibold"
            >
              お知らせ
            </button>
          ) : (
            <Link
              href="/#news"
              className="text-slate-700 hover:text-slate-900 transition font-semibold"
            >
              お知らせ
            </Link>
          )}
          {isHome ? (
            <button
              onClick={() => scrollToSection("services")}
              className="text-slate-700 hover:text-slate-900 transition font-semibold"
            >
              事業内容
            </button>
          ) : (
            <Link
              href="/#services"
              className="text-slate-700 hover:text-slate-900 transition font-semibold"
            >
              事業内容
            </Link>
          )}
          {isHome ? (
            <button
              onClick={() => scrollToSection("voice")}
              className="text-slate-700 hover:text-slate-900 transition font-semibold"
            >
              お客様の声
            </button>
          ) : (
            <Link
              href="/#voice"
              className="text-slate-700 hover:text-slate-900 transition font-semibold"
            >
              お客様の声
            </Link>
          )}
          {isHome ? (
            <button
              onClick={() => scrollToSection("column")}
              className="text-slate-700 hover:text-slate-900 transition font-semibold"
            >
              子育てコラム
            </button>
          ) : (
            <Link
              href="/#column"
              className="text-slate-700 hover:text-slate-900 transition font-semibold"
            >
              子育てコラム
            </Link>
          )}
          <Link
            href="/faq"
            className="text-slate-700 hover:text-slate-900 transition font-semibold"
          >
            よくある質問
          </Link>

          <a
            href="https://www.instagram.com/artist.motion_fuburyu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-orange-500 hover:bg-orange-100 transition p-1.5 rounded-full"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-6 h-6 text-orange-500" />
          </a>
          <a
            href="https://line.me/R/ti/p/@548udakm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-[#06C755] hover:bg-[#BBF7D0] transition p-1.5 rounded-full"
            aria-label="LINE"
          >
            <LineIcon className="w-6 h-6 text-[#06C755]" />
          </a>
          <a
            href="https://www.youtube.com/@%E9%A2%A8%E8%88%9E%E6%B5%81%E6%9B%B2%E6%8A%80%E5%A4%AA%E9%BC%93%E8%B0%B7%E5%8F%A3%E7%9C%9F"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-[#FF0000] hover:bg-[#FECACA] transition p-1.5 rounded-full"
            aria-label="YouTube"
          >
            <YouTubeIcon className="w-6 h-6 text-[#FF0000]" />
          </a>

          {isHome ? (
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 transition"
            >
              お問い合わせ
            </button>
          ) : (
            <Link
              href="/#contact"
              className="px-6 py-2 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 transition inline-block"
            >
              お問い合わせ
            </Link>
          )}
        </div>

        {/* Mobile Menu Button - Animated Hamburger */}
        <button
          className="xl:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <div className="relative w-6 h-4.5 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ease-in-out origin-center ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-slate-800 rounded-full transition-all duration-300 ease-in-out origin-center ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation - Navy themed with smooth animation */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "max-h-175 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#1a2e5a" }}
      >
        <div className="container py-5">
          <div className="space-y-1">
            {isHome ? (
              <button
                onClick={() => scrollToSection("news")}
                className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
              >
                お知らせ
              </button>
            ) : (
              <Link
                href="/#news"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
              >
                お知らせ
              </Link>
            )}

            <div className="h-px bg-white/10 mx-4" />

            {isHome ? (
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
              >
                事業内容
              </button>
            ) : (
              <Link
                href="/#services"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
              >
                事業内容
              </Link>
            )}

            <div className="h-px bg-white/10 mx-4" />

            {isHome ? (
              <button
                onClick={() => scrollToSection("voice")}
                className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
              >
                お客様の声
              </button>
            ) : (
              <Link
                href="/#voice"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
              >
                お客様の声
              </Link>
            )}

            <div className="h-px bg-white/10 mx-4" />

            {isHome ? (
              <button
                onClick={() => scrollToSection("column")}
                className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
              >
                子育てコラム
              </button>
            ) : (
              <Link
                href="/#column"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
              >
                子育てコラム
              </Link>
            )}

            <div className="h-px bg-white/10 mx-4" />

            <Link
              href="/faq"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 transition font-semibold tracking-wide"
            >
              よくある質問
            </Link>

            <div className="h-px bg-white/20 mx-4 my-2" />

            <div className="flex gap-3 px-4 py-2">
              <a
                href="https://www.instagram.com/artist.motion_fuburyu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white/10 hover:bg-white/20 transition gap-1"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6 text-orange-400" />
                <span className="text-[10px] font-medium text-white/70">Instagram</span>
              </a>
              <a
                href="https://line.me/R/ti/p/@548udakm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white/10 hover:bg-white/20 transition gap-1"
                aria-label="LINE"
              >
                <LineIcon className="w-6 h-6 text-[#06C755]" />
                <span className="text-[10px] font-medium text-white/70">LINE</span>
              </a>
              <a
                href="https://www.youtube.com/@%E9%A2%A8%E8%88%9E%E6%B5%81%E6%9B%B2%E6%8A%80%E5%A4%AA%E9%BC%93%E8%B0%B7%E5%8F%A3%E7%9C%9F"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white/10 hover:bg-white/20 transition gap-1"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-6 h-6 text-[#FF0000]" />
                <span className="text-[10px] font-medium text-white/70">YouTube</span>
              </a>
            </div>

            {isHome ? (
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full rounded-xl bg-white text-[#1a2e5a] px-4 py-3.5 font-bold hover:bg-white/90 transition tracking-wide"
              >
                お問い合わせ
              </button>
            ) : (
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center rounded-xl bg-white text-[#1a2e5a] px-4 py-3.5 font-bold hover:bg-white/90 transition tracking-wide"
              >
                お問い合わせ
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
