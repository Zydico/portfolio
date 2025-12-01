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
          <div className="bg-white w-25 h-32 rounded-md">
            <img src="../images/Maplestory/Characters/Yoimiya.png" alt="Yoimiya character image" className="w-25 h-25 p-1"></img>
            <div className="w-25 h-5 text-center font-bold">Yoìmîya</div>
          </div>
          <div className="bg-white w-25 h-32 rounded-md">
            <img src="../images/Maplestory/Characters/FrostNova.png" alt="Frostnova character image" className="w-25 h-25 p-1"></img>
            <div className="w-25 h-5 text-center font-bold">FrostNovâ</div>
          </div>
          <div className="bg-white w-25 h-32 rounded-md">
            <img src="../images/Maplestory/Characters/Yotsuyu.png" alt="Yotsuyu character image" className="w-25 h-25 p-1"></img>
            <div className="w-25 h-5 text-center font-bold">Yotsuyù</div>
          </div>
          <div className="bg-white w-25 h-32 rounded-md">
            <img src="../images/Maplestory/Characters/Hestia.png" alt="Hestia character image" className="w-25 h-25 p-1"></img>
            <div className="w-25 h-5 text-center font-bold">Hêstiá</div>
          </div>
          <div className="bg-white w-25 h-32 rounded-md">
            <img src="../images/Maplestory/Characters/Yaoyao.png" alt="Yaoyao character image" className="w-25 h-25 p-1"></img>
            <div className="w-25 h-5 text-center font-bold">Yaoÿao</div>
          </div>
          <div className="bg-white w-25 h-32 rounded-md">
            <img src="../images/Maplestory/Characters/Astra.png" alt="Astra character image" className="w-25 h-25 p-1"></img>
            <div className="w-25 h-5 text-center font-bold">Âstra</div>
          </div>
        </div>
      </div>
    </section>
  );
}