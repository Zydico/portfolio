type prop = {
  size: string;
};

export default function Spacer({size}: prop) {
  return (
    <div className={`${size} h-1 inline-block`}></div>
  );
}