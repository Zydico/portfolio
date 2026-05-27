'use client';

import { useEffect, useState } from "react";
import NumberInput from "../numberInput";
import TextInput from "../textInput";
import DropdownInput from "../dropDownInput";
import CheckboxInput from "../checkboxInput";
import Spacer from "../spacer";
import { useCharacters } from "../characterContext";
import { Character, Equipment, defaultCharacter } from "../character";
import { CLASSES, FIELDS, EQUIPMENT_OPTIONS, TIERS, GEAR_POTENTIALS, LOWER_GEAR } from "./rosterConfig";

export default function Roster() {
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

  const createGoalOptionList = (options: any) => {
    const list = [];
    for (const option of options) {
      list.push(option['Option']);
    }
    return list;
  }

  const renderCell = (field: string, equipment: Equipment) => {
    if (field === 'Name') {
      if (equipment.type === 'Weapon') {
        return  <DropdownInput value={equipment.name} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                  name: v,
                  sf: (v === 'Genesis' || v === 'Destiny') ? '22' : equipment.sf,
                })} list={EQUIPMENT_OPTIONS[equipment.type]} size="w-22" />
      } else if (equipment.type === 'Secondary') {
        return createEquipmentDropdownInput(equipment, 'name', EQUIPMENT_OPTIONS[equipment.type], 'w-27');
      } else {
        return createEquipmentDropdownInput(equipment, 'name', EQUIPMENT_OPTIONS[equipment.type], 'w-21');
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
      const hasFlame = ['Hat', 'Top', 'Bottom', 'Glove', 'Shoe', 'Cape'];
      if (equipment.type === 'Weapon') { // Will have special Attack + Boss Damage + Damage + Flame Score
        return  <div className="flex gap-1">
                  <DropdownInput value={equipment.attackFlame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                    attackFlame: v,
                  })} list={TIERS} size="w-12" />
                  <DropdownInput value={equipment.bossFlame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                    bossFlame: v,
                  })} list={TIERS} size="w-12" />
                  <DropdownInput value={equipment.damageFlame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                    damageFlame: v,
                  })} list={TIERS} size="w-12" />
                  <NumberInput value={equipment.flame} onChange={(v) => updateEquipment(selectedCharacter.id, equipment.id, {
                    flame: v,
                  })} min={0} max={300} size="w-13" />
                </div>
      } else if (hasFlame.includes(equipment.type)) {
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
      if (equipment.type === 'Weapon') {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={GEAR_POTENTIALS.Lines.WeaponHigher as string[]} size="w-30" />
      } else if (equipment.type === 'Secondary') {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={LOWER_GEAR.includes(equipment.name) ? (GEAR_POTENTIALS.Lines.SecondaryLower as string[]) : (GEAR_POTENTIALS.Lines.SecondaryHigher as string[])} size="w-30" />
      } else if (equipment.type === 'Emblem') {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={LOWER_GEAR.includes(equipment.name) ? (GEAR_POTENTIALS.Lines.EmblemLower as string[]) : (GEAR_POTENTIALS.Lines.EmblemHigher as string[])} size="w-30" />
      } else if (equipment.type === 'Hat') {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={LOWER_GEAR.includes(equipment.name) ? (GEAR_POTENTIALS.Lines.HatLower as string[]) : (GEAR_POTENTIALS.Lines.HatHigher as string[])} size="w-24" />
      } else if (equipment.type === 'Glove') {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={GEAR_POTENTIALS.Lines.GloveHigher as string[]} size="w-24" />
      } else {
        return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
          {
            potentials[line-1] = v;
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentials: potentials,
            })
          }
        }
        list={LOWER_GEAR.includes(equipment.name) ? (GEAR_POTENTIALS.Lines.GeneralLower as string[]) : (GEAR_POTENTIALS.Lines.GeneralHigher as string[])} size="w-24" />
      }
    } else if (field === 'Potential Goals') {
      if (equipment.name === '---') {
        return '';
      }
      if (equipment.type === 'Weapon') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }       
        list={createGoalOptionList(GEAR_POTENTIALS.Goals.WeaponHigher)} size="w-43" /> 
      } else if (equipment.type === 'Secondary') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }       
        list={LOWER_GEAR.includes(equipment.name) ? createGoalOptionList(GEAR_POTENTIALS.Goals.SecondaryLower) : createGoalOptionList(GEAR_POTENTIALS.Goals.SecondaryHigher)} size="w-43" /> 
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
        list={LOWER_GEAR.includes(equipment.name) ? createGoalOptionList(GEAR_POTENTIALS.Goals.EmblemLower) : createGoalOptionList(GEAR_POTENTIALS.Goals.EmblemHigher)} size="w-24" /> 
      } else if (equipment.type === 'Hat') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={LOWER_GEAR.includes(equipment.name) ? createGoalOptionList(GEAR_POTENTIALS.Goals.HatLower) : createGoalOptionList(GEAR_POTENTIALS.Goals.HatHigher)} size="w-23" /> 
      } else if (equipment.type === 'Glove') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={createGoalOptionList(GEAR_POTENTIALS.Goals.GloveHigher)} size="w-32" />        
      } else if (equipment.type === 'Top') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={LOWER_GEAR.includes(equipment.name) ? createGoalOptionList(GEAR_POTENTIALS.Goals.TopLower) : createGoalOptionList(GEAR_POTENTIALS.Goals.TopHigher)} size="w-23" />
      } else if (equipment.type === 'Bottom') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={LOWER_GEAR.includes(equipment.name) ? createGoalOptionList(GEAR_POTENTIALS.Goals.BottomLower) : createGoalOptionList(GEAR_POTENTIALS.Goals.BottomHigher)} size="w-23" />
      } else if (equipment.type === 'Shoe') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={createGoalOptionList(GEAR_POTENTIALS.Goals.ShoeHigher)} size="w-23" />
      } else if (equipment.type === 'Cape') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={createGoalOptionList(GEAR_POTENTIALS.Goals.CapeHigher)} size="w-23" />
      } else if (equipment.type === 'Shoulder') {
        return <DropdownInput value={equipment.potentialGoals} onChange={(v) => 
          {
            updateEquipment(selectedCharacter.id, equipment.id, {
              potentialGoals: v,
              potentialGoalAvgCost: getGoalAvgCost(equipment, v),
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'GoalChange', v)
            })
          }
        }
        list={createGoalOptionList(GEAR_POTENTIALS.Goals.ShoulderHigher)} size="w-23" />
      } else {
        return '';
      }
    } else if (field === 'Potential Diff') {
      if (equipment.name === '---' || equipment.potentialGoals === '---') {
        return '';
      }
      if (equipment.type === 'Weapon' || equipment.type === 'Secondary' || equipment.type === 'Emblem') {
        return <div>
          {getWSEDiff(equipment)}
        </div>
      } else if (equipment.type === 'Hat' || equipment.type === 'Top' || equipment.type === 'Bottom' || equipment.type === 'Glove' || equipment.type === 'Shoe' ||
                 equipment.type === 'Cape' || equipment.type === 'Shoulder') {
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
    let cd: number = 0;
    let crit: number = 0;
    let main: number = 0;
    let sub: number = 0;
    for (const line of equipment.potentials) {
      if (line != '---') {
        if (line.split(' ').length > 1) {
          const split = splitPotential(line);
          if (split[1] === 'Main') {
            main += split[0];
          } else if (split[1] === 'Sub') {
            sub += split[0];
          } else if (split[1] === 'All') {
            main += split[0];
            sub += split[0];
          } else if (split[1] === 'Crit') {
            crit += split[0];
          }
        } else { // cd hat
          cd -= Number(line.split(' ')[0][1]);
        }
      }
    }
    const goal = equipment.potentialGoals.split(' ');
    let goalStat: number = 0; // main stat
    let goalCD: number = 0;
    let goalCrit: number = 0;
    if (equipment.potentialGoals !== '---') {
      if (goal.length > 1 && goal[1] === 'Main') {
        goalStat += Number(goal[0].slice(0, -1));   
      } else if (goal.length > 1 && goal[1] === 'Crit') {
        goalCrit += Number(goal[0].slice(0, -1));
        if (goal.length > 2) {
          goalStat += Number(goal[3].slice(0, -1));
        }
      } else if (goal[0] === '-2s' || goal[0] === '-4s') {
        goalCD -= Number(goal[0].slice(0, -1))
        if (goal.length > 2) { // has potential along with the cd
          goalStat += Number(goal[2].slice(0, -1));   
        }
      }   
    }
    let result: string = '';
    const cdDiff: number = -goalCD - cd;
    const statDiff: number = goalStat - main;
    const subDiff: number = -sub;
    const critDiff: number = goalCrit - crit;
    if (cdDiff !== 0) {
      result += (cdDiff + 's ');
    }
    if (critDiff !== 0) {
      result += (critDiff + '% Crit');
    }
    if (statDiff !== 0) {
      result += ' ' 
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
    const list = LOWER_GEAR.includes(equipment.name) ? GEAR_POTENTIALS.Goals[equipment.type + 'Lower'] : GEAR_POTENTIALS.Goals[equipment.type + 'Higher'];
    const properties = list.find(obj => (obj as any)['Option'] === goal);
    return (properties as any)['Cost'] + ' (' + (properties as any)['Cube'] + ')';
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
          })} list={CLASSES} size="w-40" />
          <CheckboxInput label='Show Advanced' value={selectedCharacter.showAdvanced} onChange={(v) => updateCharacter(selectedCharacter.id, {
            showAdvanced: v,
          })} />
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
              {FIELDS.map((field) => (
                <tr key={field.label}>
                  {(!field.advanced || (field.advanced && selectedCharacter.showAdvanced)) && (
                    <>
                        {(field.label != 'PotentialsLine2' && field.label != 'PotentialsLine3') &&
                          <td rowSpan={(field.label == 'Potentials') ? 3 : 1} className="th">{field.label}</td>
                        }
                        {selectedCharacter.equipments.map((eq) => (
                          <td key={eq.type} className="text-center min-w-37">
                            {renderCell(field.label, eq)}
                          </td>
                        ))}
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
        For items level 160 or above, the values are those for an item at level 200 or 250 depending on the piece.
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