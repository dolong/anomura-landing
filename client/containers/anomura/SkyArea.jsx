import s from "/sass/anomura/anomura.module.css";
/**
 * The snow and ice area of the Anomura page
 */
export default function SkyArea() {

  return (
    <div className={s.sky_zone}>
      <div className={s.sky_text}>
        <p>Collect & Build as Anomura. the predator of all creatures big & small.</p>
        <p>Collect-Earn-Donate</p>
      </div>
      <div className={s.sky_anomuras}>
        <img src="" alt="Wood_Anomura" />
        <img src="" alt="Metal_Anomura" />
        <img src="" alt="Ice_Anomura" />
        <img src="" alt="Star" />
      </div>

    </div>
  );
}
