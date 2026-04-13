'use client';

import { useEffect, useState } from "react";
import NumberInput from "../numberInput";
import TextInput from "../textInput";
import DropdownInput from "../dropDownInput";
import Spacer from "../spacer";

type Equipment = {
  [key: string]: any;
  id: string;
  type: string;
  name: string;
  sf: string;
  attackFlame: string;
  bossFlame: string;
  damageFlame: string;
  flame: string;
  flameChance: string;
  potentials: [string, string, string];
  potentialGoals: string;
  potentialFDDifference: string;
};

const defaultEquipment: Equipment = {
  id: '',
  type: '---',
  name: '---',
  sf: '0',
  attackFlame: '---',
  bossFlame: '---',
  damageFlame: '---',
  flame: '0',
  flameChance: '0.00',
  potentials: ['---', '---', '---'],
  potentialGoals: '---',
  potentialFDDifference: '0.00',
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

const equipmentTypes: string[] = ['Weapon', 'Secondary', 'Emblem', 'Hat', 'Top', 'Bottom', 'Glove', 'Shoe', 'Cape', 'Shoulder'];
const equipmentList: Equipment[] = [];
for (let i = 0; i < equipmentTypes.length; i++) {
  equipmentList.push({
    ...defaultEquipment,
    id: i.toString(),
    type: equipmentTypes[i],
  });
}
equipmentList[0].name = 'Genesis';
equipmentList[1].name = 'PNo';
equipmentList[2].name = 'Gold';

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
  const classes: string[] = [
    'Adele', 'Angelic Buster', 'Aran', 'Ark', 'Battle Mage', 'Bishop', 'Blaster', 'Blaze Wizard', 'Bowmaster', 'Buccaneer', 'Cadena', 'Cannoneer', 'Corsair', 'Dark Knight',
    'Demon Avenger', 'Demon Slayer', 'Dual Blade', 'Evan', 'Fire/Poison', 'Hayato', 'Hero', 'Hoyoung', 'Ice/Lightning', 'Illium', 'Kain', 'Kaiser', 'Kanna', 'Khali', 'Kinesis',
    'Lara', 'Luminous', 'Lynn', 'Marksman', 'Mercedes', 'Mechanic', 'Mihile', 'Mo Xuan', 'Night Lord', 'Night Walker', 'Paladin', 'Pathfinder', 'Phantom', 'Ren', 'Shade',
    'Shadower', 'Sia Astelle', 'Thunder Breaker', 'Wild Hunter', 'Wind Archer', 'Xenon', 'Zero'
  ];

  const equipmentLists: Record<string, string[]> = {
    Weapon: ['Absolab', 'Arcane', 'Genesis', 'Destiny'],
    Emblem: ['---', 'Gold', "Mitra's"],
    Secondary: ['---', 'PNo', 'Deimos', 'Astra', 'RFS', 'Arcane', 'Sweetwater', 'Evolving'],
    Hat: ['---', 'CRA', 'Eternal'],
    Top: ['---', 'CRA', 'Eternal'],
    Bottom: ['---', 'CRA', 'Eternal'],
    Cape: ['---', 'Absolab', 'Arcane', 'Eternal'],
    Glove: ['---', 'Absolab', 'Arcane', 'Eternal'],
    Shoe: ['---', 'Absolab', 'Arcane', 'Eternal'],
    Shoulder: ['---', 'Absolab', 'Arcane', 'Eternal'],
  };

  const tierList: string[] = ['---', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const lowerWSEList: string[] = ['---', '12% Att/M.Att', '9% Att/M.Att', '40% Boss', '35% Boss', '30% Boss'];
  const higherWSEList: string[] = ['---', '13% Att/M.Att', '10% Att/M.Att', '40% Boss', '35% Boss', '30% Boss'];
  const lowerWSEGoalList: string[] = ['---', '30% Att/M.Att', '33% Att/M.Att', '36% Att/M.Att', '20% Att/M.Att + 40% Boss'];
  const higherWSEGoalList: string[] = ['---', '33% Att/M.Att', '36% Att/M.Att', '39% Att/M.Att', '23% Att/M.Att + 40% Boss'];
  const lowerList: string[] = ['Gold', 'PNo', 'Deimos', 'RFS', 'Evolving', 'CRA'];
  //const higherList: string[] = ['Absolab', 'Arcane', 'Genesis', 'Destiny', "Mitra's", 'Astra', 'Arcane', 'Sweetwater', 'Eternal']; might not need this
  const lowerGeneralList: string[] = ['---', '12% Main', '9% Main', '12% Sub', '9% Sub', '9% All', '6% All'];
  const higherGeneralList: string[] = ['---', '13% Main', '10% Main', '13% Sub', '10% Sub', '10% All', '7% All'];
  const lowerPotentialGoalList: string[] = ['---', '30% Main', '33% Main', '36% Main'];
  const higherPotentialGoalList: string[] = ['---', '33% Main', '36% Main', '39% Main'];

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

  const createSFList = (min: number, max: number): string[] => {
    const sfList: string[] = [];
    for (let i = min; i <= max; i++) {
      sfList.push(i.toString());
    }
    return sfList;
  }

  const createEquipmentDropdownInput = (equipment: Equipment, variable: string, list: string[], size: string) => {
    return <DropdownInput value={equipment[variable]} onChange={(v) => 
      {
        updateEquipment(selectedCharacter.id, equipment.id, {
          [variable]: v,
        })
      }
    }
    list={list} size={size} />
  }

  const renderCell = (field: string, equipment: Equipment) => {
    if (field === 'Name') {
      if (equipment.type === 'Weapon') {
        return  <DropdownInput value={equipment.name} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                  name: v,
                  sf: (v === 'Genesis' || v === 'Destiny') ? '22' : equipment.sf,
                })} list={equipmentLists[equipment.type]} size="w-22" />
      } else if (equipment.type === 'Secondary') {
        return createEquipmentDropdownInput(equipment, 'name', equipmentLists[equipment.type], 'w-27');
      } else {
        return createEquipmentDropdownInput(equipment, 'name', equipmentLists[equipment.type], 'w-21');
      }
    } else if (field === 'Starforce') {
      let sfList: string[] = [];
      if (equipment.type === 'Weapon') {
        if (equipment.name === 'Absolab' || equipment.name === 'Arcane') {
          sfList = createSFList(0, 30);
        } else if (equipment.name === 'Genesis' || equipment.name === 'Destiny') {
          sfList = createSFList(22, 22);
        }
      } else if (equipment.type === 'Secondary') {
        if (equipment.name === 'Deimos') {
          sfList = createSFList(0, 20);
        } else if (equipment.name === 'Astra' || equipment.name === 'Arcane' || equipment.name === 'Sweetwater') {
          sfList = createSFList(0, 30);
        }
      } else if (equipment.name !== '---' && equipment.type !== 'Emblem') {
        sfList = createSFList(0, 30);
      }
      if (sfList.length > 0) {
        return createEquipmentDropdownInput(equipment, 'sf', sfList, 'w-16');
      }
    } else if (field === 'Flame') {
      if (equipment.name === '---') {
        return '';
      }
      const hasNormalFlame = ['Hat', 'Top', 'Bottom', 'Glove', 'Shoe', 'Cape'];
      if (equipment.type === 'Weapon') { // Will have special Attack + Boss Damage + Damage + Flame Score
        return  <div className="flex gap-1">
                  <DropdownInput value={equipment.attackFlame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                    attackFlame: v,
                  })} list={tierList} size="w-12" />
                  <DropdownInput value={equipment.bossFlame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                    bossFlame: v,
                  })} list={tierList} size="w-12" />
                  <DropdownInput value={equipment.damageFlame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                    damageFlame: v,
                  })} list={tierList} size="w-12" />
                  <NumberInput value={equipment.flame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                    flame: v,
                  })} min={0} max={300} size="w-13" />
                </div>
      } else if (hasNormalFlame.includes(equipment.type)) {
        return  <NumberInput value={equipment.flame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                  flame: v,
                })} min={0} max={300} size="w-13" />
      }
    } else if (field === 'Flame Upgrade %') {
      if (equipment.name === '---') {
        return '';
      }
      const hasFlame = ['Weapon', 'Hat', 'Top', 'Bottom', 'Glove', 'Shoe', 'Cape'];
      if (hasFlame.includes(equipment.type)) {
        return  <NumberInput value={equipment.flameChance} inLabel={'%'} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                  flameChance: v,
                })} min={0.0} max={100.0} size="w-18" />
      }
    } else if (field === 'Potentials' || field === 'PotentialsLine2' || field === 'PotentialsLine3') {
      if (equipment.name === '---') {
        return '';
      }
      const line = Number(field.at(-1)) || 1;
      const potentials: [string, string, string] = [...equipment.potentials];
      if (equipment.type === 'Weapon' || equipment.type === 'Secondary') {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={lowerList.includes(equipment.name) ? lowerWSEList : higherWSEList} size="w-30" />
      } else if (equipment.type === 'Emblem') {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={lowerList.includes(equipment.name) ? lowerWSEList.slice(0, -3) : higherWSEList.slice(0, -3)} size="w-30" />
      } else {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={lowerList.includes(equipment.name) ? lowerGeneralList : higherGeneralList} size="w-24" />
      }
    } else if (field === 'Potential Goals') {
      if (equipment.name === '---') {
        return '';
      }
      if (equipment.type === 'Weapon' || equipment.type === 'Secondary') {
        return createEquipmentDropdownInput(equipment, 'potentialGoals', lowerList.includes(equipment.name) ? lowerWSEGoalList : higherWSEGoalList, 'w-50');
      } else if (equipment.type === 'Emblem') {
        return createEquipmentDropdownInput(equipment, 'potentialGoals', lowerList.includes(equipment.name) ? lowerWSEGoalList.slice(0, -1) : higherWSEGoalList.slice(0, -1), 'w-30');
      } else {
        return createEquipmentDropdownInput(equipment, 'potentialGoals', lowerList.includes(equipment.name) ? lowerPotentialGoalList : higherPotentialGoalList, 'w-24');
      }

    }
    return '';
  };

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
      <div className="panel inline-flex flex-wrap flex-col gap-3 shadow"> 
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
        <div className="flex flex-wrap">
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
                    <td key={eq.type} className="text-center min-w-29">
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
      <div className="panel mt-4 inline-flex flex-wrap flex-col gap-2 shadow max-w-300">
        <h1 className="">FAQ</h1>
        <h2 className="mt-4">What are the fields for the Weapon flame?</h2>
        From left to right, they are: Att/M.Att, Boss%, Dmg%, and Stat.
        <h2 className="mt-4">How do I find the Potential FD% Diff?</h2>
        On Scouter, go to Additional Spec Simulation and toggle it on, then go to input and insert the Potential Diff and Apply.
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