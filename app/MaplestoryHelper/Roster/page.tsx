'use client';

import { useEffect, useState } from "react";
import NumberInput from "../numberInput";
import TextInput from "../textInput";
import DropdownInput from "../dropDownInput";
import Spacer from "../spacer";
import { useCharacters } from "../characterContext";
import { Character, Equipment, defaultCharacter } from "../character";

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
  { label: 'Goal Avg Cost'} ,
  { label: 'Cost Effectiveness' },
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
  const lowerWSEList: string[] = ['---', '12% M/Att', '9% M/Att', '40% Boss', '35% Boss', '30% Boss'];
  const higherWSEList: string[] = ['---', '13% M/Att', '10% M/Att', '40% Boss', '35% Boss', '30% Boss'];
  const lowerWSEGoalList: string[] = ['---', '30% M/Att', '33% M/Att', '36% M/Att', '21% M/Att + 40% Boss'];
  const higherWSEGoalList: string[] = ['---', '33% M/Att', '36% M/Att', '39% M/Att', '23% M/Att + 40% Boss'];
  const lowerList: string[] = ['Gold', 'PNo', 'Deimos', 'RFS', 'Evolving', 'CRA'];
  const lowerGeneralList: string[] = ['---', '12% Main', '9% Main', '12% Sub', '9% Sub', '9% All', '6% All'];
  const higherGeneralList: string[] = ['---', '13% Main', '10% Main', '13% Sub', '10% Sub', '10% All', '7% All'];
  const lowerPotentialGoalList: string[] = ['---', '30% Main', '33% Main', '36% Main'];
  const higherPotentialGoalList: string[] = ['---', '33% Main', '36% Main', '39% Main'];
  const lowerGoalCosts: Record<string, Record<string, { cost: string; cube: string }>> = {
    'Secondary': {
      '30% M/Att': { 'cost': '86.79 B', 'cube': 'Glowing' },
      '33% M/Att': { 'cost': '886.07 B', 'cube': 'Bright' },
      '36% M/Att': { 'cost': '29.05 T', 'cube': 'Bright' },
      '21% M/Att + 40% Boss': { 'cost': '436.40 B', 'cube': 'Bright' },
    },
    'Emblem': {
      '30% M/Att': { 'cost': '38.42 B', 'cube': 'Glowing' },
      '33% M/Att': { 'cost': '378.48 B', 'cube': 'Bright' },
      '36% M/Att': { 'cost': '11.80 T', 'cube': 'Bright' },
    },
    'Hat': {
      '30% Main': { 'cost': '10.97 B', 'cube': 'Glowing' },
      '33% Main': { 'cost': '93.28 B', 'cube': 'Bright' },
      '36% Main': { 'cost': '2.42 T', 'cube': 'Bright' },
    },
    'Top': {
      '30% Main': { 'cost': '13.81 B', 'cube': 'Glowing' },
      '33% Main': { 'cost': '97.52 B', 'cube': 'Bright' },
      '36% Main': { 'cost': '2.08 T', 'cube': 'Bright' },
    },
    'Bottom': {
      '30% Main': { 'cost': '8.24 B', 'cube': 'Glowing' },
      '33% Main': { 'cost': '58.64 B', 'cube': 'Bright' },
      '36% Main': { 'cost': '1.26 T', 'cube': 'Bright' },
    },
  };
  const higherGoalCosts: Record<string, Record<string, { cost: string; cube: string }>> = {
    'Weapon': {
      '33% M/Att': { 'cost': '54.49 B', 'cube': 'Glowing' },
      '36% M/Att': { 'cost': '572.19 B', 'cube': 'Bright' },
      '39% M/Att': { 'cost': '19.39 T', 'cube': 'Bright' },
      '23% M/Att + 40% Boss': { 'cost': '281.94 B', 'cube': 'Bright' },
    },
    'Secondary': {
      '33% M/Att': { 'cost': '89.65 B', 'cube': 'Glowing' },
      '36% M/Att': { 'cost': '902.22 B', 'cube': 'Bright' },
      '39% M/Att': { 'cost': '29.58 T', 'cube': 'Bright' },
      '23% M/Att + 40% Boss': { 'cost': '444.35', 'cube': 'Bright' },
    },
    'Emblem': {
      '33% M/Att': { 'cost': '40.90 B', 'cube': 'Glowing' },
      '36% M/Att': { 'cost': '391.80 B', 'cube': 'Bright' },
      '39% M/Att': { 'cost': '12.22 T', 'cube': 'Bright' },
    },
    'Hat': {
      '33% Main': { 'cost': '11.67 B', 'cube': 'Glowing' },
      '36% Main': { 'cost': '96.60 B', 'cube': 'Bright' },
      '39% Main': { 'cost': '2.50 T', 'cube': 'Bright' },
    },
    'Top': {
      '33% Main': { 'cost': '14.69 B', 'cube': 'Glowing' },
      '36% Main': { 'cost': '101.00 B', 'cube': 'Bright' },
      '39% Main': { 'cost': '2.16 T', 'cube': 'Bright' },
    },
    'Bottom': {
      '33% Main': { 'cost': '8.77 B', 'cube': 'Glowing' },
      '36% Main': { 'cost': '60.73 B', 'cube': 'Bright' },
      '39% Main': { 'cost': '1.31 T', 'cube': 'Bright' },
    },
  };

  const { characters, setCharacters } = useCharacters();
  const [selectedId, setSelectedId] = useState<string>(characters[0].id);
  const selectedCharacter = characters.find(c => c.id === selectedId) ?? characters[0];

  const addCharacter = () => {
    const newChar: Character = {
      ...defaultCharacter,
      id: crypto.randomUUID(),
      name: 'Unnamed Char'
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

  // Used for creating a generic equipment dropdown input (no extra logic)
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
                })} min={0.00} max={100.00} size="w-18" />
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
        list={lowerList.includes(equipment.name) ? lowerWSEList.slice(0, -3) : higherWSEList.slice(0, -3)} size="w-30" /> // Slice off boss damage from list
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
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={lowerList.includes(equipment.name) ? lowerWSEGoalList : higherWSEGoalList} size="w-43" />
      } else if (equipment.type === 'Emblem') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={lowerList.includes(equipment.name) ? lowerWSEGoalList.slice(0, -1) : higherWSEGoalList.slice(0, -1)} size="w-24" />
      } else if (equipment.type === 'Hat' || equipment.type === 'Top' || equipment.type === 'Bottom') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={lowerList.includes(equipment.name) ? lowerPotentialGoalList : higherPotentialGoalList} size="w-23" />
      } else {
        return createEquipmentDropdownInput(equipment, 'potentialGoals', lowerList.includes(equipment.name) ? lowerPotentialGoalList : higherPotentialGoalList, 'w-24');
      }
    } else if (field === 'Potential Diff') {
      if (equipment.name === '---') {
        return '';
      }
      if (equipment.type === 'Weapon' || equipment.type === 'Secondary' || equipment.type === 'Emblem') {
        return <div>
          {getWSEDiff(equipment)}
        </div>
      } else if (equipment.type === 'Hat' || equipment.type === 'Top' || equipment.type === 'Bottom') {
        return <div>
          {getPotentialDiff(equipment)}
        </div>
      }
    } else if (field === 'Potential FD% Diff') {
      if (equipment.name === '---' || equipment.potentialGoals === '---') return '';
      return  <NumberInput value={equipment.potentialFDDifference} inLabel={'%'} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                potentialFDDifference: v,
                potentialCostEffectiveness: getCostEffectiveness(equipment, 'FDChange', v)
              })} min={0.00} max={100.00} size="w-18" />
    } else if (field === 'Goal Avg Cost') {
      if (equipment.name === '---') return '';
      return <div>{equipment.potentialGoalAvgCost}</div>
    } else if (field === 'Cost Effectiveness') {
      if (equipment.name === '---') return '';
      return <div>{equipment.potentialCostEffectiveness}</div>
    }
    return '';
  };

  const splitPotential = (potential: string): [number, string] => {
    if (potential === '---') {
      return [0, 'M/Att'];
    }
    const split = potential.split(' ');
    return [Number(split[0].slice(0, -1)), split[1]];
  }

  const getWSEDiff = (equipment: Equipment): string => {
    let att: number = 0;
    let boss: number = 0;
    for (const line of equipment.potentials) {
      const split = splitPotential(line);
      if (split[1] === 'M/Att') {
        att += split[0];
      } else if (split[1] === 'Boss') {
        boss += split[0];
      }
    }
    const goal = equipment.potentialGoals.split(' ');
    let goalAtt: number = 0;
    let goalBoss: number = 0;
    if (equipment.potentialGoals !== '---') {
      goalAtt += Number(goal[0].slice(0, -1));      
      if (goal.length > 2) { // Has Boss 
        goalBoss += Number(goal[3].slice(0, -1));
      }
    }
    let result: string = '';
    const attDiff: number = goalAtt - att;
    const bossDiff: number = goalBoss - boss;
    if (attDiff !== 0) {
      if (attDiff > 0) { result += '+' };
      result += (attDiff + '% M/Att');
    }
    if (bossDiff !== 0) { 
      result += ' ' 
      if (bossDiff > 0) { result += '+' };
      result += (bossDiff + '% Boss');
    };
    return result;
  }

  const getPotentialDiff = (equipment: Equipment): string => {
    let main: number = 0;
    let sub: number = 0;
    for (const line of equipment.potentials) {
      const split = splitPotential(line);
      if (split[1] === 'Main') {
        main += split[0];
      } else if (split[1] === 'Sub') {
        sub += split[0];
      } else if (split[1] === 'All') {
        main += split[0];
        sub += split[0];
      }
    }
    const goal = equipment.potentialGoals.split(' ');
    let goalStat: number = 0;
    if (equipment.potentialGoals !== '---') {
      goalStat += Number(goal[0].slice(0, -1));      
    }
    let result: string = '';
    const statDiff: number = goalStat - main;
    const subDiff: number = -sub;
    if (statDiff !== 0) {
      if (statDiff > 0) { result += '+' };
      result += (statDiff + '% Main');
    }
    if (subDiff !== 0) { 
      result += ' ' 
      if (subDiff > 0) { result += '+' };
      result += (subDiff + '% Sub');
    };
    return result;
  }

  const getGoalAvgCost = (equipment: Equipment, goal: string) => {
    if (goal === '---') return '';
    const list = lowerList.includes(equipment.name) ? lowerGoalCosts : higherGoalCosts;
    console.log(list);
    const properties = list[equipment.type][goal];
    return properties.cost + ' (' + properties.cube + ')';
  }

  const getCostEffectiveness = (equipment: Equipment, changeType: string, newValue: string) => {
    let output = '';
    if (changeType === 'GoalChange') {
      const avg = getGoalAvgCost(equipment, newValue);
      let value = Number(avg.split(' ')[0]);
      if (Number(avg.split(' ')[1] == 'T')) value *= 1000;
      if (isNaN(Number(equipment.potentialFDDifference))) return '';
      output = (Number(equipment.potentialFDDifference) / value * 1000).toFixed(2).toString();
    } else if (changeType === 'FDChange') {
      const avg = equipment.potentialGoalAvgCost;
      let value = Number(avg.split(' ')[0]);
      if (Number(avg.split(' ')[1] == 'T')) value *= 1000;
      if (isNaN(value) || isNaN(Number(newValue))) return '';
      output = (Number(newValue) / value * 1000).toFixed(2).toString();
    }
    if (output === '0' || output === '0.00' || output === 'NaN' || output === 'Infinity') return '';
    return output;
  }

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
                    <td key={eq.type} className="text-center min-w-37">
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
        From left to right, they are: M/Att, Boss%, Dmg%, and Stat.
        <h2 className="mt-4">How do I find the Potential FD% Diff?</h2>
        On Scouter, go to Additional Spec Simulation and toggle it on, then go to input and insert the Potential Diff and Apply.
        <h2 className="mt-4">What is the cost effectiveness?</h2>
        It is simply, (Potential FD% Diff / Goal Avg Cost)
        <p>It is also multiplied by 1000 to get a cleaner value. The higher the number, the better.</p>
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