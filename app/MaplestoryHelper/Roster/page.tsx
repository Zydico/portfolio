'use client';

import { useEffect, useState } from "react";
import { numberInputValidation } from "../pipes";
import ClassInfo from './ClassInfo.json';
import './page.css';
import NumberInput from "../numberInput";
import TextInput from "../textInput";
import DropdownInput from "../dropDownInput";
import Spacer from "../spacer";

type Equipment = {
  id: string;
  type: string;
  name: string;
  sf?: string;
  attackFlame?: string;
  bossFlame?: string;
  damageFlame?: string;
  flame?: string;
  flameChance?: string;
  potentials?: [string, string, string];
  potentialGoals?: [string, string, string];
  potentialFDDifference?: string;
};

const defaultEquipment: Equipment = {
  id: '',
  type: '---',
  name: '---',
};

type Character = {
  id: string;
  name: string;
  class: string;
  level: string;
  arcane: string;
  sacred: string;
  equipments: Equipment[];
}

const equipmentTypes: string[] = ['Weapon', 'Secondary', 'Emblem', 'Hat', 'Top', 'Bottom', 'Gloves', 'Shoes', 'Cape', 'Shoulder'];
const equipmentList: Equipment[] = [];
for (let i = 0; i < equipmentTypes.length; i++) {
  equipmentList.push({
    ...defaultEquipment,
    id: i.toString(),
    type: equipmentTypes[i],
  });
}

const defaultCharacter: Character = {
  id: crypto.randomUUID(),
  name: 'Character 1',
  class: 'Adele',
  level: '290',
  arcane: '1350',
  sacred: '660',
  equipments: equipmentList,
}

const fields: { label: string }[] = [
  { label: 'Name' },
  { label: 'Starforce' },
  { label: 'Flame' },
  { label: 'Flame Upgrade %' },
  { label: 'Potentials' },
  { label: 'PotentialsLine2' },
  { label: 'PotentialsLine3' },
  { label: 'Potential Goals' },
  { label: 'Potential Diff' },
  { label: 'Potential FD% Diff'} ,
  { label: 'Pot FD% / Avg Bil' },
];

export default function Roster() {
  const classes = [
    'Adele', 'Angelic Buster', 'Aran', 'Ark', 'Battle Mage', 'Bishop', 'Blaster', 'Blaze Wizard', 'Bowmaster', 'Buccaneer', 'Cadena', 'Cannoneer', 'Corsair', 'Dark Knight',
    'Demon Avenger', 'Demon Slayer', 'Dual Blade', 'Evan', 'Fire/Poison', 'Hayato', 'Hero', 'Hoyoung', 'Ice/Lightning', 'Illium', 'Kain', 'Kaiser', 'Kanna', 'Khali', 'Kinesis',
    'Lara', 'Luminous', 'Lynn', 'Marksman', 'Mercedes', 'Mechanic', 'Mihile', 'Mo Xuan', 'Night Lord', 'Night Walker', 'Paladin', 'Pathfinder', 'Phantom', 'Ren', 'Shade',
    'Shadower', 'Sia Astelle', 'Thunder Breaker', 'Wild Hunter', 'Wind Archer', 'Xenon', 'Zero'
  ];
  const weapons = ['---', 'Absolab', 'Arcane', 'Genesis', 'Destiny'];
  const emblems = ['---', 'Gold', "Mitra's"];
  const secondaries = ['---', 'PNo', 'Deimos', 'RFS'];

  const [characters, setCharacters] = useState<Character[]>([defaultCharacter]);
  const [selectedId, setSelectedId] = useState<string>(defaultCharacter.id);
  const selectedCharacter = characters.find(c => c.id === selectedId) ?? characters[0];

  const addCharacter = () => {
    const newChar: Character = {
      ...defaultCharacter,
      id: crypto.randomUUID(),
      name: 'Character ' + (characters.length+1)
    }
    setCharacters(prev => [...prev, newChar]);
    setSelectedId(newChar.id);
  }

  const deleteCharacter = () => {
    if (characters.length > 1) {
      setCharacters(prev => {
        const index = prev.findIndex(c => c.id === selectedId);
        const newCharacters = prev.filter(c => c.id !== selectedId);
        let nextSelectedId: string;
        if (index < newCharacters.length) {
          // Select the next character if same index after deletion
          nextSelectedId = newCharacters[index].id;
        } else {
          // Select previous character if last character is deleted
          nextSelectedId = newCharacters[newCharacters.length-1].id;
        }
        setSelectedId(nextSelectedId);
        return newCharacters;
      });
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

  const updateEquipment = (
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
  };

  const renderCell = (field: string, equipment: Equipment) => {
    switch (field) {
      case 'Name':
        switch (equipment.type) {
          case 'Weapon':
            return  <DropdownInput value={equipment.name} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                      name: v,
                    })} list={weapons} size="w-22" />
          case 'Secondary':
            return  <DropdownInput value={equipment.name} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                      name: v,
                    })} list={secondaries} size="w-20" />
          case 'Emblem':
            return  <DropdownInput value={equipment.name} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                      name: v,
                    })} list={emblems} size="w-19" />
        }
    }
    return 'placeholder';
  };

  return (
    <section>
      {/* CHARACTER SELECTION ---------------------------------------------------------------------------------------------------- */}
      <div className="inline-flex panel flex-wrap gap-5 mb-5 shadow">
        <label className="font-bold">Character:
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
      <div className="panel flex flex-wrap flex-col gap-3 shadow"> 
        <div className="flex flex-row gap-6">
          <TextInput label='Name' value={selectedCharacter.name} onChange={(v) => updateCharacter(selectedCharacter.id, {
            name: v,
          })} maxLength={12} size="w-30" />
          <DropdownInput label='Class' value={selectedCharacter.class} onChange={(v) => updateCharacter(selectedCharacter.id, {
            class: v,
          })} list={classes} size="w-40" />
        </div>
        <div className="flex flex-row gap-6">
          <NumberInput label='Level' value={selectedCharacter.level} onChange={(v) => updateCharacter(selectedCharacter.id, {
            level: v,
          })} min={1} max={300} size="w-15" />
          <Spacer size="w-6"></Spacer>
          <NumberInput label='Arcane' value={selectedCharacter.arcane} onChange={(v) => updateCharacter(selectedCharacter.id, {
            arcane: v,
          })} min={0} max={1760} size="w-15" />
          <NumberInput label='Sacred' value={selectedCharacter.sacred} onChange={(v) => updateCharacter(selectedCharacter.id, {
            sacred: v,
          })} min={0} max={880} size="w-15" />
        </div>
        <div className="flex flex-wrap w-200">
          <table>
            <thead>
              <tr>
                <td rowSpan={2} className="th"></td>
                <th colSpan={3} className="text-center">WSE</th>
                <th colSpan={7} className="text-center">Armor</th>
              </tr>
              <tr>
                {selectedCharacter.equipments.map((eq) => (
                  <th key={eq.id} colSpan={1} className="text-center">{eq.type}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.label}>
                  {(field.label != 'PotentialsLine2' && field.label != 'PotentialsLine3') &&
                    <td rowSpan={(field.label == 'Potentials') ? 3 : 1} className="th">{field.label}</td>
                  }
                  {selectedCharacter.equipments.map((eq) => (
                    <td key={eq.type}>
                      {renderCell(field.label, eq)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ ---------------------------------------------------------------------------------------------------- */}
      <div className="panel mt-4 flex flex-wrap flex-col gap-2 shadow">
        <h1 className="">FAQ</h1>
        <h2 className="mt-4">How do you find stat equivalencies for WhackyBeanz's Flame Calculator?</h2>
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