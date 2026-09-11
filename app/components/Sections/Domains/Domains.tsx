import Image from "next/image";
import Link from "next/link";
import styles from "./domains.module.css";
import mobileMan from "../../../../public/mobile_man.svg";

const benefits = ["Use your own branded domain", "Build trust with every click", "No technical setup required"];

export default function Domains() {
  return (
    <section className={styles.section} id="domains">
      <div className={styles.content}>
        <p className={styles.eyebrow}>Branded domains</p>
        <h2>Make every link unmistakably yours.</h2>
        <p className={styles.description}>Turn generic URLs into branded experiences. Connect your domain in minutes and give every campaign a memorable, trusted destination.</p>
        <ul className={styles.benefits}>
          {benefits.map((benefit) => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}
        </ul>
        <Link href="#pricing" className={styles.link}>Explore custom domains <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.visual}>
        <Image src={mobileMan} alt="Person managing branded links on a mobile device" className={styles.image} />
      </div>
    </section>
  );
}
