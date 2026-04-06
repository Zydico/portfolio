import './page.css';

type Tool = {
  name: string,
  image?: string,
  description: string,
  author?: string,
  link?: string,
};

type General = Tool & {
  category: string;
  authorLink?: string;
};

type ClassInfo = {
  name: string;
  image?: string;
  guide?: string;
  discord?: string;
};

const tools: Tool[] = [
  { name: 'Maple Scouter', 
    image: '../images/Maplestory/Icons/Scouter.png',
    description: 'Popular website to optimize your character and find out which bosses you can clear', 
    author: '', link: 'https://maplescouter.com/' },
  { name: 'Maple Maps', 
    image: '',
    description: 'Helps you to optimize map rotations', 
    author: '', link: 'https://maplemaps.net/' },
  { name: 'Maple Ranks', 
    image: '../images/Maplestory/Icons/MapleRanks.png',
    description: 'A website to track your level progression and look at job rankings', 
    author: '', link: 'https://mapleranks.com/' },
  { name: 'Starforce Calculator', 
    image: '../images/Maplestory/Icons/Starforce.png',
    description: 'Calculator to estimate expected Meso costs and booms when starforcing', 
    author: 'MathBro', link: 'https://brendonmay.github.io/starforceCalculator/' },
  { name: 'Cubing Calculator', 
    image: '../images/Maplestory/Icons/Cube.webp',
    description: 'Calculator to estimate expected Meso costs when cubing', 
    author: 'MathBro', link: 'https://brendonmay.github.io/cubingCalculator/' },
  { name: 'Inner Ability Calculator', 
    image: '../images/Maplestory/Icons/Honor.png',
    description: 'Calculator to estimate expected Meso or Honor costs when rolling inner abilities', 
    author: 'MathBro', link: 'https://brendonmay.github.io/innerAbilityCalculator/' },
  { name: 'Simple Flame Calculator', 
    image: '../images/Maplestory/Icons/RedFlame.png',
    description: 'Simple calculator to estimate flame costs', 
    author: 'MathBro', link: 'https://brendonmay.github.io/flameCalculator/' },
  { name: 'In-Depth Flame Calculator', 
    image: '../images/Maplestory/Icons/BlackFlame.png',
    description: 'More in-depth calculator to assist in deciding which flames are easiest to upgrade', 
    author: 'WhackyBeanz', link: 'https://www.whackybeanz.com/calc/equips/flames' },
];

const general: General[] = [
  { name: 'Maple Wiki', 
    image: '../images/Maplestory/Icons/Wiki.png',
    description: 'The new and updated wiki page (not Fandom)', 
    author: '', link: 'https://maplestorywiki.net/w/MapleStory_Wiki',
    category: 'Info' },
  { name: 'Orange Mushroom Blog', 
    image: '../images/Maplestory/Icons/OrangeMushroom.jpg',
    description: 'A blog with information on KMS changes (that are likely going to come to GMS later on)', 
    author: 'Max', link: 'https://orangemushroom.net/',
    category: 'Info' },
  { name: 'Boss Information', 
    image: '',
    description: 'General boss information from the bossing section of this page, but as an image', 
    author: 'Zydico', link: '../images/Maplestory/Boss Information.png',
    category: 'Info' },
  { name: 'Kaling Gauge Infographic', 
    image: '../images/Maplestory/Bosses/Kaling.png',
    description: 'An extremely useful infographic to help with balancing the gauge in Kaling', 
    author: 'Kojow', link: '../images/Maplestory/KalingGauge.png', authorLink: 'https://www.reddit.com/r/Maplestory/comments/17zg6iz/kaling_seasons_string_balancing_infographic/',
    category: 'Guide' },
  { name: 'Esfera Guardian Cheat Sheet', 
    image: '../images/Maplestory/Icons/EsferaGuardian.png',
    description: 'An image to help you to quickly complete Esfera Guardian', 
    author: '', link: '../images/Maplestory/EsferaGuardian.png',
    category: 'Guide' },
  { name: 'Black Mage Guide', 
    image: '../images/Maplestory/Bosses/Black Mage.png',
    description: 'A comprehensive google doc guide for Black Mage', 
    author: 'Cruel, Bane, and Pinkberry', link: 'https://docs.google.com/document/d/1DGmZJC10VO3Je9BJ-P_61OTZna8N4llFdOd-HOuMYsg/edit?tab=t.0', authorLink: 'https://www.reddit.com/r/Maplestory/comments/gzd3nz/indepth_black_mage_guide/',
    category: 'Guide' },
  { name: 'Seren Guide', 
    image: '../images/Maplestory/Bosses/Seren.png',
    description: 'A comprehensive google doc guide for Seren', 
    author: 'Cohesionless', link: 'https://docs.google.com/document/d/1uJodIyJfP3DxTQeJ5OX6Srk3ViWlx9ikgn2dipbB4Bc/edit?usp=sharing',
    category: 'Guide' },
  { name: 'Kalos Guide', 
    image: '../images/Maplestory/Bosses/Kalos.png',
    description: 'A comprehensive google doc guide for Kalos', 
    author: 'exdrew', link: 'https://docs.google.com/document/d/1uozFcYcQktllBOZSMO1U3WQ4WzoedaYnlVxcig0PwOU/edit?usp=sharing',
    category: 'Guide' },
  { name: 'Kaling Guide', 
    image: '../images/Maplestory/Bosses/Kaling.png',
    description: 'A comprehensive google doc guide for Kaling', 
    author: 'exdrew', link: 'https://docs.google.com/document/d/1_UkLtZ2vEM41Rqb2eAkktRCWuRdcGy7C2pQXwiatZEE/edit?usp=sharing',
    category: 'Guide' },
  { name: 'Limbo Guide', 
    image: '../images/Maplestory/Bosses/Limbo.png',
    description: 'A comprehensive google doc guide for Limbo', 
    author: 'Bacun', link: 'https://docs.google.com/document/d/1ajabQUJk-0PSl9nZ6lyHNG5j7n-ofamXw0H1FaCIMcM/edit?usp=sharing',
    category: 'Guide' },
  { name: 'Mystic Frontier Familiar Elements/Types', 
    image: '',
    description: 'A list of familiar elements and types that are easy to farm', 
    author: '', link: 'https://docs.google.com/spreadsheets/d/1V77_vMMQjLuV3EI69QYl_FkzmLoPs43sAaueJ44cJ-c/edit?usp=sharing',
    category: 'Info' },
  { name: 'Everything EXP', 
    image: '../images/Maplestory/Icons/TranscendentPotion.png',
    description: 'Everything that has to do with EXP', 
    author: 'WhackyBeanz', link: 'https://www.whackybeanz.com/calc/everything-exp',
    category: 'Info' },
  { name: 'EXP Tables', 
    image: '../images/Maplestory/Icons/EXPVoucher.png',
    description: 'Google sheet with information about EXP tickets, Punch King, Epic Dungeons, etc.', 
    author: '', link: 'https://docs.google.com/spreadsheets/d/1XqLbZndEF2qirccb5bBRRd6ssql2Pea1WI7szvLtI6Y/edit?usp=sharing',
    category: 'Info' },
  { name: 'Scrapyard Rerolling Guide', 
    image: '',
    description: 'A google sheet to assist in deciding which Scrapyard/Haven weeklies to reroll', 
    author: 'GyroBallMetagross', link: 'https://docs.google.com/spreadsheets/d/1FJcMQHfhsDNsRQW_KhrmR3uyWmudv8e8Y_nY5uawKAg/edit?usp=sharing', authorLink: 'https://www.reddit.com/user/GyroBallMetagross',
    category: 'Guide' },
  { name: 'Ninja Castle Guide', 
    image: '',
    description: 'A google sheet to assist in completing Ninja Castle', 
    author: 'Rexaar2', link: 'https://docs.google.com/spreadsheets/d/1i7JcNW08Ck0rtF1cFywrS1rRefMFzPuB32VdrQtSHqM/edit?usp=sharing', authorLink: 'https://www.reddit.com/user/Rexaar2',
    category: 'Guide' },
  { name: 'Reboot/Heroic New Player Guide', 
    image: '',
    description: 'A comprehensive guide for new players', 
    author: 'Altorem', link: 'https://docs.google.com/presentation/d/1qhdHK0GNK3qoKZUe_27yFWQ2hMAZy-ovkICKsH1-f2c/edit?usp=sharing', authorLink: 'https://www.reddit.com/r/Maplestory/comments/1hjrmn3/heroic_server_guide_for_beginners_updated_for_v256/',
    category: 'Guide' },
  { name: 'Formulas', 
    image: '',
    description: 'A list of useful formulas (damage modifiers, exp modifiers, etc.)', 
    author: '', link: 'https://strategywiki.org/wiki/MapleStory/Formulas',
    category: 'Info' },
  { name: 'Maplestory Official Discord Server', 
    image: '../images/Discord.png',
    description: 'The official Maplestory Discord server', 
    author: '', link: 'https://discord.com/invite/maplestory',
    category: 'Discord' },
  { name: 'Reboot Central Discord Server', 
    image: '../images/Discord.png',
    description: 'Reboot/Heroic server centered Discord server', 
    author: '', link: 'https://discord.com/invite/8Z6eGYFgPk',
    category: 'Discord' },
  { name: 'Maple Legion Discord Server', 
    image: '../images/Discord.png',
    description: 'A Discord server with information and links for every class', 
    author: '', link: 'https://discord.gg/maple-legion-862672763404025896',
    category: 'Discord' },
  { name: 'Maplestory Studio', 
    image: '',
    description: 'A website to help you simulate/preview your character appearance', 
    author: '', link: 'https://maplestory.studio/',
    category: 'Fashion' },
  { name: 'Maplestory Simulator', 
    image: '',
    description: 'A website to help you simulate/preview your character appearance. Runs faster I think', 
    author: '', link: 'https://maplestory.studio/',
    category: 'Fashion' },
  { name: 'Maplesalon', 
    image: '',
    description: 'A website to preview color combinations for mix coupons', 
    author: '丫村', link: 'https://maplesalon.vercel.app/en',
    category: 'Fashion' }
];

const classInfo: ClassInfo[] = [
  { name: 'Adele', 
    image: '../images/Maplestory/Classes/Icons/Adele.png',
    guide: 'https://docs.google.com/document/d/1FYhaPrUcSZtJM19-oxnKyVocewpHro9w3pTkwg3IiKU/edit?usp=sharing',
    discord: 'https://discord.gg/q7tYdfT' },
  { name: 'Angelic Buster', 
    image: '../images/Maplestory/Classes/Icons/Angelic Buster.png',
    guide: 'https://docs.google.com/document/d/13ceGRfEU9iULpAX7Fm3xtO1zrkDL4lWMqY3jmcbZOpc/edit?tab=t.0',
    discord: 'https://discord.gg/3C9J2CYYsf' },
  { name: 'Aran',
    image: '../images/Maplestory/Classes/Icons/Aran.png',
    guide: '',
    discord: 'https://discord.gg/WpJ4VDta8V' },
  { name: 'Ark',
    image: '../images/Maplestory/Classes/Icons/Ark.png',
    guide: 'https://docs.google.com/document/d/1fA0jEOp5pUikqDUht0GadFPTzhxYTWZTVO_rNkz9erQ/edit#heading=h.6v88f7gdlhsv',
    discord: 'https://discord.gg/ZvPTz6v' },
  { name: 'Battle Mage',
    image: '../images/Maplestory/Classes/Icons/Battle Mage.png',
    guide: 'https://docs.google.com/document/d/1GSP16fN2SZC0f7StnHpyzxk_90NjTL337LkwbC_9yfM/edit',
    discord: 'https://discord.gg/HsTgS8svrf' },
  { name: 'Bishop',
    image: '../images/Maplestory/Classes/Icons/Bishop.png',
    guide: 'https://docs.google.com/document/d/11OaoVNl-VacN7XncfLWJxlHmAIePB10fhwWNT8WVf38/edit#heading=h.vdn8atyw677l',
    discord: 'https://discord.gg/PX2v4BV3Qp' },
  { name: 'Blaster',
    image: '../images/Maplestory/Classes/Icons/Blaster.png',
    guide: '',
    discord: 'https://discord.gg/QXvbNp8zqu' },
  { name: 'Blaze Wizard',
    image: '../images/Maplestory/Classes/Icons/Blaze Wizard.png',
    guide: 'https://docs.google.com/document/d/1YB3rBntxbUngJ5BnCTG19SqW1LfoPos6pfS-r5gaU1s/',
    discord: 'https://discord.gg/gTuaWGrcvV' },
  { name: 'Bowmaster',
    image: '../images/Maplestory/Classes/Icons/Bowmaster.png',
    guide: 'https://docs.google.com/document/d/14Ob3MKysPnv7aQ31uLm0SkBLpKZSSjKRuwh_2nn28HE/edit?usp=sharing',
    discord: 'https://discord.gg/4FNPWj5Pmv' },
  { name: 'Buccaneer',
    image: '../images/Maplestory/Classes/Icons/Buccaneer.png',
    guide: 'https://docs.google.com/document/d/1M1jTSVxLkmXLbt1Dpwh9yP3D7yO7SIL5FWD6HCFweAo/edit?usp=sharing',
    discord: 'https://discord.gg/EPxuyRy' },
  { name: 'Cadena',
    image: '../images/Maplestory/Classes/Icons/Cadena.png',
    guide: 'https://docs.google.com/document/d/1mpmXgE5pWITvp3OHlV0LTmekFiXoZr4Zdb8X_Kv2i14/edit',
    discord: 'https://discord.gg/5rKRYYCA4v' },
  { name: 'Cannoneer',
    image: '../images/Maplestory/Classes/Icons/Cannoneer.png',
    guide: '',
    discord: 'https://discord.gg/XJzkgQRPcM' },
  { name: 'Corsair',
    image: '../images/Maplestory/Classes/Icons/Corsair.png',
    guide: 'https://docs.google.com/document/d/1xmDcv2uF65cVIbLMHpJIGcd2NQGMbYaZZhwKTOaCsQg/edit',
    discord: 'https://discord.gg/eNFCVDuGbB' },
  { name: 'Dark Knight',
    image: '../images/Maplestory/Classes/Icons/Dark Knight.png',
    guide: '',
    discord: 'https://discord.gg/N36cqyAVfa' },
  { name: 'Dawn Warrior',
    image: '../images/Maplestory/Classes/Icons/Dawn Warrior.png',
    guide: 'https://docs.google.com/document/d/1iQfiF7q78bmZtBujnLcAkDNDjqiHqm7iZ2QjUfKRd-g/edit',
    discord: 'https://discord.gg/g5VcuQQ8Ng' },
  { name: 'Demon Avenger',
    image: '../images/Maplestory/Classes/Icons/Demon Avenger.png',
    guide: '',
    discord: 'https://discord.gg/aTByagnDjd ' },
  { name: 'Demon Slayer',
    image: '../images/Maplestory/Classes/Icons/Demon Slayer.png',
    guide: 'https://dexless.com/guides/6odly6ixs-guide-to-demon-slayer.183/',
    discord: 'https://discord.gg/XpJA3u8Scd' },
  { name: 'Dual Blade',
    image: '../images/Maplestory/Classes/Icons/Dual Blade.png',
    guide: '',
    discord: 'https://discord.gg/sv8JuUqBGQ' },
  { name: 'Evan',
    image: '../images/Maplestory/Classes/Icons/Evan.png',
    guide: '',
    discord: 'https://discord.gg/5BfVGGD' },
  { name: 'Fire/Poison',
    image: '../images/Maplestory/Classes/Icons/Fire Poison.png',
    guide: 'https://docs.google.com/document/d/1LkW-vMTSQDwJFe2B2SmVeKBeWRXlIK4l58M2IBtkPso/edit?usp=sharing',
    discord: 'https://discord.gg/PX2v4BV3Qp' },
  { name: 'Hayato',
    image: '../images/Maplestory/Classes/Icons/Hayato.png',
    guide: 'https://docs.google.com/document/d/1P4mBaIAc-YgycrtemcaUmuo13YRkbA0FP-MbJb1fzIo/edit#heading=h.vclvz2firi4r',
    discord: 'https://discord.gg/EAkfmrx' },
  { name: 'Hero',
    image: '../images/Maplestory/Classes/Icons/Hero.png',
    guide: 'https://buffhero.win/',
    discord: 'https://discord.gg/dsdSz9CGJE' },
  { name: 'Hoyoung',
    image: '../images/Maplestory/Classes/Icons/Hoyoung.png',
    guide: 'https://hoyoung.directory/',
    discord: 'https://discord.gg/aWprrWUTAJ' },
  { name: 'Ice/Lightning',
    image: '../images/Maplestory/Classes/Icons/Ice Lightning.png',
    guide: 'https://docs.google.com/document/d/1fVI8tdEwBDigRD9HTcVIYtoFhm1ggXzsJMlIG_9_lAk/edit?usp=drivesdk',
    discord: 'https://discord.gg/PX2v4BV3Qp' },
  { name: 'Illium',
    image: '../images/Maplestory/Classes/Icons/Illium.png',
    guide: 'https://docs.google.com/document/d/1yRtTynFk6jNthJlBwCSTeM4rcV3taEnwx9DOJ9MzBds/edit?tab=t.0',
    discord: 'https://discord.gg/BJq7QweeH2' },
  { name: 'Kain',
    image: '../images/Maplestory/Classes/Icons/Kain.png',
    guide: 'https://docs.google.com/document/d/1Vl-G1C_bWzDio13cSnROD3RA1EoeR4mMjv28g_UY4dY/edit#heading=h.1h9wbtfzr8eq',
    discord: 'https://discord.gg/WyZ24Dm8fD' },
  { name: 'Kaiser',
    image: '../images/Maplestory/Classes/Icons/Kaiser.png',
    guide: 'https://docs.google.com/document/d/12iH3vqAQCelM7QC2Kgm4qYQE4nUttGEKh2_r5k7R5Vw/edit?usp=sharing',
    discord: 'https://discord.gg/DGHZJ8s' },
  { name: 'Kanna',
    image: '../images/Maplestory/Classes/Icons/Kanna.png',
    guide: 'https://docs.google.com/document/d/1Xp7JD_YEDGyZD613QT7BGXO1kOtF2ze1E2hUDSkuxSc/edit?usp=sharing',
    discord: 'https://discord.gg/zbH8e2xC7H' },
  { name: 'Khali',
    image: '../images/Maplestory/Classes/Icons/Khali.png',
    guide: '',
    discord: 'https://discord.gg/an6dkrgXTr' },
  { name: 'Kinesis',
    image: '../images/Maplestory/Classes/Icons/Kinesis.png',
    guide: 'https://docs.google.com/document/d/1eOsYMHVZMeb9X85p5K-O4JLIN15ifkczxTAuwS657OI/edit?tab=t.0',
    discord: 'https://discord.gg/yua4VdQWFw' },
  { name: 'Lara',
    image: '../images/Maplestory/Classes/Icons/Lara.png',
    guide: '',
    discord: 'https://discord.gg/g33kJR5yWH' },
  { name: 'Luminous',
    image: '../images/Maplestory/Classes/Icons/Luminous.png',
    guide: '',
    discord: 'https://discord.gg/KBpPTtae6P' },
  { name: 'Lynn',
    image: '../images/Maplestory/Classes/Icons/Lynn.png',
    guide: 'https://docs.google.com/document/d/1jklP4eFm2ZL7UldT-NrmzGNwQekJOfRH54EAAlBWDUg/edit?tab=t.0',
    discord: 'https://discord.gg/czcga75tHQ' },
  { name: 'Marksman',
    image: '../images/Maplestory/Classes/Icons/Marksman.png',
    guide: '',
    discord: 'https://discord.gg/BYvnXkz9cv' },
  { name: 'Mercedes',
    image: '../images/Maplestory/Classes/Icons/Mercedes.png',
    guide: 'https://docs.google.com/document/d/1Sz5rdODR3cgaw3WcfjjVN_OBQV2298vc_kVyFOfdh_8/',
    discord: 'https://discord.gg/tJWfMrdFBJ' },
  { name: 'Mechanic',
    image: '../images/Maplestory/Classes/Icons/Mechanic.png',
    guide: '',
    discord: 'https://discord.gg/rEDPzdmCmj' },
  { name: 'Mihile',
    image: '../images/Maplestory/Classes/Icons/Mihile.png',
    guide: 'https://docs.google.com/document/d/1PQKPlHGbvqT7dftm2-jk9i8SiBLRkaY5E0DpE0unK5I/edit',
    discord: 'https://discord.gg/6SPVvZRWJM' },
  { name: 'Mo Xuan',
    image: '../images/Maplestory/Classes/Icons/Mo Xuan.png',
    guide: 'https://docs.google.com/document/d/1ZhYf1f5c6MXkNaicqkIYMQegiUUYwo5vlxoNdeJcxKM/edit?tab=t.0',
    discord: 'https://discord.gg/a3z6JYmHbt' },
  { name: 'Night Lord',
    image: '../images/Maplestory/Classes/Icons/Night Lord.png',
    guide: 'https://docs.google.com/document/d/16GI6FLwcS3aunYHqXsOEuqQIZ3g5N8V3SHc--RyW8X8/edit?usp=sharing',
    discord: 'https://discord.gg/AvP8wq4' },
  { name: 'Night Walker',
    image: '../images/Maplestory/Classes/Icons/Night Walker.png',
    guide: '',
    discord: 'https://discord.gg/FR55ADj' },
  { name: 'Paladin',
    image: '../images/Maplestory/Classes/Icons/Paladin.png',
    guide: 'https://docs.google.com/document/d/1aAQV9QGR4UywDGhQq1O3X7blXADPGDMvgDIAKfCmrH8',
    discord: 'https://discord.gg/7qyGfmtRt2' },
  { name: 'Pathfinder',
    image: '../images/Maplestory/Classes/Icons/Pathfinder.png',
    guide: 'https://docs.google.com/document/d/e/2PACX-1vQAthq_f1FtuK1M6PRNsV1j9MMKJHK1LW7eMVhq4hAUfPYS0okmhJZ_oEsKHBJoYgpzkioA_uiBmrtA/pub#h.5mjils8go7x',
    discord: 'https://discord.gg/vNewpgXTbX' },
  { name: 'Phantom',
    image: '../images/Maplestory/Classes/Icons/Phantom.png',
    guide: 'https://docs.google.com/document/d/1rrl6haeeYpeYaCuDhqbK_qL_IMBbRPbF60D-hq0vgSg/edit?usp=sharing',
    discord: 'https://discord.gg/225H7sw' },
  { name: 'Ren',
    image: '../images/Maplestory/Classes/Icons/Ren.png',
    guide: '',
    discord: 'http://discord.gg/52rC3geGqC' },
  { name: 'Shade',
    image: '../images/Maplestory/Classes/Icons/Shade.png',
    guide: '',
    discord: 'https://discord.gg/G86EwxDbv6' },
  { name: 'Shadower',
    image: '../images/Maplestory/Classes/Icons/Shadower.png',
    guide: 'https://docs.google.com/document/d/1NKBCWe9a2P2RKo8jScEv5EjAj4hVWsBu-9DW9dZMTvI/edit?usp=sharing',
    discord: 'https://discord.gg/G2KsKr5MHC' },
  { name: 'Sia Astelle',
    image: '../images/Maplestory/Classes/Icons/Sia Astelle.png',
    guide: '',
    discord: 'http://discord.gg/9pUBfTsntS' },
  { name: 'Thunder Breaker',
    image: '../images/Maplestory/Classes/Icons/Thunder Breaker.png',
    guide: '',
    discord: 'http://discord.gg/ewyWwFQ' },
  { name: 'Wild Hunter',
    image: '../images/Maplestory/Classes/Icons/Wild Hunter.png',
    guide: '',
    discord: 'https://discord.gg/3evaYBDwAG' },
  { name: 'Wind Archer',
    image: '../images/Maplestory/Classes/Icons/Wind Archer.png',
    guide: 'https://docs.google.com/document/d/1oqZegwzp5pzOArQ_NKYpoYZTxkV_8kq_3W_EQ8SzSDc/edit?usp=sharing',
    discord: 'https://discord.gg/4pbZMeThgP' },
  { name: 'Xenon',
    image: '../images/Maplestory/Classes/Icons/Xenon.png',
    guide: 'https://docs.google.com/document/d/1bpARm1tksZ2LdVCBWoClaNlyjEhvs0IHJqQShr1o99M',
    discord: 'https://discord.gg/4BCGuCC' },
  { name: 'Zero',
    image: '../images/Maplestory/Classes/Icons/Zero.png',
    guide: 'https://docs.google.com/document/d/1ygEhU_gZjm6tY8ngi0hzZ6ZduNoGuZqdcPsiMV1pdf8/edit?usp=sharing',
    discord: 'https://discord.gg/wFAHprps3Z' },
];

export default function Resources() {
  return (
    <section id="resourcesPage">
      <div className="panel shadow inline-flex flex-wrap flex-col">
        <h1 className="">Tools</h1>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Link</th>
            </tr>            
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.name}>
                <td>{tool.image ? <img src={tool.image} className="w-6 h-6 mx-auto"></img> : null}</td>
                <td>{tool.name}</td>
                <td>{tool.description}</td>
                <td>{tool.author}</td>
                <td>{tool.link ? <a target="_blank" href={tool.link}>Link</a> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="pt-5">General Information</h1>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Category</th>
              <th>Link</th>
            </tr>            
          </thead>
          <tbody>
            {general.map((general) => (
              <tr key={general.name}>
                <td>{general.image ? <img src={general.image} className="w-6 h-6 mx-auto"></img> : null}</td>
                <td>{general.name}</td>
                <td>{general.description}</td>
                <td>{general.authorLink ? <a target="_blank" href={general.authorLink}>{general.author}</a> : general.author}</td>
                <td>{general.category}</td>
                <td>{general.link ? <a target="_blank" href={general.link}>Link</a> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="pt-5">Class Information</h1>
        <p className="mb-3">
          Keep in mind, the infographic and hexa links may be outdated, so it is better to take a look at the guide or class discord.
        </p>
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Class</th>
              <th>Guide</th>
              <th>Discord</th>
            </tr>            
          </thead>
          <tbody>
            {classInfo.map((classInfo) => (
              <tr key={classInfo.name}>
                <td>{classInfo.image ? <img src={classInfo.image} className="w-6 h-6 mx-auto"></img> : null}</td>
                <td>{classInfo.name}</td>
                <td>{classInfo.guide ? <a target="_blank" href={classInfo.guide}>Link</a> : null}</td>
                <td>{classInfo.discord ? <a target="_blank" href={classInfo.discord}>Link</a> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}