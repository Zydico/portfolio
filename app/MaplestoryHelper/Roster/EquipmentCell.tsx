import { memo } from "react";
import { Equipment } from "../character";
import DropdownInput from "../dropDownInput";
import NumberInput from "../numberInput";
import { EQUIPMENT_OPTIONS, TIERS, GEAR_POTENTIALS, LOWER_GEAR } from "./rosterConfig";
import { createSFList, getGoalAvgCost, getCostEffectiveness, getWSEDiff, getPotentialDiff } from "./rosterUtils";

type EquipmentCellProps = {
  field: string;
  equipment: Equipment;
  characterId: string;
  updateEquipment: (charId: string, eqId: string, updates: Partial<Equipment>) => void;
};

type GoalOption = {
  Option: string;
  Cost?: string;
  Cube?: string;
};

const createGoalOptionList = (options: GoalOption[]) => {
  return options.map(option => option.Option);
}

export const EquipmentCell = memo(({ field, equipment, characterId, updateEquipment }: EquipmentCellProps) => {
  // Used for creating a generic equipment dropdown input (no extra logic)
  const createEquipmentDropdownInput = (variable: string, list: string[], size: string) => {
    return <DropdownInput value={equipment[variable]} onChange={(v) => 
      {
        updateEquipment(characterId, equipment.id, {
          [variable]: v,
        })
      }
    }
    list={list} size={size} />
  }

  if (field === 'Name') {
    if (equipment.type === 'Weapon') {
      return  <DropdownInput value={equipment.name} onChange={(v) => updateEquipment(characterId, equipment.id, {
                name: v,
                sf: (v === 'Genesis' || v === 'Destiny') ? '22' : equipment.sf,
              })} list={EQUIPMENT_OPTIONS[equipment.type]} size="w-23" />
    } else if (equipment.type === 'Secondary') {
      return createEquipmentDropdownInput('name', EQUIPMENT_OPTIONS[equipment.type], 'w-27');
    } else {
      return createEquipmentDropdownInput('name', EQUIPMENT_OPTIONS[equipment.type], 'w-21');
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
      return createEquipmentDropdownInput('sf', sfList, 'w-16');
    }
  } else if (field === 'Flame') {
    if (equipment.name === '---') {
      return '';
    }
    const hasFlame = ['Hat', 'Top', 'Bottom', 'Glove', 'Shoe', 'Cape'];
    if (equipment.type === 'Weapon') { // Will have special Attack + Boss Damage + Damage + Flame Score
      return  <div className="flex gap-1">
                <DropdownInput value={equipment.attackFlame} onChange={(v) => updateEquipment(characterId, equipment.id, {
                  attackFlame: v,
                })} list={TIERS} size="w-12" />
                <DropdownInput value={equipment.bossFlame} onChange={(v) => updateEquipment(characterId, equipment.id, {
                  bossFlame: v,
                })} list={TIERS} size="w-12" />
                <DropdownInput value={equipment.damageFlame} onChange={(v) => updateEquipment(characterId, equipment.id, {
                  damageFlame: v,
                })} list={TIERS} size="w-12" />
                <NumberInput value={equipment.flame} onChange={(v) => updateEquipment(characterId, equipment.id, {
                  flame: v,
                })} min={0} max={300} size="w-13" />
              </div>
    } else if (hasFlame.includes(equipment.type)) {
      return  <NumberInput value={equipment.flame} onChange={(v) => updateEquipment(characterId, equipment.id, {
                flame: v,
              })} min={0} max={300} size="w-13" />
    }
  } else if (field === 'Flame Upgrade %') {
    if (equipment.name === '---') {
      return '';
    }
    const hasFlame = ['Weapon', 'Hat', 'Top', 'Bottom', 'Glove', 'Shoe', 'Cape'];
    if (hasFlame.includes(equipment.type)) {
      return  <NumberInput value={equipment.flameChance} inLabel={'%'} onChange={(v) => updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
            potentials: potentials,
          })
        }
      }
      list={GEAR_POTENTIALS.Lines.WeaponHigher as string[]} size="w-30" />
    } else if (equipment.type === 'Secondary') {
      return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
        {
          potentials[line-1] = v;
          updateEquipment(characterId, equipment.id, {
            potentials: potentials,
          })
        }
      }
      list={LOWER_GEAR.includes(equipment.name) ? (GEAR_POTENTIALS.Lines.SecondaryLower as string[]) : (GEAR_POTENTIALS.Lines.SecondaryHigher as string[])} size="w-30" />
    } else if (equipment.type === 'Emblem') {
      return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
        {
          potentials[line-1] = v;
          updateEquipment(characterId, equipment.id, {
            potentials: potentials,
          })
        }
      }
      list={LOWER_GEAR.includes(equipment.name) ? (GEAR_POTENTIALS.Lines.EmblemLower as string[]) : (GEAR_POTENTIALS.Lines.EmblemHigher as string[])} size="w-30" />
    } else if (equipment.type === 'Hat') {
      return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
        {
          potentials[line-1] = v;
          updateEquipment(characterId, equipment.id, {
            potentials: potentials,
          })
        }
      }
      list={LOWER_GEAR.includes(equipment.name) ? (GEAR_POTENTIALS.Lines.HatLower as string[]) : (GEAR_POTENTIALS.Lines.HatHigher as string[])} size="w-24" />
    } else if (equipment.type === 'Glove') {
      return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
        {
          potentials[line-1] = v;
          updateEquipment(characterId, equipment.id, {
            potentials: potentials,
          })
        }
      }
      list={GEAR_POTENTIALS.Lines.GloveHigher as string[]} size="w-24" />
    } else {
      return <DropdownInput value={equipment.potentials[line-1]} onChange={(v) => 
        {
          potentials[line-1] = v;
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
          updateEquipment(characterId, equipment.id, {
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
    } else {
      return <div>
        {getPotentialDiff(equipment)}
      </div>
    }
  } else if (field === 'Potential FD% Diff') {
    if (equipment.name === '---' || equipment.potentialGoals === '---' || 
      ((equipment.type === 'Weapon' || equipment.type === 'Secondary' || equipment.type === 'Emblem') && (getWSEDiff(equipment) === '')) ||
      ((equipment.type !== 'Weapon' && equipment.type !== 'Secondary' && equipment.type !== 'Emblem') && (getPotentialDiff(equipment) === ''))
    ) return '';
    return  <NumberInput value={equipment.potentialFDDifference} inLabel={'%'} onChange={(v) => updateEquipment(characterId, equipment.id, {
              potentialFDDifference: v,
              potentialCostEffectiveness: getCostEffectiveness(equipment, 'FDChange', v)
            })} min={0.00} max={100.00} size="w-18" />
  } else if (field === 'Goal Avg Cost') {
    if (equipment.name === '---' || equipment.potentialGoals === '---' || 
      ((equipment.type === 'Weapon' || equipment.type === 'Secondary' || equipment.type === 'Emblem') && (getWSEDiff(equipment) === '')) ||
      ((equipment.type !== 'Weapon' && equipment.type !== 'Secondary' && equipment.type !== 'Emblem') && (getPotentialDiff(equipment) === ''))
    ) return '';
    return <div>{equipment.potentialGoalAvgCost}</div>
  } else if (field === 'Cost Effectiveness') {
    if (equipment.name === '---' || equipment.potentialGoals === '---' || 
      ((equipment.type === 'Weapon' || equipment.type === 'Secondary' || equipment.type === 'Emblem') && (getWSEDiff(equipment) === '')) ||
      ((equipment.type !== 'Weapon' && equipment.type !== 'Secondary' && equipment.type !== 'Emblem') && (getPotentialDiff(equipment) === ''))
    ) return '';
    return <div>{equipment.potentialCostEffectiveness}</div>
  }
  return '';
});