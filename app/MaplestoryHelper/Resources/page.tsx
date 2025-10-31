const tools = [
  { name: 'Maple Scouter', 
    image: '../images/Maplestory Icons/Scouter.png',
    description: 'Popular website to optimize your character and find out which bosses you can clear', 
    author: '', link: 'https://maplescouter.com/' },
  { name: 'Maple Maps', 
    image: '',
    description: 'Helps you to optimize map rotations', 
    author: '', link: 'https://maplemaps.net/' },
  { name: 'Starforce Calculator', 
    image: '../images/Maplestory Icons/Starforce.png',
    description: 'Calculator to estimate expected Meso costs and booms when starforcing', 
    author: 'MathBro', link: 'https://brendonmay.github.io/starforceCalculator/' },
  { name: 'Cubing Calculator', 
    image: '../images/Maplestory Icons/Cube.webp',
    description: 'Calculator to estimate expected Meso costs when cubing', 
    author: 'MathBro', link: 'https://brendonmay.github.io/cubingCalculator/' },
  { name: 'Inner Ability Calculator', 
    image: '../images/Maplestory Icons/Honor.png',
    description: 'Calculator to estimate expected Meso or Honor costs when rolling inner abilities', 
    author: 'MathBro', link: 'https://brendonmay.github.io/innerAbilityCalculator/' },
  { name: 'Simple Flame Calculator', 
    image: '../images/Maplestory Icons/RedFlame.png',
    description: 'Simple calculator to estimate flame costs', 
    author: 'MathBro', link: 'https://brendonmay.github.io/flameCalculator/' },
  { name: 'In-Depth Flame Calculator', 
    image: '../images/Maplestory Icons/BlackFlame.png',
    description: 'More in-depth calculator to assist in deciding which flames are easiest to upgrade', 
    author: 'WhackyBeanz', link: 'https://www.whackybeanz.com/calc/equips/flames' },
];

const general = [
  { name: 'Maple Wiki', 
    image: '../images/Maplestory Icons/Wiki.png',
    description: 'The new and updated wiki page (not Fandom)', 
    author: '', link: 'https://maplestorywiki.net/w/MapleStory_Wiki',
    category: 'Info' },
  { name: 'Orange Mushroom Blog', 
    image: '../images/Maplestory Icons/OrangeMushroom.jpg',
    description: 'A blog with information on KMS changes (that are likely going to come to GMS later on)', 
    author: 'Max', link: 'https://orangemushroom.net/',
    category: 'Info' },
  { name: 'Boss Information', 
    image: '',
    description: 'General boss information from the bossing section of this page, but as an image', 
    author: 'Zydico', link: '../images/Maplestory Images/Boss Information.png',
    category: 'Info' },
  { name: 'Kaling Gauge Infographic', 
    image: '../images/Maplestory Bosses/Kaling.png',
    description: 'An extremely useful infographic to help with balancing the gauge in Kaling', 
    author: 'Kojow', link: '../images/Maplestory Images/KalingGauge.png', authorLink: 'https://www.reddit.com/r/Maplestory/comments/17zg6iz/kaling_seasons_string_balancing_infographic/',
    category: 'Guide' },
  { name: 'Hungry Muto Recipes', 
    image: '../images/Maplestory Icons/Muto.png',
    description: 'A list of all recipes for Hungry Muto', 
    author: '', link: '../images/Maplestory Images/HungryMuto.png',
    category: 'Guide' },
  { name: 'Esfera Guardian Cheat Sheet', 
    image: '../images/Maplestory Icons/EsferaGuardian.png',
    description: 'An image to help you to quickly complete Esfera Guardian', 
    author: '', link: '../images/Maplestory Images/EsferaGuardian.png',
    category: 'Guide' },
  { name: 'Black Mage Guide', 
    image: '../images/Maplestory Bosses/Black Mage.png',
    description: 'A comprehensive google doc guide for Black Mage', 
    author: 'Cruel, Bane, and Pinkberry', link: 'https://docs.google.com/document/d/1DGmZJC10VO3Je9BJ-P_61OTZna8N4llFdOd-HOuMYsg/edit?tab=t.0', authorLink: 'https://www.reddit.com/r/Maplestory/comments/gzd3nz/indepth_black_mage_guide/',
    category: 'Guide' },
  { name: 'Seren Guide', 
    image: '../images/Maplestory Bosses/Seren.png',
    description: 'A comprehensive google doc guide for Seren', 
    author: 'Cohesionless', link: 'https://docs.google.com/document/d/1uJodIyJfP3DxTQeJ5OX6Srk3ViWlx9ikgn2dipbB4Bc/edit?usp=sharing',
    category: 'Guide' },
  { name: 'Kalos Guide', 
    image: '../images/Maplestory Bosses/Kalos.png',
    description: 'A comprehensive google doc guide for Kalos', 
    author: 'exdrew', link: 'https://docs.google.com/document/d/1uozFcYcQktllBOZSMO1U3WQ4WzoedaYnlVxcig0PwOU/edit?usp=sharing',
    category: 'Guide' },
  { name: 'Kaling Guide', 
    image: '../images/Maplestory Bosses/Kaling.png',
    description: 'A comprehensive google doc guide for Kaling', 
    author: 'exdrew', link: 'https://docs.google.com/document/d/1_UkLtZ2vEM41Rqb2eAkktRCWuRdcGy7C2pQXwiatZEE/edit?usp=sharing',
    category: 'Guide' },
  { name: 'Limbo Guide', 
    image: '../images/Maplestory Bosses/Limbo.png',
    description: 'A comprehensive google doc guide for Limbo', 
    author: 'Bacun', link: 'https://docs.google.com/document/d/1ajabQUJk-0PSl9nZ6lyHNG5j7n-ofamXw0H1FaCIMcM/edit?usp=sharing',
    category: 'Guide' },
  { name: 'Everything EXP', 
    image: '../images/Maplestory Icons/TranscendentPotion.png',
    description: 'Everything that has to do with EXP', 
    author: 'WhackyBeanz', link: 'https://www.whackybeanz.com/calc/everything-exp',
    category: 'Info' },
  { name: 'EXP Tables', 
    image: '../images/Maplestory Icons/EXPVoucher.png',
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

export default function Resources() {
  return (
    <section>
      <div className="panel shadow w-full">
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
                <td>
                  { tool.image ? <img src={tool.image} className="w-6 h-6 mx-auto"></img> : null }
                  </td>
                <td>{tool.name}</td>
                <td>{tool.description}</td>
                <td>{tool.author}</td>
                <td>
                  { tool.link ? <a target="_blank" href={tool.link}>Link</a> : null }
                </td>
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
                <td>
                  { general.image ? <img src={general.image} className="w-6 h-6 mx-auto"></img> : null }
                  </td>
                <td>{general.name}</td>
                <td>{general.description}</td>
                <td>{ general.authorLink ? <a target="_blank" href={general.authorLink}>{general.author}</a> : general.author}</td>
                <td>{general.category}</td>
                <td>
                  { general.link ? <a target="_blank" href={general.link}>Link</a> : null }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}