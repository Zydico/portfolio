'use client';

import { useCallback, useEffect, useState } from "react";
import TextInput from "../textInput";
import DropdownInput from "../dropDownInput";
import CheckboxInput from "../checkboxInput";
import { useCharacters } from "../characterContext";
import { Character, Equipment, defaultCharacter } from "../character";
import { CLASSES, FIELDS } from "./rosterConfig";
import { EquipmentCell } from "./EquipmentCell";

export default function Roster() {
  const { characters, setCharacters } = useCharacters();
  const [selectedId, setSelectedId] = useState<string>(characters[0].id);
  const selectedCharacter = characters.find(c => c.id === selectedId) ?? characters[0];

  const wseAndArmor = selectedCharacter.equipments.filter(eq => 
    ['Weapon', 'Secondary', 'Emblem', 'Hat', 'Top', 'Bottom', 'Glove', 'Shoe', 'Cape', 'Shoulder'].includes(eq.type)
  );

  const ringsAndPendants = selectedCharacter.equipments.filter(eq => 
    ['Ring 1', 'Ring 2', 'Ring 3', 'Oz Ring 1', 'Oz Ring 2', 'Pendant 1', 'Pendant 2'].includes(eq.type)
  );

  const accessories = selectedCharacter.equipments.filter(eq =>
    ['Eye', 'Face', 'Earring', 'Belt', 'Pocket', 'Heart', 'Badge', 'Medal'].includes(eq.type)
  );

  const addCharacter = () => {
    const newChar: Character = {
      ...defaultCharacter,
      id: crypto.randomUUID(),
      name: 'Unnamed Char',
      equipments: defaultCharacter.equipments.map(eq => ({ ...eq }))
    }
    setCharacters(prev => [...prev, newChar]);
    setSelectedId(newChar.id);
  }

  const deleteCharacter = () => {
    if (characters.length > 1) {
      const index = characters.findIndex(c => c.id === selectedId);
      const newCharacters = characters.filter(c => c.id !== selectedId); 
      let nextSelectedId: string;
      if (index < newCharacters.length) {
        nextSelectedId = newCharacters[index].id;
      } else {
        nextSelectedId = newCharacters[newCharacters.length - 1].id;
      }
      setCharacters(newCharacters);
      setSelectedId(nextSelectedId);
    }
  }

  const updateCharacter = (
    id: string,
    updates: Partial<Character>
  ) => {
    setCharacters((prev) => 
      prev.map((char) =>
        char.id === id
          ? { ...char, ...updates }
          : char
      )
    )
  };

  const updateEquipment = useCallback((
    id: string,
    equipmentId: string,
    updates: Partial<Equipment>
  ) => {
    setCharacters((prev) =>
      prev.map((char) =>
        char.id === id
          ? { 
              ...char, 
              equipments: char.equipments.map((eq) => 
                eq.id === equipmentId
                  ? { ...eq, ...updates }
                  : eq
                ),
          }
          : char
      )
    )
  }, [setCharacters]);

  useEffect(() => { // Self healing effect to fix the desync issue for the selectedid when the very first character in the list is selected
    if (!characters.length) return;
    const exists = characters.some(c => c.id === selectedId);
    if (!exists) { 
      setSelectedId(characters[0].id);
    }
  }, [characters, selectedId]);

  return (
    <section>
      {/* CHARACTER SELECTION ---------------------------------------------------------------------------------------------------- */}
      <div className="inline-flex panel flex-wrap gap-5 mb-5 shadow">
        <label className="font-bold"><span>Character:</span>
          <select className="maple-input font-normal px-2 py-1 w-33" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {characters.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
        <button className="font-bold shadow rounded-lg px-4 py-1 bg-[var(--color-maplestory-orange-selected)] hover:bg-[var(--color-maplestory-orange-hover)] 
                           text-white flex justify-center items-center relative cursor-pointer" onClick={() => addCharacter()}>
          Add New Character
        </button>
        <button className="font-bold shadow rounded-lg px-4 py-1 bg-[var(--color-maplestory-red-selected)] hover:bg-[var(--color-maplestory-red-hover)] 
                           text-white flex justify-center items-center relative cursor-pointer" onClick={() => deleteCharacter()}>
          Delete Character
        </button>
      </div>

      {/* CHARACTER INFORMATION ---------------------------------------------------------------------------------------------------- */}
      <div className="panel inline-flex flex-wrap flex-col gap-3 shadow text-[10pt]"> 
        <div className="flex flex-row gap-6">
          <TextInput label='Name' value={selectedCharacter.name} onChange={(v) => updateCharacter(selectedCharacter.id, {
            name: v,
          })} maxLength={12} size="w-30" />
          <DropdownInput label='Class' value={selectedCharacter.class} onChange={(v) => updateCharacter(selectedCharacter.id, {
            class: v,
          })} list={CLASSES} size="w-40" />
          <CheckboxInput label='Show Advanced' value={selectedCharacter.showAdvanced} onChange={(v) => updateCharacter(selectedCharacter.id, {
            showAdvanced: v,
          })} />
        </div>
        
        {/* WSE & ARMOR ---------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-wrap">
          <table>
            <thead>
              <tr>
                <td rowSpan={2} className="th"></td>
                <th colSpan={3} className="text-center !border-r-4">WSE</th>
                <th colSpan={7} className="text-center">Armor</th>
              </tr>
              <tr>
                {wseAndArmor.map((eq) => {
                  const isLastOfCategory = eq.type === 'Emblem';
                  return (
                    <th key={eq.id} colSpan={1} className={`text-center ${isLastOfCategory ? '!border-r-4' : ''}`}>{eq.type}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {FIELDS.map((field) => (
                <tr key={field.label}>
                  {(!field.advanced || (field.advanced && selectedCharacter.showAdvanced)) && (
                    <>
                      {(field.label != 'PotentialsLine2' && field.label != 'PotentialsLine3') &&
                        <td rowSpan={(field.label == 'Potentials') ? 3 : 1} className="th">{field.label}</td>
                      }
                      {wseAndArmor.map((eq) => {
                        const isLastOfCategory = eq.type === 'Emblem';
                        return (
                          <td key={eq.type} className={`min-w-37 text-center ${isLastOfCategory ? '!border-r-4' : ''}`}>
                            <EquipmentCell
                              field={field.label}
                              equipment={eq}
                              characterId={selectedCharacter.id}
                              updateEquipment={updateEquipment}
                            />
                          </td>
                        ) 
                      })}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* RINGS & PENDANTS ---------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-wrap">
          <table>
            <thead>
              <tr>
                <td rowSpan={2} className="th"></td>
                <th colSpan={5} className="text-center !border-r-4">Rings</th>
                <th colSpan={2} className="text-center">Pendants</th>
              </tr>
              <tr>
                {ringsAndPendants.map((eq) => {
                  const isLastOfCategory = eq.type === 'Oz Ring 2';
                  return (
                    <th key={eq.id} colSpan={1} className={`text-center ${isLastOfCategory ? '!border-r-4' : ''}`}>{eq.type}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {FIELDS.map((field) => (
                <tr key={field.label}>
                  {(!field.advanced || (field.advanced && selectedCharacter.showAdvanced)) && (
                    <>
                      {(field.label != 'PotentialsLine2' && field.label != 'PotentialsLine3') &&
                        <td rowSpan={(field.label == 'Potentials') ? 3 : 1} className="th">{field.label}</td>
                      }
                      {ringsAndPendants.map((eq) => {
                        const isLastOfCategory = eq.type === 'Oz Ring 2';
                        return (
                          <td key={eq.type} className={`min-w-37 text-center ${isLastOfCategory ? '!border-r-4' : ''}`}>
                            <EquipmentCell
                              field={field.label}
                              equipment={eq}
                              characterId={selectedCharacter.id}
                              updateEquipment={updateEquipment}
                            />
                          </td>
                        ) 
                      })}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        

      </div>

      {/* FAQ ---------------------------------------------------------------------------------------------------- */}
      <div className="panel mt-4 inline-flex flex-wrap flex-col gap-2 shadow max-w-300">
        <h1 className="">TODO:</h1>
        <ul>
          <li>- Add Accessories table (Eye, Face, Earring, Belt, Pocket, Heart, Badge, Medal) </li>
          <li>- Implement Local Storage</li>
          <li>- Implement ordered cost effectiveness display across all characters</li>
        </ul>
        <h1 className="">FAQ</h1>
        <h2 className="mt-4">What are the fields for the Weapon flame?</h2>
        From left to right, they are: M/Att, Boss%, Dmg%, and Stat.
        <h2 className="mt-4">How do I find the Potential FD% Diff?</h2>
        On Scouter, go to Additional Spec Simulation and toggle it on, then go to input and insert the Potential Diff and Apply.
        <h2 className="mt-4">What is the cost effectiveness?</h2>
        It is simply, (Potential FD% Diff / Goal Avg Cost)
        <p>It is also multiplied by 1000 to get a cleaner value. The higher the number, the better.</p>
        <h2 className="mt-4">How were the goal average costs found?</h2>
        Values were simply collected using MathBro's cubing calculator. For items below level 160, the values are those for an item at level 150. 
        For items level 160 or above, the values are those for an item at levels 160, 200, or 250 depending on the equipment type.
        <h2 className="mt-4">How do you find stat equivalencies for WhackyBeanz's Flame Calculator?</h2>
        Most people just do a simple calculation for the the Flame Score as (Main Stat) + (All Stat% x 10) + (Substat / 10) + (Att or M.Att x 3).
        However, if you really want to go in-depth, you can use flame scores relative to a character's progression.

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