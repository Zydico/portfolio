'use client';

import { useRef, useState } from 'react';
import BossInfo from './BossInfo.json';
import './page.css';
import { simplifyNumber, roundUp5 } from '../pipes';

interface Boss {
    Difficulty: string,
    Crystal?: number,
    Level: number,
    HP: number[],
    Symbol?: number,
}

export default function Bossing() {
  const slider = useRef(null);
  const [mode, setMode] = useState('info');
  const bosses = new Map<string, Boss[]>(Object.entries(BossInfo));

  const getTotal = (numberArray: number[]): number => {
    return numberArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  }

  return (
    <section>
      <button className="shadow w-100 h-10 bg-white rounded-xl flex justify-center items-center relative cursor-pointer mb-5" onClick={() => setMode(mode == 'info' ? 'crystal' : 'info')}>
        <div className={`rounded-xl w-49 h-8 bg-[var(--color-maplestory-orange-selected)] absolute transition-all duration-200 ease-in-out ${mode == 'info' ? 'left-1' : 'left-1/2'}`} ref={slider}></div>
        <div className={`flex-1 z-2 transition duration-200 ${mode == 'info' ? 'text-white' : null}`}>Boss Information</div>
        <div className={`flex-1 z-2 transition duration-200 ${mode == 'crystal' ? 'text-white' : null}`}>Crystal Calculator</div>
      </button>

      <table className="boss-table">
        <thead>
          <tr>
            <th>Boss</th>
            <th>Difficulty</th>
            <th>Level</th>
            <th>Mesos</th>
            <th className="darken">HP</th>
            <th className="darken">5%</th>
            <th>AF/SF</th>
            <th>1.1x</th>
            <th>1.3x</th>
            <th>1.5x</th>
          </tr>            
        </thead>
          {[...bosses.entries()].map(([boss, difficulties]) => (
            <tbody key={boss}>
              <tr className="h-8">
                <td className="font-bold boss-label darken" rowSpan={difficulties.length}><div className="flex items-center"><img src={'../images/Maplestory Bosses/' + boss + '.png'} className='w-7 h-7 mr-2'></img>{boss}</div></td>
                <td className="">{difficulties[0].Difficulty}</td>
                <td className="text-center">{difficulties[0].Level}</td>
                <td className="simplified darken">{simplifyNumber(difficulties[0].Crystal ? difficulties[0].Crystal : null)}</td>
                <td className="simplified">{simplifyNumber(getTotal(difficulties[0].HP))}</td>
                <td className="simplified">{simplifyNumber(getTotal(difficulties[0].HP) * 0.05)}</td>
                <td className="darken simplified">{difficulties[0].Symbol ? difficulties[0].Symbol : null}</td>
                <td className="darken simplified">{difficulties[0].Symbol ? roundUp5(difficulties[0].Symbol*1.1) : null }</td>
                <td className="darken simplified">{difficulties[0].Symbol ? roundUp5(difficulties[0].Symbol*1.3) : null }</td>
                <td className="darken simplified">{difficulties[0].Symbol ? roundUp5(difficulties[0].Symbol*1.5) : null }</td>
              </tr>
              {difficulties.map((item, index) => (
                index > 0 ?
                <tr key={index} className="h-8">
                  <td className="">{item.Difficulty}</td>
                  <td className="text-center">{item.Level}</td>
                  <td className="simplified darken">{simplifyNumber(item.Crystal ? item.Crystal : null)}</td>
                  <td className="simplified">{simplifyNumber(getTotal(item.HP))}</td>
                  <td className="simplified">{simplifyNumber(getTotal(item.HP) * 0.05)}</td>
                  <td className="darken simplified">{item.Symbol ? item.Symbol : null}</td>
                  <td className="darken simplified">{item.Symbol ? roundUp5(item.Symbol*1.1) : null}</td>
                  <td className="darken simplified">{item.Symbol ? roundUp5(item.Symbol*1.3) : null}</td>
                  <td className="darken simplified">{item.Symbol ? roundUp5(item.Symbol*1.5) : null}</td>
                </tr> : null
              ))}
            </tbody>

            
          ))}
          {/* {tools.map((tool) => (
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
          ))} */}
      </table>

      {/* <div className="panel shadow w-full">
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
      </div> */}
    </section>
  );
}