export default function Contact() {
  return (
    <section>
      <div className="panel shadow max-w-150">
        <p>If you have any questions or suggestions, you can always contact me through:</p>
        <div className="flex flex-wrap gap-2 pt-2 pb-2">
          <a href="https://discordapp.com/users/121441030770786304" target="_blank"><img src="../images/Discord.png" alt="Discord Icon" className="w-8 h-8" /></a>
          <a href="https://www.reddit.com/user/Zydico/" target="_blank"><img src="../images/Reddit.png" alt="Reddit Icon" className="w-8 h-8" /></a>
          <a href="mailto:matthewhwang95@gmail.com" target="_blank"><img src="../images/EmailLight.png" alt="Email Icon" className="w-8 h-8" /></a>
        </div>
      </div>
    </section>
  );
}