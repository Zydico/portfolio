type prop = {
  url: string;
  text: string;
};

export default function Character({url, text}: prop) {
  return (
    <div className="bg-white w-25 h-32 rounded-md">
      <img src={`../images/Maplestory/Characters/${url}.png`} alt={`${url} character image`} className="w-25 h-25 p-1"></img>
      <div className="w-25 h-5 text-center font-bold">{text}</div>
    </div>
  );
}