type prop = {
  label?: string;
  value?: string;
  inLabel?: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  size: string;
};

export default function NumberInput({label, value, inLabel, onChange, min, max, size}: prop) {
  return (
    <label className="font-bold">{label && <span>{label}</span>}
      <input className={`maple-input font-normal bg-white ${size} ${(Number.isNaN(Number(value)) || (value && (value.length) <= 0) || Number(value) < min || Number(value) > max) ? 'invalid-input' : ''}`} value={value} onFocus={(e) => e.target.select()} onChange={(e) => onChange(e.target.value)}></input>
      {inLabel &&
        <div className="input-inLabel">{inLabel}</div>
      }
    </label>   
  );
}