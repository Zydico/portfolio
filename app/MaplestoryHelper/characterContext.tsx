'use client';

import { createContext, useContext, useState } from "react";
import { Character, defaultCharacter } from "./character";

type CharacterContextType = {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
};

const CharacterContext = createContext<CharacterContextType | null>(null);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([defaultCharacter]);

  return (
    <CharacterContext.Provider value={{ characters, setCharacters }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacters() {
  const ctx = useContext(CharacterContext);
  if (!ctx) throw new Error("useCharacters must be used within CharacterProvider");
  return ctx;
}