// import React from 'react'
// import styles from './analytics.module.css'
// import Link from 'next/link'
// import Image from 'next/image'
// import businessmen from '../../../../public/business_workers.svg'

// export default function Analytics() {
//   return (
//     <section className={styles.hero_container}>
//       <div className={styles.hero_content}>
//         <div className={styles.hero_image_wrap}>
//           <Image
//             src={businessmen}
//             alt="businessmen"
//             width={700}
//             height={700}
//             className={styles.hero_image}
//             priority
//           />
//         </div>
//         <div className={styles.hero_text}>
//           <p className={styles.trust_txt}>Analytics</p>
//           <h3 className={styles.hero_heading}>
//             Know exactly where every click comes from.
//           </h3>
//           <p className={styles.hero_subtext}>
//             See the full picture behind every short link. ShortLinked turns click activity into clear, actionable insights so you can understand your audience and grow with confidence.
//           </p>

//           <ul>
//             <li>Live click data with no delay</li>
//             <li>Geographic and device insights</li>
//             <li>Export reports for your team</li>
//           </ul>

//           <Link href="/about" className={styles.learn_cta}>
//                 Explore Analytics →
//               </Link>
//         </div>
//       </div>
//     </section>
//   )
// }


import Image from "next/image";
import Link from "next/link";
import styles from "./analytics.module.css";
import businessWorkers from "../../../../public/business_workers.svg";

const benefits = ["Live click data with no delay", "Geographic and device insights", "Export reports for your team"];

export default function Analytics() {
  return (
    <section className={styles.section} id="analytics">
      <div className={styles.visual}>
        <Image src={businessWorkers} alt="Team members reviewing ShortLinked analytics" className={styles.image} />
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Analytics</p>
        <h2>Know exactly where every click comes from.</h2>
        <p className={styles.description}>See the full picture behind every short link. ShortLinked turns click activity into clear, actionable insights so you can understand your audience and grow with confidence.</p>
        <ul className={styles.benefits}>
          {benefits.map((benefit) => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}
        </ul>
        <Link href="#pricing" className={styles.link}>Explore analytics <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
