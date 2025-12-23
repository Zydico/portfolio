'use client';

import { useRef, useState } from 'react';
import ArcaneBossInfo from './ArcaneBossInfo.json';
import GrandisBossInfo from './GrandisBossInfo.json';
import './page.css';
import { simplifyNumber, roundUp5, numberInputValidation } from '../pipes';

interface Boss {
  Difficulty: string,
  Crystal?: number,
  Level: number,
  HP: number[],
  Symbol?: number,
  SymbolType?: string,
  MaxParty?: number,
  Traces?: number,
  Notes?: string
}

export default function Bossing() {
  const slider = useRef(null);
  const [mode, setMode] = useState('info');
  const arcaneBosses = new Map<string, Boss[]>(Object.entries(ArcaneBossInfo));
  const grandisBosses = new Map<string, Boss[]>(Object.entries(GrandisBossInfo));
  const [partySize, setPartySize] = useState(1);
  const [level, setLevel] = useState(295);
  const [arcane, setArcane] = useState(1350);
  const [sacred, setSacred] = useState(660);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type == 'party' || type == 'level') {
      numberInputValidation(e, 1);
    } else if (type == 'arcane' || type == 'sacred') {
      numberInputValidation(e, 0);
    }
    let value = Number(e.target.value);
    if (value >= e.target.minLength && value <= e.target.maxLength) {
      switch(type) {
        case 'party':
          setPartySize(value);
          break;
        case 'level':
          setLevel(value);
          break;
        case 'arcane':
          setArcane(value);
          break;
        case 'sacred':
          setSacred(value);
          break;
      }
    }
  }

  const getTotal = (numberArray: number[]): number => {
    return numberArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  }

  const calculateTotalFD = (bossLevel: number, bossSymbol: number | undefined, symbolType: string | undefined): string => {
    const maxLevelFD = 1.2;
    let maxSymbolFD = 1.5;
    let levelFD = 0.0;
    let symbolFD = 0.0;
    let totalFD = 0.0;
    if ((level - bossLevel) >= 0) {
      levelFD = Math.min(1.0 + 0.1 + 0.02 * (level - bossLevel), maxLevelFD);
    } else if (((level - bossLevel) >= -4) && (level < bossLevel)) {
      levelFD = (1.1 - 0.02 * (bossLevel - level)) * (1.0 - Math.floor((2.5 * (bossLevel - level)))/100);
    } else if ((level - bossLevel < -4)) {
      levelFD = Math.max(1.0 - Math.floor((2.5 * (bossLevel - level)))/100, 0);
    }

    if (bossSymbol && symbolType) {
      let symbol = 0;
      if (symbolType == 'Arcane') {
        symbol = arcane;
        if (bossSymbol == 1320) { // Black Mage
          maxSymbolFD = 1.3;
        }
        if (symbol >= bossSymbol * 1.5) {
          symbolFD = 1.5;
        } else if ((symbol >= bossSymbol * 1.3) && (symbol < bossSymbol * 1.5)) {
          symbolFD = 1.3;
        } else if ((symbol >= bossSymbol * 1.1) && (symbol < bossSymbol * 1.3)) {
          symbolFD = 1.1;
        } else if ((symbol >= bossSymbol * 1.0) && (symbol < bossSymbol * 1.1)) {
          symbolFD = 1.0;
        } else if ((symbol >= bossSymbol * 0.7) && (symbol < bossSymbol * 1.0)) {
          symbolFD = 0.8;
        } else if ((symbol >= bossSymbol * 0.5) && (symbol < bossSymbol * 0.7)) {
          symbolFD = 0.7;
        } else if ((symbol >= bossSymbol * 0.3) && (symbol < bossSymbol * 0.5)) {
          symbolFD = 0.6;
        } else if ((symbol >= bossSymbol * 0.1) && (symbol < bossSymbol * 0.3)) {
          symbolFD = 0.3;
        } else if ((symbol >= bossSymbol * 0) && (symbol < bossSymbol * 0.1)) {
          symbolFD = 0.1;
        }
      } else if (symbolType == 'Sacred') {
        symbol = sacred;
        if (symbol < bossSymbol) {
          symbolFD = Math.max(1.0 - 0.01 * (bossSymbol - symbol), 0.05);
        } else {
          symbolFD = Math.min(1.0 + 0.01 * Math.floor((symbol - bossSymbol)/2), 1.25);
        }
        maxSymbolFD = 1.25;
      }
    } else {
      symbolFD = maxSymbolFD;
    }
    totalFD = Math.round(levelFD/maxLevelFD * 100 * symbolFD/maxSymbolFD * 100) / 100;
    return totalFD.toFixed(2) + '%';
  }

  return (
    <section>
      <div className="flex flex-wrap gap-5 mb-5">
        <button className="font-bold shadow w-100 min-w-100 h-10 bg-white rounded-xl flex justify-center items-center relative cursor-pointer" onClick={() => setMode(mode == 'info' ? 'crystal' : 'info')}>
          <div className={`rounded-xl w-1/2 h-8 bg-[var(--color-maplestory-orange-selected)] absolute transition-all duration-200 ease-in-out ${mode == 'info' ? 'left-1' : 'left-[calc(50%-var(--spacing))]'}`} ref={slider}></div>
          <div className={`flex-1 z-2 transition duration-200 ${mode == 'info' ? 'text-white' : null}`}>Boss Information</div>
          <div className={`flex-1 z-2 transition duration-200 ${mode == 'crystal' ? 'text-white' : null}`}>Crystal Calculator</div>
        </button>
        <div className="shadow rounded-xl h-10 bg-white font-bold flex items-center py-2 px-4">
          <label>Party Size:
            <input type="number" className="maple-input w-13 font-normal" minLength={0} maxLength={6} value={partySize} onChange={(e) => handleNumberChange(e, 'party')}></input>
          </label>
        </div>
        <div className="shadow rounded-xl h-10 bg-white font-bold flex items-center gap-6 py-2 px-4">
          <label>Level:
            <input type="number" className="maple-input w-15 font-normal" minLength={0} maxLength={300} value={level} onChange={(e) => handleNumberChange(e, 'level')}></input>
          </label>
          <label>Arcane:
            <input type="number" className="maple-input w-17 font-normal" minLength={0} maxLength={1760} step="5" value={arcane} onChange={(e) => handleNumberChange(e, 'arcane')}></input>
          </label>
          <label>Sacred:
            <input type="number" className="maple-input w-16 font-normal" minLength={0} maxLength={880} step="10" value={sacred} onChange={(e) => handleNumberChange(e, 'sacred')}></input>
          </label>
        </div>
      </div>

      <table className="arcane-table">
        <thead>
          <tr>
            <th className="min-w-36 sticky-column-left">Boss</th>
            <th>Difficulty</th>
            <th>Level</th>
            <th className="relative group i-am-parent min-w-24 text-right">
              Mesos
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="absolute rounded-md text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  Mesos obtained are split by number of party members
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent w-15 text-center">
              1.0x
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="text-left absolute text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  FD% Arcane minimum threshhold
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent w-15 text-center">
              1.1x
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="text-left absolute text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  FD% Arcane minimum threshhold
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent w-15 text-center">
              1.3x
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="text-left absolute text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  FD% Arcane minimum threshhold
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent w-15 text-center">
              1.5x
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="text-left absolute text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  FD% Arcane minimum threshhold
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent text-right min-w-20">
              FD%
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="absolute text-left rounded-md text-wrap w-50 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  Relative FD% proportional to the maximum possible from level and Arcane combined. 100% would be the maximum.
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent">
              Points
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="absolute rounded-md text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  Traces of Darkness obtained for Genesis weapon. Split by number of party members
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="text-right min-w-18">HP</th>
            <th className="relative group i-am-parent text-right min-w-18">
              5%
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="absolute rounded-md text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  Minimum BA required to do 5% of the total damage and obtain loot
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="min-w-180">Notes</th>
          </tr>            
        </thead>
        {[...arcaneBosses.entries()].map(([boss, difficulties]) => (
          <tbody key={boss}>
            {difficulties.map((item, index) => (
              (item.SymbolType != 'Sacred') ? (
                <tr key={index} className="h-8">
                  {index == 0 ? (
                    <td className="font-bold boss-label darken" rowSpan={difficulties.length}><div className="flex items-center"><img src={'../images/Maplestory/Bosses/' + boss + '.png'} className='w-7 h-7 mr-2'></img>{boss}</div></td>
                  ) : null }
                  <td className="">{item.Difficulty}</td>
                  <td className="text-center">{item.Level}</td>
                  <td className="text-right darken">{simplifyNumber(item.Crystal && item.MaxParty ? item.Crystal / Math.min(partySize ? partySize : 1, item.MaxParty) : null)}</td>
                  <td className="text-center">{item.Symbol ? item.Symbol : null}</td>
                  <td className="text-center">{item.Symbol ? roundUp5(item.Symbol*1.1) : null}</td>
                  <td className="text-center">{item.Symbol ? roundUp5(item.Symbol*1.3) : null}</td>
                  <td className="text-center">{(item.Symbol && item.Symbol*1.5 < 1760) ? roundUp5(item.Symbol*1.5) : null}</td>
                  <td className="text-right darken">{calculateTotalFD(item.Level, item.Symbol, item.SymbolType)}</td>
                  <td className="text-center">{item.Traces && item.MaxParty ? Math.round(item.Traces / Math.min(partySize ? partySize : 1, item.MaxParty) * 10) / 10 : null}</td>
                  <td className="text-right darken">{simplifyNumber(getTotal(item.HP))}</td>
                  <td className="text-right darken">{(item.Difficulty != 'Genesis' && item.Difficulty != 'Champion') ? simplifyNumber(getTotal(item.HP) * 0.05) : null}</td>
                  <td className="">{item.Notes ? item.Notes : null}</td>
                </tr>
              ) : null
            ))}
          </tbody>
        ))}
      </table>

      <table className="grandis-table ">
        <thead>
          <tr>
            <th className="min-w-36">Boss</th>
            <th>Difficulty</th>
            <th>Level</th>
            <th className="relative group i-am-parent min-w-24 text-right">
              Mesos
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="absolute rounded-md text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  Mesos obtained are split by number of party members
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent w-15 text-center">
              1.0x
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="text-left absolute text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  FD% Sacred minimum threshhold
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent w-15 text-center">
              1.25x
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="text-left absolute text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  FD% Sacred minimum threshhold
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="w-15 text-center">
            </th>
            <th className="w-15 text-center">
            </th>
            <th className="relative group i-am-parent text-right min-w-20">
              FD%
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="absolute text-left rounded-md text-wrap w-50 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  Relative FD% proportional to the maximum possible from level and Sacred combined. 100% would be the maximum.
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="relative group i-am-parent">
              Points
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="absolute rounded-md text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  Adversary's Determination obtained for Destiny weapon. Split by number of party members
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="text-right min-w-18">HP</th>
            <th className="relative group i-am-parent text-right min-w-18">
              5%
              <div className="invisible i-am-child group-hover:visible pointer-events-none">
                <p className="absolute rounded-md text-wrap w-40 top-11 text-sm font-thin px-2 py-1 bg-[var(--color-maplestory-dark-gray)]">
                  Minimum BA required to do 5% of the total damage and obtain loot
                </p>
                <div className="absolute up-triangle left-4 top-9"></div>
              </div>
            </th>
            <th className="min-w-180">Notes</th>
          </tr>            
        </thead>
        {[...grandisBosses.entries()].map(([boss, difficulties]) => (
          <tbody key={boss}>
            {difficulties.map((item, index) => (
              (item.SymbolType == 'Sacred') ? (
                <tr key={index} className="h-8">
                  {index == 0 ? (
                    <td className="font-bold boss-label darken sticky-column-left" rowSpan={difficulties.length}><div className="flex items-center"><img src={'../images/Maplestory/Bosses/' + boss + '.png'} className='w-7 h-7 mr-2'></img>{boss}</div></td>
                  ) : null }
                  <td className="">{item.Difficulty}</td>
                  <td className="text-center">{item.Level}</td>
                  <td className="text-right darken">{simplifyNumber(item.Crystal && item.MaxParty ? item.Crystal / Math.min(partySize ? partySize : 1, item.MaxParty) : null)}</td>
                  <td className="text-center">{item.Symbol ? item.Symbol : null}</td>
                  <td className="text-center">{item.Symbol ? item.Symbol + 50 : null}</td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-right darken">
                    {calculateTotalFD(item.Level, item.Symbol, item.SymbolType)}
                    </td>
                  <td className="text-center">{item.Traces && item.MaxParty ? Math.round(item.Traces / Math.min(partySize ? partySize : 1, item.MaxParty) * 10) / 10 : null}</td>
                  <td className="text-right darken">{simplifyNumber(getTotal(item.HP))}</td>
                  <td className="text-right darken">{(item.Difficulty != 'Destiny' && item.Difficulty != 'Champion') ? simplifyNumber(getTotal(item.HP) * 0.05) : null}</td>
                  <td className="">{item.Notes ? item.Notes : null}</td>
                </tr>
              ) : null
            ))}
          </tbody>
        ))}
      </table>
    </section>
  );
}