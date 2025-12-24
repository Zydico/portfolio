'use client';

import { useState } from "react";
import { numberInputValidation } from "../pipes";

export default function MysticFrontier() {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [dice3, setDice3] = useState(1);
  const [item1Total, setItem1Total] = useState(0);
  const [item2Total, setItem2Total] = useState(0);
  const [item3Total, setItem3Total] = useState(0);
  const [item4Total, setItem4Total] = useState(0);
  const [item5Total, setItem5Total] = useState(0);
  const [fam1Total, setFam1Total] = useState(0);
  const [fam2Total, setFam2Total] = useState(0);
  const [fam3Total, setFam3Total] = useState(0);
  const [item1FinalMultiplier, setItem1FinalMultiplier] = useState(0.0);
  const [item2FinalMultiplier, setItem2FinalMultiplier] = useState(0.0);
  const [item3FinalMultiplier, setItem3FinalMultiplier] = useState(0.0);
  const [item4FinalMultiplier, setItem4FinalMultiplier] = useState(0.0);
  const [item5FinalMultiplier, setItem5FinalMultiplier] = useState(0.0);
  const [fam1FinalMultiplier, setFam1FinalMultiplier] = useState(0.0);
  const [fam2FinalMultiplier, setFam2FinalMultiplier] = useState(0.0);
  const [fam3FinalMultiplier, setFam3FinalMultiplier] = useState(0.0);

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: string) => {
    if (e.target.type == 'number') {
        if (property == 'item1Total' || property == 'item2Total' || property == 'item3Total' || property == 'item4Total' || property == 'item5Total' ||
            property == 'fam1Total' || property == 'fam2Total' || property == 'fam3Total'
        ) {
            numberInputValidation(e as React.ChangeEvent<HTMLInputElement>, -1);
        } else if (property == 'item1FinalMultiplier' || property == 'item2FinalMultiplier' || property == 'item3FinalMultiplier' || property == 'item4FinalMultiplier' || property == 'item5FinalMultiplier' ||
                   property == 'fam1FinalMultiplier' || property == 'fam2FinalMultiplier' || property == 'fam3FinalMultiplier'
        ) {
            numberInputValidation(e as React.ChangeEvent<HTMLInputElement>, 0.0, 2.4);
        } else {
            numberInputValidation(e as React.ChangeEvent<HTMLInputElement>, 1);
        }
    }
    switch (property) {
        case 'dice1':
            setDice1(parseInt(e.target.value));
            break;
        case 'dice2':
            setDice2(parseInt(e.target.value));
            break;
        case 'dice3':
            setDice3(parseInt(e.target.value));
            break;
        case 'item1Total':
            setItem1Total(parseInt(e.target.value));
            break;
        case 'item2Total':
            setItem2Total(parseInt(e.target.value));
            break;
        case 'item3Total':
            setItem3Total(parseInt(e.target.value));
            break;
        case 'item4Total':
            setItem4Total(parseInt(e.target.value));
            break;
        case 'item5Total':
            setItem5Total(parseInt(e.target.value));
            break;
        case 'item1FinalMultiplier':
            setItem1FinalMultiplier(parseFloat(e.target.value));
            break;
        case 'item2FinalMultiplier':
            setItem2FinalMultiplier(parseFloat(e.target.value));
            break;
        case 'item3FinalMultiplier':
            setItem3FinalMultiplier(parseFloat(e.target.value));
            break;
        case 'item4FinalMultiplier':
            setItem4FinalMultiplier(parseFloat(e.target.value));
            break;
        case 'item5FinalMultiplier':
            setItem5FinalMultiplier(parseFloat(e.target.value));
            break;
        case 'fam1Total':
            setFam1Total(parseInt(e.target.value));
            break;
        case 'fam1FinalMultiplier':
            setFam1FinalMultiplier(parseFloat(e.target.value));
            break;
        case 'fam2Total':
            setFam2Total(parseInt(e.target.value));
            break;
        case 'fam2FinalMultiplier':
            setFam2FinalMultiplier(parseFloat(e.target.value));
            break;
        case 'fam3Total':
            setFam3Total(parseInt(e.target.value));
            break;
        case 'fam3FinalMultiplier':
            setFam3FinalMultiplier(parseFloat(e.target.value));
            break;
    }
  }

  const reset = () => {
    setDice1(1);
    setDice2(1);
    setDice3(1);
    setItem1Total(0);
    setItem2Total(0);
    setItem3Total(0);
    setItem4Total(0);
    setItem5Total(0);
    setFam1Total(0);
    setFam2Total(0);
    setFam3Total(0);
    setItem1FinalMultiplier(0.0);
    setItem2FinalMultiplier(0.0);
    setItem3FinalMultiplier(0.0);
    setItem4FinalMultiplier(0.0);
    setItem5FinalMultiplier(0.0);
    setFam1FinalMultiplier(0.0);
    setFam2FinalMultiplier(0.0);
    setFam3FinalMultiplier(0.0);
  }

  return (
    <section className="inline-flex flex-col gap-5">
    <button className="font-bold shadow rounded-lg px-4 py-1 w-20 bg-[var(--color-maplestory-orange-selected)] hover:bg-[var(--color-maplestory-orange-hover)] text-white flex justify-center items-center relative cursor-pointer" onClick={() => reset()}>
        Reset
    </button>
      <div className="panel inline-flex flex-wrap flex-col gap-3">
        <label className="font-bold">Dice 1:
        <input type="number" className="maple-input font-normal w-16" minLength={1} maxLength={6} value={dice1} onChange={(e) => handlePropertyChange(e, 'dice1')}></input>
        </label>   
        <label className="font-bold">Dice 2:
        <input type="number" className="maple-input font-normal w-16" minLength={1} maxLength={6} value={dice2} onChange={(e) => handlePropertyChange(e, 'dice2')}></input>
        </label>  
        <label className="font-bold">Dice 3:
        <input type="number" className="maple-input font-normal w-16" minLength={1} maxLength={6} value={dice3} onChange={(e) => handlePropertyChange(e, 'dice3')}></input>
        </label>  
        <div className="flex flex-wrap gap-5">
          <label className="font-bold mr-8">Item 1:</label>
          <label className="font-bold">Total
            <input type="number" className="maple-input font-normal w-16" minLength={-1} maxLength={15} value={item1Total} step="1" onChange={(e) => handlePropertyChange(e, 'item1Total')}></input>
          </label> 
          <label className="font-bold">Multiplier
            <input type="number" className="maple-input font-normal w-16" minLength={0.0} maxLength={2.4} value={item1FinalMultiplier} step="0.1" onChange={(e) => handlePropertyChange(e, 'item1FinalMultiplier')}></input>
          </label> 
        </div> 
        <div className="flex flex-wrap gap-5">
          <label className="font-bold mr-8">Item 2:</label>
          <label className="font-bold">Total
            <input type="number" className="maple-input font-normal w-16" minLength={-1} maxLength={15} value={item2Total} step="1" onChange={(e) => handlePropertyChange(e, 'item2Total')}></input>
          </label> 
          <label className="font-bold">Multiplier
            <input type="number" className="maple-input font-normal w-16" minLength={0.0} maxLength={2.4} value={item2FinalMultiplier} step="0.1" onChange={(e) => handlePropertyChange(e, 'item2FinalMultiplier')}></input>
          </label> 
        </div> 
        <div className="flex flex-wrap gap-5">
          <label className="font-bold mr-8">Item 3:</label>
          <label className="font-bold">Total
            <input type="number" className="maple-input font-normal w-16" minLength={-1} maxLength={15} value={item3Total} step="1" onChange={(e) => handlePropertyChange(e, 'item3Total')}></input>
          </label> 
          <label className="font-bold">Multiplier
            <input type="number" className="maple-input font-normal w-16" minLength={0.0} maxLength={2.4} value={item3FinalMultiplier} step="0.1" onChange={(e) => handlePropertyChange(e, 'item3FinalMultiplier')}></input>
          </label> 
        </div> 
        <div className="flex flex-wrap gap-5">
          <label className="font-bold mr-8">Item 4:</label>
          <label className="font-bold">Total
            <input type="number" className="maple-input font-normal w-16" minLength={-1} maxLength={15} value={item4Total} step="1" onChange={(e) => handlePropertyChange(e, 'item4Total')}></input>
          </label> 
          <label className="font-bold">Multiplier
            <input type="number" className="maple-input font-normal w-16" minLength={0.0} maxLength={2.4} value={item4FinalMultiplier} step="0.1" onChange={(e) => handlePropertyChange(e, 'item4FinalMultiplier')}></input>
          </label> 
        </div> 
        <div className="flex flex-wrap gap-5">
          <label className="font-bold mr-8">Item 5:</label>
          <label className="font-bold">Total
            <input type="number" className="maple-input font-normal w-16" minLength={-1} maxLength={15} value={item5Total} step="1" onChange={(e) => handlePropertyChange(e, 'item5Total')}></input>
          </label> 
          <label className="font-bold">Multiplier
            <input type="number" className="maple-input font-normal w-16" minLength={0.0} maxLength={2.4} value={item5FinalMultiplier} step="0.1" onChange={(e) => handlePropertyChange(e, 'item5FinalMultiplier')}></input>
          </label> 
        </div> 
        <div className="font-bold text-xl mt-3 mb-2">Result: {
            Math.floor((dice1+dice2+dice3+item1Total+item2Total+item3Total+item4Total+item5Total+fam1Total+fam2Total+fam3Total)*
            (Math.max(1, item1FinalMultiplier+item2FinalMultiplier+item3FinalMultiplier+item4FinalMultiplier+item5FinalMultiplier+fam1FinalMultiplier+fam2FinalMultiplier+fam3FinalMultiplier)))  
        }</div>
      </div> 
      <div className="panel inline-flex flex-wrap flex-col gap-3">
        <div className="flex flex-wrap gap-5">
          <label className="font-bold mr-8">Familiar 1:</label>
          <label className="font-bold">Total
            <input type="number" className="maple-input font-normal w-16" minLength={-1} maxLength={18} value={fam1Total} step="1" onChange={(e) => handlePropertyChange(e, 'fam1Total')}></input>
          </label> 
          <label className="font-bold">Multiplier
            <input type="number" className="maple-input font-normal w-16" minLength={0.0} maxLength={2.8} value={fam1FinalMultiplier} step="0.1" onChange={(e) => handlePropertyChange(e, 'fam1FinalMultiplier')}></input>
          </label> 
        </div>
        <div className="flex flex-wrap gap-5">
          <label className="font-bold mr-8">Familiar 2:</label>
          <label className="font-bold">Total
            <input type="number" className="maple-input font-normal w-16" minLength={-1} maxLength={18} value={fam2Total} step="1" onChange={(e) => handlePropertyChange(e, 'fam2Total')}></input>
          </label> 
          <label className="font-bold">Multiplier
            <input type="number" className="maple-input font-normal w-16" minLength={0.0} maxLength={2.8} value={fam2FinalMultiplier} step="0.1" onChange={(e) => handlePropertyChange(e, 'fam2FinalMultiplier')}></input>
          </label> 
        </div>
        <div className="flex flex-wrap gap-5">
          <label className="font-bold mr-8">Familiar 3:</label>
          <label className="font-bold">Total
            <input type="number" className="maple-input font-normal w-16" minLength={-1} maxLength={18} value={fam3Total} step="1" onChange={(e) => handlePropertyChange(e, 'fam3Total')}></input>
          </label> 
          <label className="font-bold">Multiplier
            <input type="number" className="maple-input font-normal w-16" minLength={0.0} maxLength={2.8} value={fam3FinalMultiplier} step="0.1" onChange={(e) => handlePropertyChange(e, 'fam3FinalMultiplier')}></input>
          </label> 
        </div>
      </div>
    </section>
  );
}