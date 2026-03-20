import Character from './character'

export default function Contact() {
  return (
    <section>
      <div className="panel shadow max-w-200">
        <p>If you have any questions or suggestions, you can always contact me through:</p>
        <div className="flex flex-wrap gap-2 pt-2 pb-4">
          <a href="https://discordapp.com/users/121441030770786304" target="_blank"><img src="../images/Discord.png" alt="Discord Icon" className="w-8 h-8" /></a>
          <a href="https://www.reddit.com/user/Zydico/" target="_blank"><img src="../images/Reddit.png" alt="Reddit Icon" className="w-8 h-8" /></a>
          <a href="mailto:matthewhwang95@gmail.com" target="_blank"><img src="../images/EmailLight.png" alt="Email Icon" className="w-8 h-8" /></a>
        </div>
        <p>Or you can try to contact me in-game on the GMS Hyperion server on one of my main characters if I'm online:</p>
        <div className="flex flex-wrap w-fit gap-2 my-2 p-2 rounded-md bg-[var(--color-maplestory-light-gray)]">
          <Character url="Yoimiya" text="Yoìmîya" />
          <Character url="FrostNova" text="FrostNovâ" />
          <Character url="Yotsuyu" text="Yotsuyù" />
          <Character url="Hestia" text="Hêstiá" />
          <Character url="Yaoyao" text="Yaoÿao" />
        </div>
      </div>
    </section>
  );
}