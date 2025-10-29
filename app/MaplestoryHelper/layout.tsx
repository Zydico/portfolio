import type { Metadata } from "next";
import Navigation from "./Navigation/Navigation";
import './page.css';

export const metadata: Metadata = {
  title: "Maplestory Helper",
  description: "A website developed by Zydico to assist players in the game Maplestory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-(family-name:--font-body) text-black text-md">
        <div>
          <section>
              <Navigation></Navigation>
          </section>
        </div>
        <section>
            <div className="pl-50 pt-8 pb-8 pr-8 absolute w-full h-full bg-(--color-maplestory-background-gray)">
              {children}
            </div>
        </section>
    </div>
  );
}
