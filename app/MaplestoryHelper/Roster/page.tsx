'use client';

import { useState } from "react";
import { numberInputValidation } from "../pipes";
import ClassInfo from './ClassInfo.json';
import './page.css';

const defaultCharacter = {
  class: 'Adele', 
  level: 260,
  arcane: 1350,
  sacred: 660,
  weapon: 'Genesis',
  weaponSF: 22,
  weaponAttack: 'T7',
  weaponFlame: 0,
}

interface MaplestoryClass {
  "Main Stat": string,
   Soul: string,
}

export default function Roster() {
  const [characters, setCharacters] = useState(new Map().set('Character 1', defaultCharacter));
  const [selected, setSelected] = useState('Character 1');
  const classInfo = new Map<string, MaplestoryClass>(Object.entries(ClassInfo));
  const weapons = ['Absolab', 'Arcane', 'Genesis'];
  const weaponsSF = [...Array(31).keys()].reverse();
  const weaponsAttack = ['T5', 'T6', 'T7'];

  const addNewCharacter = () => {
    let defaultName = 'Character ';
    let index = 1;
    while (characters.has(defaultName + index)) {
      index++;
    }
    setCharacters(new Map(characters).set(defaultName + index, defaultCharacter));
    setSelected(defaultName + index);
  }

  const deleteCharacter = () => {
    let newMap = new Map(characters);
    let keysArray = Array.from(newMap.keys());
    let targetIndex = keysArray.indexOf(selected);
    let previousKey = undefined;
    if (targetIndex > 0) {
      previousKey = keysArray[targetIndex - 1];
    } else {
      if (keysArray.length > 0) {
        previousKey = keysArray[1];        
      }
    }
    newMap.delete(selected);
    if (characters.size > 1) {
      setCharacters(newMap);
      setSelected(previousKey);
    } else {
      newMap.set('Character 1', defaultCharacter);
      setCharacters(newMap);
      setSelected('Character 1');
    }
  }

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select();
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
    let value = newMap.get(selected);
    if (value) {
      if (e.target.type == 'number') {
        if (property == 'level') {
          numberInputValidation(e as React.ChangeEvent<HTMLInputElement>, 1);
        } else if (property == 'arcane' || property == 'sacred' || property == 'weaponFlame') {
          numberInputValidation(e as React.ChangeEvent<HTMLInputElement>, 0);
        }
      }
      if (property == 'weapon') {
        if (e.target.value == 'Genesis') {
          value.weaponSF = '22';
        }
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
        <button className="font-bold shadow rounded-lg px-4 py-1 bg-[var(--color-maplestory-red-selected)] hover:bg-[var(--color-maplestory-red-hover)] text-white flex justify-center items-center relative cursor-pointer" onClick={() => deleteCharacter()}>
          Delete Character
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
            <input type="number" className="maple-input font-normal w-16" onFocus={handleFocus} minLength={1} maxLength={300} value={characters.get(selected).level} onChange={(e) => handleCharacterPropertyChange(e, 'level')}></input>
          </label>   
        </div> 
        <div className="flex flex-wrap gap-5">
          <label className="font-bold">Arcane:
            <input type="number" className="maple-input font-normal w-16" onFocus={handleFocus} minLength={0} maxLength={1760} value={characters.get(selected).arcane} onChange={(e) => handleCharacterPropertyChange(e, 'arcane')}></input>
          </label>    
          <label className="font-bold">Sacred:
            <input type="number" className="maple-input font-normal w-16" onFocus={handleFocus} minLength={0} maxLength={880} value={characters.get(selected).sacred} onChange={(e) => handleCharacterPropertyChange(e, 'sacred')}></input>
          </label>    
        </div> 
        <div className="flex flex-wrap w-120">
          <div className="equipment-header w-full z-2 h-7">WSE</div>
          <div className="flex flex-col w-25">
            <div className="equipment-category h-7">Category</div>
            <div className="equipment-category h-7">Name</div>
            <div className="equipment-category h-7">Starforce</div>
            <div className="equipment-category h-7">Flame
              <div className="relative group">
                <div className="border-1 rounded-lg w-3.5 h-3.5 flex text-xs justify-center items-center ml-2 cursor-pointer">
                  ?
                </div>
                <div className="hidden group-hover:block absolute left-8 top-0 w-100 bg-black p-2 border-1 pointer-events-none">
                  Use the calculator below to get the flame score.<br /><br />
                  For the weapon only, the three dropdowns are: Attack/Magic Attack, Boss Damage, and Damage
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-56">
            <div className="equipment-category h-7">Weapon</div>
            <div className="equipment-row h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-25 h-6" value={characters.get(selected).weapon} onChange={(e) => handleCharacterPropertyChange(e, 'weapon')}>
                {weapons.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="equipment-row row-dark h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-25 h-6" value={characters.get(selected).weaponSF} onChange={(e) => handleCharacterPropertyChange(e, 'weaponSF')}>
                {weaponsSF.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="equipment-row h-7">
              <select className="maple-input bg-white text-center font-normal px-2 py-0.5 w-11 h-6" value={characters.get(selected).weaponAttack} onChange={(e) => handleCharacterPropertyChange(e, 'weaponAttack')}>
                {weaponsAttack.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <select className="maple-input bg-white text-center font-normal px-2 py-0.5 w-11 h-6" value={characters.get(selected).weaponBoss} onChange={(e) => handleCharacterPropertyChange(e, 'weaponBoss')}>
                {weaponsAttack.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <select className="maple-input bg-white text-center font-normal px-2 py-0.5 w-11 h-6" value={characters.get(selected).weaponDamage} onChange={(e) => handleCharacterPropertyChange(e, 'weaponDamage')}>
                {weaponsAttack.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <input type="number" className="maple-input font-normal w-14 mr-2 bg-white" minLength={0} maxLength={300} onFocus={handleFocus} value={characters.get(selected).weaponFlame} onChange={(e) => handleCharacterPropertyChange(e, 'weaponFlame')}></input>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}