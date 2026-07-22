import { Character, Equipment } from "../character";
import { GEAR_POTENTIALS, GoalDef, LOWER_GEAR } from "./rosterConfig";

export const createSFList = (min: number, max: number): string[] => {
  const sfList: string[] = [];
  for (let i = min; i <= max; i++) {
    sfList.push(i.toString());
  }
  return sfList;
}

export const getWSEDiff = (equipment: Equipment): string => {
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

export const getPotentialDiff = (equipment: Equipment): string => {
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
  let goalSub: number = 0; // sub stat
  let goalCD: number = 0;
  let goalCrit: number = 0;
  if (equipment.potentialGoals !== '---') {
    if (goal.length > 1 && goal[1] === 'Main') {
      goalStat += Number(goal[0].slice(0, -1));   
      if (LOWER_GEAR.includes(equipment.name)) {
        if (goalStat == 27) {
          goalSub += 6; // fake 3L, 6 all stat
        }
      } else {
        if (goalStat == 30) {
          goalSub += 7; // fake 3L, 7 all stat
        }
      }
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
  const subDiff: number = goalSub - sub;
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

export const getGoalAvgCost = (equipment: Equipment, goal: string) => {
  if (goal === '---') return '';
  let list;
  if (['Ring 1', 'Ring 2', 'Ring 3', 'Pendant 1', 'Pendant 2', 'Eye', 'Face', 'Earring'].includes(equipment.type)) {
    list = (LOWER_GEAR.includes(equipment.name) ? GEAR_POTENTIALS.Goals['AccessoryLower'] : GEAR_POTENTIALS.Goals['AccessoryHigher']) as GoalDef[];    
  } else {
    list = (LOWER_GEAR.includes(equipment.name) ? GEAR_POTENTIALS.Goals[equipment.type + 'Lower'] : GEAR_POTENTIALS.Goals[equipment.type + 'Higher']) as GoalDef[];
  }
  const properties = list.find(obj => obj.Option === goal);
  if (!properties) return '';
  return `${properties.Cost} (${properties.Cube})`;
}

export const getCostEffectiveness = (equipment: Equipment, changeType: string, newValue: string) => {
  let output = '';
  if (changeType === 'GoalChange') {
    const avg = getGoalAvgCost(equipment, newValue);
    const costString = avg.split(' ');
    let value = Number(costString[0]);
    if (costString[1] == 'T') value *= 1000;
    if (isNaN(Number(equipment.potentialFDDifference))) return '';
    output = (Number(equipment.potentialFDDifference) / value * 1000).toFixed(2).toString();
  } else if (changeType === 'FDChange') {
    const avg = equipment.potentialGoalAvgCost;
    const costString = avg.split(' ');
    let value = Number(costString[0]);
    if (costString[1] == 'T') value *= 1000;
    if (isNaN(value) || isNaN(Number(newValue))) return '';
    output = (Number(newValue) / value * 1000).toFixed(2).toString();
  }
  if (output === '0' || output === '0.00' || output === 'NaN' || output === 'Infinity') return '';
  return output;
}

const splitPotential = (potential: string): [number, string] => {
  if (potential === '---') {
    return [0, 'M/Att'];
  }
  const split = potential.split(' ');
  return [Number(split[0].slice(0, -1)), split[1]];
}

export type CostEffectivenessItem = {
  characterName: string;
  equipmentType: string;
  equipmentName: string;
  costEffectiveness: number;
  fdDiff: string;
  avgCost: string;
}

export const getOrderedCostEffectiveness = (characters: Character[]): CostEffectivenessItem[] => {
  const items: CostEffectivenessItem[] = [];
  characters.forEach((char) => {
    char.equipments.forEach((eq) => {
      const val = parseFloat(eq.potentialCostEffectiveness);
      if (!isNaN(val) && val > 0) {
        items.push({
          characterName: char.name,
          equipmentType: eq.type,
          equipmentName: eq.name,
          costEffectiveness: val,
          fdDiff: eq.potentialFDDifference,
          avgCost: eq.potentialGoalAvgCost,
        })
      }
    })
  })
  return items.sort((a, b) => b.costEffectiveness - a.costEffectiveness);
}