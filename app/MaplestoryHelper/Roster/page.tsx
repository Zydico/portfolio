'use client';

import { useEffect, useState } from "react";
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
  weaponFlamePercentage: 0.0,
  weaponPotential: ['---', '---', '---'],
  secondarySF: '---',
  secondary: 'ilvl <= 150',
  secondaryPotential: ['---', '---', '---'],

  secondaryEquivalency: '0.1',
  attEquivalency: '3',
  allStatEquivalency: '10',
  calculatorMainStat: '0',
  calculatorSecondaryStat: '0',
  calculatorAtt: '0',
  calculatorAllStat: '0',
}

interface MaplestoryClass {
  "Main Stat": string,
   Soul: string,
}

export default function Roster() {
  const [characters, setCharacters] = useState(new Map().set('Character 1', defaultCharacter));
  const [selected, setSelected] = useState('Character 1');
  const [calculatorResult, setCalculatorResult] = useState('0');
  const classInfo = new Map<string, MaplestoryClass>(Object.entries(ClassInfo));
  const weapons = ['Absolab', 'Arcane', 'Genesis', 'Destiny'];
  const weaponsSF = [...Array(31).keys()].reverse();
  const weaponsAttack = ['T5', 'T6', 'T7'];
  const weaponsPotentials = ['---', '13% ATT/M.ATT', '10% ATT/M.ATT', '40% Boss', '35% Boss', '30% Boss'];
  const secondaries = ['ilvl <= 150', 'ilvl > 150'];
  const secondariesSF = ['---', ...Array(31).keys()].reverse();
  const secondaryPotentialsLow = ['---', '12% ATT/M.ATT', '9% ATT/M.ATT', '40% Boss', '35% Boss', '30% Boss'];
  const secondaryPotentialsHigh = ['---', '13% ATT/M.ATT', '10% ATT/M.ATT', '40% Boss', '35% Boss', '30% Boss'];

  useEffect(() => {
    const newMap = new Map(characters);
    let value = newMap.get(selected);
    if (value) {
      let main = Number(value.calculatorMainStat);
      let secondaryStat = Number(value.calculatorSecondaryStat);
      let secondaryEquivalency = Number(value.secondaryEquivalency);
      let att = Number(value.calculatorAtt);
      let attEquivalency = Number(value.attEquivalency);
      let allStat = Number(value.calculatorAllStat);
      let allStatEquivalency = Number(value.allStatEquivalency);
      if (!isNaN(main) && !isNaN(secondaryStat) && !isNaN(secondaryEquivalency) && !isNaN(att) && !isNaN(attEquivalency) && !isNaN(allStat) && !isNaN(allStatEquivalency)) {
        setCalculatorResult((main + secondaryStat*secondaryEquivalency + att*attEquivalency + allStat*allStatEquivalency).toString());        
      } else {
        setCalculatorResult('Invalid');   
      }
    }
  }, [characters])

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

  const setCharacterProperty = (characterName: string, newValues: {[key: string]: any}) => {
    const newMap = new Map(characters);
    let value = newMap.get(characterName);
    if (value) {
      for (let propertyName in newValues) {
        newMap.set(characterName, {...value, [propertyName]: newValues[propertyName]});
        value = newMap.get(characterName);
      }
    }
    setCharacters(newMap);
  }

  const defaultStatEquivalencies = () => {
    setCharacterProperty(selected, {
      'secondaryEquivalency': '0.1',
      'attEquivalency': '3',
      'allStatEquivalency': '10',
    });
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

  const handleCharacterPropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: string, propertyLine?: number) => {
    const newMap = new Map(characters);
    let value = newMap.get(selected);
    if (value) {
      let newValue: any = e.target.value;
      if (e.target.type == 'number') {
        if (property == 'level') {
          numberInputValidation(e as React.ChangeEvent<HTMLInputElement>, 1);
        } else if (property == 'arcane' || property == 'sacred' || property == 'weaponFlame') {
          numberInputValidation(e as React.ChangeEvent<HTMLInputElement>, 0);
        }
      }
      if (property == 'weapon') {
        if (e.target.value == 'Genesis' || e.target.value == 'Destiny') {
          value.weaponSF = '22';
        }
      }
      if (property == 'weaponPotential' && propertyLine) {
        newValue = value[property] as string[];
        newValue[propertyLine-1] = e.target.value;
      }
      if (property == 'secondaryPotential' && propertyLine) {
        newValue = value[property] as string[];
        newValue[propertyLine-1] = e.target.value;
      }
      newMap.set(selected, {...value, [property]: newValue});
    }
    setCharacters(newMap);
  }

  const getRating = (property: string) => {
    return '';
  }

  return (
    <section>
      <div className="inline-flex panel flex-wrap gap-5 mb-5 shadow">
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
      <div className="panel flex flex-wrap flex-col gap-3 shadow">
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
        <div className="flex flex-wrap w-200">
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
                <div className="hidden group-hover:block absolute left-8 top-0 w-120 bg-black p-2 border-1 pointer-events-none">
                  Use the flame score and percentage upgrade values from whackybeanz's website below.<br /><br />
                  For the weapon only, the fields are are: Attack/Magic Attack, Boss Damage, Damage, and stat flame score.
                </div>
              </div>
            </div>
            <div className="equipment-category h-7">%
              <div className="relative group">
                <div className="border-1 rounded-lg w-3.5 h-3.5 flex text-xs justify-center items-center ml-2 cursor-pointer">
                  ?
                </div>
                <div className="hidden group-hover:block absolute left-8 top-0 w-71 bg-black p-2 border-1 pointer-events-none">
                  The chance of upgrading the flame
                </div>
              </div>
            </div>
            <div className="equipment-category h-21">Potential</div>
            <div className="equipment-category h-7">Rating</div>
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
            <div className="equipment-row h-7">
              <input type="text" className="maple-input-center bg-white font-normal text-center w-15 ml-5 mr-2" value={characters.get(selected).weaponFlamePercentage} onChange={(e) => handleCharacterPropertyChange(e, 'weaponFlamePercentage')}></input>%
            </div>
            <div className="equipment-row row-dark h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-35 h-6" value={characters.get(selected).weaponPotential[0]} onChange={(e) => handleCharacterPropertyChange(e, 'weaponPotential', 1)}>
                {weaponsPotentials.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="equipment-row row-dark h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-35 h-6" value={characters.get(selected).weaponPotential[1]} onChange={(e) => handleCharacterPropertyChange(e, 'weaponPotential', 2)}>
                {weaponsPotentials.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="equipment-row row-dark h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-35 h-6" value={characters.get(selected).weaponPotential[2]} onChange={(e) => handleCharacterPropertyChange(e, 'weaponPotential', 3)}>
                {weaponsPotentials.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="equipment-row h-7">
              {/* <b>{getRating('weapon')}</b> */}
            </div>
          </div>
          
          <div className="flex flex-col w-56">
            <div className="equipment-category h-7">Secondary</div>
            <div className="equipment-row h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-25 h-6" value={characters.get(selected).secondary} onChange={(e) => handleCharacterPropertyChange(e, 'secondary')}>
                {secondaries.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="equipment-row row-dark h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-25 h-6" value={characters.get(selected).secondarySF} onChange={(e) => handleCharacterPropertyChange(e, 'secondarySF')}>
                {secondariesSF.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="equipment-row h-7"></div>
            <div className="equipment-row h-7"></div>
            <div className="equipment-row row-dark h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-35 h-6" value={characters.get(selected).secondaryPotential[0]} onChange={(e) => handleCharacterPropertyChange(e, 'secondaryPotential', 1)}>
                {characters.get(selected).secondary == 'ilvl <= 150' ? 
                  secondaryPotentialsLow.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  )) :
                  secondaryPotentialsHigh.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="equipment-row row-dark h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-35 h-6" value={characters.get(selected).secondaryPotential[1]} onChange={(e) => handleCharacterPropertyChange(e, 'secondaryPotential', 2)}>
                {characters.get(selected).secondary == 'ilvl <= 150' ? 
                  secondaryPotentialsLow.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  )) :
                  secondaryPotentialsHigh.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="equipment-row row-dark h-7">
              <select className="maple-input bg-white text-center font-normal px-2 mr-2 py-0.5 w-35 h-6" value={characters.get(selected).secondaryPotential[2]} onChange={(e) => handleCharacterPropertyChange(e, 'secondaryPotential', 3)}>
                {characters.get(selected).secondary == 'ilvl <= 150' ? 
                  secondaryPotentialsLow.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  )) :
                  secondaryPotentialsHigh.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="equipment-row h-7">
              <b>{getRating('weapon')}</b>
            </div>
          </div>
        </div>
      </div>

      <div className="panel mt-4 flex flex-wrap flex-col gap-2 shadow">
        <p>For flame score and percentage upgrade values, use WhackyBeanz's website <a className="roster-link" href="https://www.whackybeanz.com/calc/equips/flames" target="_blank">here</a></p>
        <p>Or if you want a simple calculator, plug values into the one below.</p>
        <h1 className="mt-4">Stat Equivalencies</h1>
        <div className="flex flex-row">
          <div className="flex flex-col w-40">
            <label className="font-bold h-6">1 Secondary Stat</label>
            <label className="font-bold h-6">1 ATT/M.ATT</label>
            <label className="font-bold h-6">1% All Stat</label>
          </div> 
          <div className="flex flex-col">
            <label className="h-6">
              <input className="maple-input font-normal w-16 mr-3" onFocus={handleFocus} value={characters.get(selected).secondaryEquivalency} onChange={(e) => handleCharacterPropertyChange(e, 'secondaryEquivalency')}></input>
              Primary Stat
            </label>
            <label className="h-6">
              <input className="maple-input font-normal w-16 mr-3" onFocus={handleFocus} value={characters.get(selected).attEquivalency} onChange={(e) => handleCharacterPropertyChange(e, 'attEquivalency')}></input>
              Primary Stat
            </label>
            <label className="h-6">
              <input className="maple-input font-normal w-16 mr-3" onFocus={handleFocus} value={characters.get(selected).allStatEquivalency} onChange={(e) => handleCharacterPropertyChange(e, 'allStatEquivalency')}></input>
              Primary Stat
            </label>
          </div>
        </div>
        <button className="font-bold shadow rounded-lg w-22 px-4 py-1 bg-[var(--color-maplestory-orange-selected)] hover:bg-[var(--color-maplestory-orange-hover)] text-white flex justify-center items-center relative cursor-pointer" onClick={() => defaultStatEquivalencies()}>
          Default
        </button>
        <h1 className="mt-4">Flame Calculator</h1>
        <div className="flex flex-row">
          <div className="flex flex-col w-40">
            <label className="font-bold h-6">Main Stat</label>
            <label className="font-bold h-6">Secondary Stat</label>
            <label className="font-bold h-6">ATT/M.ATT</label>
            <label className="font-bold h-6">All Stat %</label>
          </div> 
          <div className="flex flex-col">
            <label className="h-6">
              <input className="maple-input font-normal w-16 mr-3" onFocus={handleFocus} value={characters.get(selected).calculatorMainStat} onChange={(e) => handleCharacterPropertyChange(e, 'calculatorMainStat')}></input>
            </label>
            <label className="h-6">
              <input className="maple-input font-normal w-16 mr-3" onFocus={handleFocus} value={characters.get(selected).calculatorSecondaryStat} onChange={(e) => handleCharacterPropertyChange(e, 'calculatorSecondaryStat')}></input>
            </label>
            <label className="h-6">
              <input className="maple-input font-normal w-16 mr-3" onFocus={handleFocus} value={characters.get(selected).calculatorAtt} onChange={(e) => handleCharacterPropertyChange(e, 'calculatorAtt')}></input>
            </label>
            <label className="h-6">
            <input className="maple-input font-normal w-16 mr-3" onFocus={handleFocus} value={characters.get(selected).calculatorAllStat} onChange={(e) => handleCharacterPropertyChange(e, 'calculatorAllStat')}></input>
            </label>
          </div>
        </div>
        <h1 className="mt-4">Flame Score: <span className="text-red-500">{calculatorResult}</span></h1>
        <h1 className="mt-4">How to find stat equivalencies?</h1>
        <ol>
          <li>1. Go to MapleScouter and after inputting all your data correctly, go to the detailed information page.</li>
          <li>2. Under the Stat Efficiency panel on the left, switch to Details, change the Final Damage dropdown to Main Stat to find equivalencies.</li>
        </ol>
        <div>
          <img src="../images/Maplestory/Roster/StatEquivalency.png" alt="MapleScouter Stat Equivalency Guide" className=""></img>
        </div>
      </div>
    </section>
  );
}