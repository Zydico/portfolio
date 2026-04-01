'use client';

import { Dispatch, SetStateAction, useState } from "react";
import './page.css';
import NumberInput from "../numberInput";
import Spacer from "../spacer";

export default function MysticFrontier() {
  const [diceInputs, setDiceInputs] = useState<string[]>(['1', '1', '1']);
  const [itemTotalInputs, setItemTotalInputs] = useState<string[]>(['0', '0', '0', '0', '0']);
  const [itemMultiplierInputs, setItemMultiplierInputs] = useState<string[]>(['0.0', '0.0', '0.0', '0.0', '0.0']);
  const [familiarTotalInputs, setFamiliarTotalInputs] = useState<string[]>(['0', '0', '0']);
  const [familiarMultiplierInputs, setFamiliarMultiplierInputs] = useState<string[]>(['0.0', '0.0', '0.0']);
  const handleInputChange = (index: number, value: string, input: string[], setInput: Dispatch<SetStateAction<string[]>>) => {
    const updated = [...input];
    updated[index] = value;
    setInput(updated);
  }

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select();
  }

  const reset = () => {
    setDiceInputs(['1', '1', '1']);
    setItemTotalInputs(['0', '0', '0', '0', '0']);
    setItemMultiplierInputs(['0.0', '0.0', '0.0', '0.0', '0.0'])
    setFamiliarTotalInputs(['0', '0', '0']);
    setFamiliarMultiplierInputs(['0.0', '0.0', '0.0'])
  }

  return (
    <section className="inline-flex flex-col gap-5">
      <div className="temp-background">
      </div>
      <button className="font-bold shadow rounded-lg px-4 py-1 w-20 bg-[var(--color-maplestory-orange-selected)] hover:bg-[var(--color-maplestory-orange-hover)] text-white flex justify-center items-center relative cursor-pointer" onClick={() => reset()}>
        Reset
      </button>
      <div className="z-1 panel inline-flex flex-wrap flex-col gap-2 temp-dark">
        {diceInputs.map((val, i) => (
          <NumberInput key={i} label={`Dice ${i+1}:`} value={val} onChange={(v) => handleInputChange(i, v, diceInputs, setDiceInputs)} min={1} max={6} size="w-8" />
        ))}
        <div className="flex flex-wrap flex-col gap-2 mt-2">
          {itemTotalInputs.map((total, i) => {
            const multiplier = itemMultiplierInputs[i];
            return (
              <div key={i}>
                <label className="font-bold mr-13">Item {i+1}:</label>
                <NumberInput label="Total" value={total} onChange={(v) => handleInputChange(i, v, itemTotalInputs, setItemTotalInputs)} min={-2} max={15} size="w-10" />
                <Spacer size="w-6"></Spacer>
                <NumberInput label="Multiplier" value={multiplier} onChange={(v) => handleInputChange(i, v, itemMultiplierInputs, setItemMultiplierInputs)} min={0.0} max={2.4} size="w-12" />
              </div>
            );
          })}
        </div> 
        <div className="font-bold text-2xl mt-3 mb-2">Result:<Spacer size="w-4"></Spacer>
        {
          Math.floor(
            (
              diceInputs.map(Number).reduce((acc, curr) => acc+curr, 0) + 
              itemTotalInputs.map(Number).reduce((acc, curr) => acc+curr, 0) + 
              familiarTotalInputs.map(Number).reduce((acc, curr) => acc+curr, 0)
            ) *
            Math.max(1, 
              itemMultiplierInputs.map(Number).reduce((acc, curr) => acc+curr, 0) + 
              familiarMultiplierInputs.map(Number).reduce((acc, curr) => acc+curr, 0)
            )
          )
        }
        </div>
      </div> 
      <div className="z-1 panel inline-flex flex-wrap flex-col temp-dark">
        <div className="flex flex-wrap flex-col gap-2">
          {familiarTotalInputs.map((total, i) => {
            const multiplier = familiarMultiplierInputs[i];
            return (
              <div key={i}>
                <label className="font-bold mr-13">Familiar {i+1}:</label>
                <NumberInput label="Total" value={total} onChange={(v) => handleInputChange(i, v, familiarTotalInputs, setFamiliarTotalInputs)} min={-2} max={18} size="w-10" />
                <Spacer size="w-6"></Spacer>
                <NumberInput label="Multiplier" value={multiplier} onChange={(v) => handleInputChange(i, v, familiarMultiplierInputs, setFamiliarMultiplierInputs)} min={0.0} max={2.8} size="w-12" />
              </div>
            );
          })}
        </div> 
      </div>
    </section>
  );
}