"use client";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import "@/styles/home.css"

const tabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "menu", label: "Menu", path: "/menu" },
  { id: "booking", label: "Booking", path: "/booking" },
  { id: "delivery", label: "Delivery", path: "/delivery" },
  { id: "about", label: "About", path: "/about" },
];

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
    <div>
        <div id="home-header">
          <Image
            className="home-logo"
            src="/logoSuShiX.svg"
            alt="Next.js logo"
            width={198}
            height={55}
            priority
          />
          <Sidebar links={tabs}/>
          <div>
            <button id="signUp" className="home-btn">
                Sign In
            </button>
          </div>
        </div>
        
        <main className="flex-1">
          <div className="home-contentGroup home-contentGroup1">
            <Image
              className=""
              src="/home_1.svg"
              alt="home_1"
              width={1150}
              height={700}
              priority
            />
            <p className="home-contentTitle home-contentGroup__text1">Welcome to Our Restaurant</p>
            <svg width="504" height="4" viewBox="0 0 504 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2H502" stroke="#EA6D27" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <p className="home-contentDescription0">SushiX Japanese Restaurant is the inheritance and perfection of the SushiY brand,  with a close and friendly Japanese restaurant model and nearly 100 Japanese dishes and desserts to serve Vietnamese friends who visit to enjoy every day.
            </p>
          </div>
          <div  className="home-contentGroup home-contentGroupGray home-contentGroup2">
            <Image
              className=""
              src="/home_2.svg"
              alt="home_2"
              width={880}
              height={600}
              priority
            />
          </div>
          <div id="home-contentGroupContent_1" className="home-contentGroupContent">
            <p className="home-contentTitle home-contentGroup__text1">Menu</p>
            <svg width="200" height="4" viewBox="0 0 200 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2H502" stroke="#EA6D27" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <p className="home-contentDescription0 home-contentDescription1">
              SushiX menu is diverse with fresh colors from Lobster Sashimi, Japanese Scallops, Miyagi Oysters, etc. The key to culinary success comes from the freshest ingredients made from the talented hands of the chef.              </p>
          </div>

          <div  className="home-contentGroup">
            <Image
              className=""
              src="/home_3.svg"
              alt="home_3"
              width={880}
              height={600}
              priority
            />
          </div>
          <div id="home-contentGroupContent_2" className="home-contentGroupContent home-contentGroupContent1">
            <p className="home-contentTitle home-contentGroup__text1">Reservation</p>
            <svg width="200" height="4" viewBox="0 0 200 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2H502" stroke="#EA6D27" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <p className="home-contentDescription home-contentDescription1">
              SushiX menu is diverse with fresh colors from Lobster Sashimi, Japanese Scallops, Miyagi Oysters, etc. The key to culinary success comes from the freshest ingredients made from the talented hands of the chef.              </p>
          </div>
        </main>
    </div>
  );
}
