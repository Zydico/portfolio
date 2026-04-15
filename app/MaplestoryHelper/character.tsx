export type Character = {
  id: string;
  name: string;
  class: string;
  level: string;
  arcane: string;
  sacred: string;
  equipments: Equipment[];
}

export type Equipment = {
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
  potentialGoalAvgCost: string;
  potentialCostEffectiveness: string;
};

const defaultEquipment: Equipment = {
  id: '',
  type: '---',
  name: '---',
  sf: '0',
  attackFlame: '---',
  bossFlame: '---',
  damageFlame: '---',
  flame: '0.00',
  flameChance: '0.00',
  potentials: ['---', '---', '---'],
  potentialGoals: '---',
  potentialFDDifference: '0.00',
  potentialGoalAvgCost: '',
  potentialCostEffectiveness: '',
};

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

export const defaultCharacter: Character = {
  id: crypto.randomUUID(),
  name: 'Unnamed Char',
  class: 'Adele',
  level: '290',
  arcane: '1350',
  sacred: '660',
  equipments: equipmentList,
}