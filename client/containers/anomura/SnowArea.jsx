import s from "/sass/anomura/anomura.module.css";
export default function SnowArea() {
  return (
    <div className={s.snow_zone}>

      <div className={s.snow_earn}>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />

          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>

        <div className={s.snow_text}>
          <p>Earn $Starfish as you play Anomura.</p>
          <p>Stake, loot, and grow your Anomura team.</p>
        </div>
      </div>
      <div className={s.snow_protect}>
        <h1>Play To Protect</h1>
        <p>Anomura are the protectors of the environment</p>
        <p>Contribute with your earnings to save wild life and earn special rewards.</p>
      </div>

      <div className={s.snow_icepit}></div>
    </div>
  );
}
