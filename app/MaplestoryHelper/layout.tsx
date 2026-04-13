import type { Metadata } from "next";
import { CharacterProvider } from './characterContext';
import Navigation from "./Navigation/Navigation";
import './page.css';

export const metadata: Metadata = {
  title: "Maplestory Helper",
  description: "A website developed by Zydico to assist players in Maplestory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen text-black text-md bg-(--color-maplestory-background-gray)">
        <div>
          <section>
              <Navigation></Navigation>
          </section>
        </div>
        <section>
            <div className="pl-44 pt-8 pb-8 pr-8 absolute min-w-full bg-(--color-maplestory-background-gray)">
              <CharacterProvider>
                {children}
              </CharacterProvider>
            </div>
        </section>
    </div>
  );
}
