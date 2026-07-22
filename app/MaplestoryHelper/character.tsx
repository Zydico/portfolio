export type Character = {
  id: string;
  name: string;
  class: string;
  equipments: Equipment[];
  showAdvanced: boolean;
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

const equipmentTypes: string[] = [
  // WSE + Armors
  'Weapon', 'Secondary', 'Emblem', 'Hat', 'Top', 'Bottom', 'Glove', 'Shoe', 'Cape', 'Shoulder',
  // Rings & Pendants
  'Ring 1', 'Ring 2', 'Ring 3', 'Oz Ring 1', 'Oz Ring 2', 'Pendant 1', 'Pendant 2',
  // Other Accessories
  'Eye', 'Face', 'Earring', 'Belt', 'Pocket', 'Heart', 'Badge', 'Medal'
];
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
equipmentList[3].name = 'CRA';
equipmentList[4].name = 'CRA';
equipmentList[5].name = 'CRA';
equipmentList[6].name = 'Arcane';
equipmentList[7].name = 'Arcane';
equipmentList[8].name = 'Arcane';
equipmentList[9].name = 'Arcane';
equipmentList[10].name = 'Sup Gollux';
equipmentList[11].name = 'Slime Ring';
equipmentList[12].name = 'KT';
equipmentList[13].name = 'ROR4';
equipmentList[14].name = 'WJ4';
equipmentList[15].name = '---';
equipmentList[16].name = '---';
equipmentList[17].name = '---';
equipmentList[18].name = '---';
equipmentList[19].name = 'Sup Gollux';
equipmentList[20].name = 'Sup Gollux';
equipmentList[21].name = '---';
equipmentList[22].name = '---';
equipmentList[23].name = 'Magnus';
equipmentList[24].name = 'Vellum';

export const defaultCharacter: Character = {
  id: crypto.randomUUID(),
  name: 'Unnamed Char',
  class: 'Adele',
  equipments: equipmentList,
  showAdvanced: true,
}