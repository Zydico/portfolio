export const CLASSES: string[] = [
    'Adele', 'Angelic Buster', 'Aran', 'Ark', 'Battle Mage', 'Bishop', 'Blaster', 'Blaze Wizard', 'Bowmaster', 'Buccaneer', 'Cadena', 'Cannoneer', 'Corsair', 'Dark Knight',
    'Demon Avenger', 'Demon Slayer', 'Dual Blade', 'Evan', 'Fire/Poison', 'Hayato', 'Hero', 'Hoyoung', 'Ice/Lightning', 'Illium', 'Kain', 'Kaiser', 'Kanna', 'Khali', 'Kinesis',
    'Lara', 'Luminous', 'Lynn', 'Marksman', 'Mercedes', 'Mechanic', 'Mihile', 'Mo Xuan', 'Night Lord', 'Night Walker', 'Paladin', 'Pathfinder', 'Phantom', 'Ren', 'Shade',
    'Shadower', 'Sia Astelle', 'Thunder Breaker', 'Wild Hunter', 'Wind Archer', 'Xenon', 'Zero'
];

export const FIELDS: { label: string, advanced: boolean }[] = [
    { label: 'Name', advanced: false },
    { label: 'Starforce', advanced: false },
    { label: 'Flame', advanced: false },
    { label: 'Flame Upgrade %', advanced: true },
    { label: 'Potentials', advanced: false },
    { label: 'PotentialsLine2', advanced: false },
    { label: 'PotentialsLine3', advanced: false },
    { label: 'Potential Goals', advanced: true },
    { label: 'Potential Diff', advanced: true },
    { label: 'Potential FD% Diff', advanced: true } ,
    { label: 'Goal Avg Cost', advanced: true } ,
    { label: 'Cost Effectiveness', advanced: true },
];

export const EQUIPMENT_OPTIONS: Record<string, string[]> = {
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

export const TIERS: string[] = ['---', 'T3', 'T4', 'T5', 'T6', 'T7'];
export type GoalDef = {
    Option: string;
    Cost?: string;
    Cube?: string;
};

export const GEAR_POTENTIALS: {
    Lines: Record<string, string[]>;
    Goals: Record<string, GoalDef[]>;
} = {
    'Lines': {
        'WeaponHigher': ['---', '13% M/Att', '10% M/Att', '40% Boss', '35% Boss', '30% Boss'],
        'SecondaryLower': ['---', '12% M/Att', '9% M/Att', '40% Boss', '35% Boss', '30% Boss'],
        'SecondaryHigher': ['---', '13% M/Att', '10% M/Att', '40% Boss', '35% Boss', '30% Boss'],
        'EmblemLower': ['---', '12% M/Att', '9% M/Att'],
        'EmblemHigher': ['---', '13% M/Att', '10% M/Att'],
        'GeneralLower': ['---', '12% Main', '9% Main', '12% Sub', '9% Sub', '9% All', '6% All'],
        'GeneralHigher': ['---', '13% Main', '10% Main', '13% Sub', '10% Sub', '10% All', '7% All'],
        'HatLower': ['---', '12% Main', '9% Main', '12% Sub', '9% Sub', '9% All', '6% All', '-2s', '-1s'],
        'HatHigher': ['---', '13% Main', '10% Main', '13% Sub', '10% Sub', '10% All', '7% All', '-2s', '-1s'],
        'GloveHigher': ['---', '8% Crit', '13% Main', '10% Main', '13% Sub', '10% Sub', '10% All', '7% All'],
    },
    'Goals': {
        'WeaponHigher': [
            { 'Option': '---' },
            { Option: '33% M/Att', Cost: '55.74 B', Cube: 'Glowing' }, 
            { Option: '36% M/Att', Cost: '579.51 B', Cube: 'Bright' }, 
            { Option: '23% M/Att + 40% Boss', Cost: '285.55 B', Cube: 'Bright' }
        ],
        'SecondaryLower': [
            { Option: '---' },
            { Option: '30% M/Att', Cost: '86.79 B', Cube: 'Glowing' }, 
            { Option: '33% M/Att', Cost: '886.07 B', Cube: 'Bright' }, 
            { Option: '21% M/Att + 40% Boss', Cost: '436.40 B', Cube: 'Bright' }
        ],
        'SecondaryHigher': [
            { Option: '---' },
            { Option: '33% M/Att', Cost: '89.65 B', Cube: 'Glowing' }, 
            { Option: '36% M/Att', Cost: '902.22 B', Cube: 'Bright' }, 
            { Option: '23% M/Att + 40% Boss', Cost: '444.35 B', Cube: 'Bright' }
        ],
        'EmblemLower': [
            { Option: '---' },
            { Option: '30% M/Att', Cost: '38.42 B', Cube: 'Glowing' }, 
        ],
        'EmblemHigher': [
            { Option: '---' },
            { Option: '33% M/Att', Cost: '40.90 B', Cube: 'Glowing' }, 
            { Option: '36% M/Att', Cost: '391.80 B', Cube: 'Bright' }, 
        ],
        'HatLower': [
            { Option: '---' }, 
            { Option: '27% Main', Cost: '3.90 B', Cube: 'Glowing' }, 
            { Option: '30% Main', Cost: '10.97 B', Cube: 'Glowing' }, 
            { Option: '-2s + 18%', Cost: '7.66 B', Cube: 'Glowing' }, 
        ],
        'HatHigher': [
            { Option: '---' },
            { Option: '30% Main', Cost: '4.15 B', Cube: 'Glowing' }, 
            { Option: '33% Main', Cost: '11.67 B', Cube: 'Glowing' }, 
            { Option: '36% Main', Cost: '96.60 B', Cube: 'Bright' }, 
            { Option: '-2s + 20%', Cost: '7.69 B', Cube: 'Glowing' }, 
            { Option: '-2s + 23%', Cost: '91.4 B', Cube: 'Bright' }, 
            { Option: '-4s', Cost: '35.90 B', Cube: 'Bright' }, 
            { Option: '-4s + 10%', Cost: '210.00 B', Cube: 'Bright' }, 
        ],
        'GloveHigher': [
            { Option: '---' },
            { Option: '16% Crit', Cost: '9.00 B', Cube: 'Bright' }, 
            { Option: '16% Crit + 10%', Cost: '55.08 B', Cube: 'Bright' }, 
        ],
        'TopLower': [
            { Option: '---' },
            { Option: '27% Main', Cost: '5.05 B', Cube: 'Glowing' },
            { Option: '30% Main', Cost: '13.81 B', Cube: 'Glowing' },
        ],
        'TopHigher': [
            { Option: '---' },
            { Option: '30% Main', Cost: '5.38 B', Cube: 'Glowing' },
            { Option: '33% Main', Cost: '14.20 B', Cube: 'Glowing' },
            { Option: '36% Main', Cost: '99.04 B', Cube: 'Bright' },
        ],
        'BottomLower': [
            { Option: '---' },
            { Option: '27% Main', Cost: '3.01 B', Cube: 'Glowing' },
            { Option: '30% Main', Cost: '8.24 B', Cube: 'Glowing' },
        ],
        'BottomHigher': [
            { Option: '---' },
            { Option: '30% Main', Cost: '3.21 B', Cube: 'Glowing' },
            { Option: '33% Main', Cost: '8.47 B', Cube: 'Glowing' },
            { Option: '36% Main', Cost: '59.55 B', Cube: 'Bright' },
        ],
        'ShoeHigher': [
            { Option: '---' },
            { Option: '30% Main', Cost: '3.44 B', Cube: 'Glowing' },
            { Option: '33% Main', Cost: '9.51 B', Cube: 'Glowing' },
            { Option: '36% Main', Cost: '71.77 B', Cube: 'Bright' },
        ],
        'CapeHigher': [
            { Option: '---' },
            { Option: '30% Main', Cost: '2.69 B', Cube: 'Glowing' },
            { Option: '33% Main', Cost: '7.41 B', Cube: 'Glowing' },
            { Option: '36% Main', Cost: '55.63 B', Cube: 'Bright' },
        ],
        'ShoulderHigher': [
            { Option: '---' },
            { Option: '30% Main', Cost: '2.69 B', Cube: 'Glowing' },
            { Option: '33% Main', Cost: '7.41 B', Cube: 'Glowing' },
            { Option: '36% Main', Cost: '56.63 B', Cube: 'Bright' },
        ]
    }
};
  
export const LOWER_GEAR: string[] = ['Gold', 'PNo', 'Deimos', 'RFS', 'Evolving', 'CRA'];