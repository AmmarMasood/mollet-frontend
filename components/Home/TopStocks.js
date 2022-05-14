import React from "react";
import styles from "@/styles/Home/TopStocks.module.css";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";

const images = [
  "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Fauji_Fertilizer_Company_logo.svg/1200px-Fauji_Fertilizer_Company_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/3/38/PakistanStateOilLogo.svg/1200px-PakistanStateOilLogo.svg.png",
  "https://mettisglobal.news/wp-content/uploads/2018/04/IMG576nestle-696x438.jpg",
  "https://mettisglobal.news/wp-content/uploads/2017/11/IMG548hbl.jpg",
  "https://newsupdatetimes.com/wp-content/uploads/2020/01/Efert-lgoge.jpg",
  "https://mettisglobal.news/wp-content/uploads/2022/04/IMG531ubl.png",
  "https://mettisglobal.news/wp-content/uploads/2022/04/IMG1372LUCK-1.jpg",
  "https://mettisglobal.news/wp-content/uploads/2018/10/IMG1346ARPL.jpg",
  "https://mettisglobal.news/wp-content/uploads/2017/11/IMG546international-industries-limited.jpg",
  "https://mettisglobal.news/wp-content/uploads/2017/11/IMG559bata-1.jpg",
  "https://mettisglobal.news/wp-content/uploads/2022/04/IMG592MCBBankLimited.jpg",
  "https://mettisglobal.news/wp-content/uploads/2017/11/IMG590MILLAT-TRACTORS.jpg",
  "https://mettisglobal.news/wp-content/uploads/2022/02/IMG647EFU-General.jpg",
  "https://mettisglobal.news/wp-content/uploads/2022/01/IMG6828zil.jpg",
  "https://mettisglobal.news/wp-content/uploads/2017/11/IMG371Dawood-Hercules.jpg",
  "https://mettisglobal.news/wp-content/uploads/2017/11/IMG525ColgatePalmolive.png",
  "https://mettisglobal.news/wp-content/uploads/2022/04/IMG654Mari-Petroleum-2.jpg",
  "https://mettisglobal.news/wp-content/uploads/2022/01/IMG529attock-petroleum.png",
];
function TopStocks() {
  return (
    <div className={styles.container}>
      <h2>
        Get your portfolio built with all the top stocks available on PSX!
      </h2>
      <div className={styles.insideContainer}>
        <Marquee
          velocity={16}
          scatterRandomly
          minScale={0.2}
          resetAfterTries={200}
          direction="ltr"
        >
          {images.map((link, i) => (
            // <Motion
            //   key={`marquee-example-company-${i}`}
            //   //   initDeg={randomIntFromInterval(0, 360)}
            //   direction={"ltr"}
            //   velocity={10}
            // >
            <div className={styles.company}>
              <div className={styles.circle}>
                <img src={link} alt="" className={styles.logo} />
              </div>
            </div>
            // </Motion>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default TopStocks;
