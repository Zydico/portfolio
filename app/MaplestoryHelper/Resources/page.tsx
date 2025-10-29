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
    author: '', link: 'https://maplestorywiki.net/w/MapleStory_Wiki' },
  { name: 'Orange Mushroom Blog', 
    image: '../images/Maplestory Icons/OrangeMushroom.jpg',
    description: 'A blog with information on KMS changes (that are likely going to come to GMS later on)', 
    author: 'Max', link: 'https://orangemushroom.net/' },
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
                <td>{general.author}</td>
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