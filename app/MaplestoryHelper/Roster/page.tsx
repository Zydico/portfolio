'use client';

import { useState } from "react";

export default function Roster() {
  const [characters, setCharacters] = useState(['Character 1'] as string[]);
  const [selected, setSelected] = useState('');

  const addNewCharacter = () => {
    let defaultName = 'Character ';
    if (characters.includes(defaultName + (characters.length+1))) {
      defaultName = defaultName + (characters.length+2);
    } else {
      defaultName = defaultName + (characters.length+1);
    }
    setCharacters([...characters, defaultName]);
    setSelected(defaultName);
  }

  return (
    <section>
      <div className="inline-flex panel flex-wrap gap-5 mb-5">
        <label className="font-bold">Character:
          <select className="font-normal ml-2 shadow px-2 py-1 border-1 border-[var(--color-maplestory-light-gray-darker)]" value={selected ?? ''} onChange={(event) => setSelected(event.target.value)}>
            {characters.map((character) => (
              <option key={character} value={character}>
                {character}
              </option>
            ))}
          </select>
        </label>
        <button className="font-bold shadow rounded-lg px-4 py-1 bg-[var(--color-maplestory-orange-selected)] hover:bg-[var(--color-maplestory-orange-hover)] text-white flex justify-center items-center relative cursor-pointer" onClick={() => addNewCharacter()}>
          Add New Character
        </button>
      </div>
      <div className="panel flex flex-wrap"></div>
    </section>
  );
}