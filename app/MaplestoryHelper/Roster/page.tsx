'use client';

import { useState } from "react";

interface InputOptions {
  type: string,
  min?: number,
  max?: number,
}

const defaultCharacter = {
  level: 260,
  arcane: 1350,
  sacred: 660
}

export default function Roster() {
  const [characters, setCharacters] = useState(new Map().set('Character 1', defaultCharacter));
  const [selected, setSelected] = useState('Character 1');

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
    for (const [key, value] of characters.entries()) {
      if (key == oldKey) {
        newMap.set(e.target.value, value);
      } else {
        newMap.set(key, value);
      }
    }
    setCharacters(newMap);
    setSelected(e.target.value);
  }

  const handleCharacterPropertyChange = (e: React.ChangeEvent<HTMLInputElement>, property: string, options: InputOptions) => {
    const newMap = new Map(characters);
    const value = newMap.get(selected);
    if (value) {
      if (options.type == 'number') {
        // need to work on validation

        // let number = parseInt(e.target.value);
        // console.log(number);
        // // if (!Number.isInteger(number)) { // If not a number
        // //   return;
        // // }
        // // if (options.min && options.max) {
        // //   if (number < options.min) {
        // //     e.target.value = '';
        // //   }
        // // }
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
      <div className="panel flex flex-wrap">
        <div className="flex flex-wrap gap-5">
          <label className="font-bold">Name:
            <input type="text" className="maple-input font-normal w-33" minLength={0} maxLength={12} value={selected} onChange={(e) => handleNameChange(e)}></input>
          </label>    
          <label className="font-bold">Level:
            <input type="number" className="maple-input font-normal w-16" min={1} max={300} value={characters.get(selected).level} onChange={(e) => handleCharacterPropertyChange(e, 'level', {type: 'number', min: 1, max: 300})}></input>
          </label>   
        </div> 
      </div>
    </section>
  );
}