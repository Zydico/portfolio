'use client';

import { useState } from "react";
import { numberInputValidation } from "../pipes";
import ClassInfo from './ClassInfo.json';

const defaultCharacter = {
  class: 'Adele', 
  level: 260,
  arcane: 1350,
  sacred: 660,
}

interface MaplestoryClass {
  "Main Stat": string,
   Soul: string,
}

export default function Roster() {
  const [characters, setCharacters] = useState(new Map().set('Character 1', defaultCharacter));
  const [selected, setSelected] = useState('Character 1');
  const classInfo = new Map<string, MaplestoryClass>(Object.entries(ClassInfo));

  const addNewCharacter = () => {
    let defaultName = 'Character ';
    let index = 1;
    while (characters.has(defaultName + index)) {
      index++;
    }
    setCharacters(new Map(characters).set(defaultName + index, defaultCharacter));
    setSelected(defaultName + index);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMap = new Map();
    const oldKey = selected;
    for (const [key, value] of characters.entries()) { // done like this to preserve list order
      if (key == oldKey) {
        newMap.set(e.target.value, value);
      } else {
        newMap.set(key, value);
      }
    }
    setCharacters(newMap);
    setSelected(e.target.value);
  }

  const handleCharacterPropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: string) => {
    const newMap = new Map(characters);
    const value = newMap.get(selected);
    if (value) {
      if (e.target.type == 'number') {
        numberInputValidation(e as React.ChangeEvent<HTMLInputElement>);
      }
      newMap.set(selected, {...value, [property]: e.target.value});
    }
    setCharacters(newMap);
  }

  return (
    <section>
      <div className="inline-flex panel flex-wrap gap-5 mb-5">
        <label className="font-bold">Character:
          <select className="maple-input font-normal px-2 py-1 w-33" value={selected} onChange={(event) => setSelected(event.target.value)}>
            {[...characters.entries()].map(([key, character]) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <button className="font-bold shadow rounded-lg px-4 py-1 bg-[var(--color-maplestory-orange-selected)] hover:bg-[var(--color-maplestory-orange-hover)] text-white flex justify-center items-center relative cursor-pointer" onClick={() => addNewCharacter()}>
          Add New Character
        </button>
      </div>
      <div className="panel flex flex-wrap flex-col gap-3">
        <div className="flex flex-wrap gap-5">
          <label className="font-bold">Name:
            <input type="text" className="maple-input font-normal w-33" minLength={0} maxLength={12} value={selected} onChange={(e) => handleNameChange(e)}></input>
          </label>
          <label className="font-bold">Class:
            <select className="maple-input font-normal px-2 py-1 w-33" value={characters.get(selected).class} onChange={(e) => handleCharacterPropertyChange(e, 'class')}>
              {[...classInfo.entries()].map(([key, mapleClass]) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>    
          <label className="font-bold">Level:
            <input type="number" className="maple-input font-normal w-16" minLength={0} maxLength={300} value={characters.get(selected).level} onChange={(e) => handleCharacterPropertyChange(e, 'level')}></input>
          </label>   
        </div> 
        <div className="flex flex-wrap gap-5">
          <label className="font-bold">Arcane:
            <input type="number" className="maple-input font-normal w-16" minLength={0} maxLength={1760} value={characters.get(selected).arcane} onChange={(e) => handleCharacterPropertyChange(e, 'arcane')}></input>
          </label>    
          <label className="font-bold">Sacred:
            <input type="number" className="maple-input font-normal w-16" minLength={0} maxLength={880} value={characters.get(selected).sacred} onChange={(e) => handleCharacterPropertyChange(e, 'sacred')}></input>
          </label>    
        </div> 
      </div>
    </section>
  );
}