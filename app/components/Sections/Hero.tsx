import Link from 'next/link'
import Image from 'next/image'
import styles from './hero.module.css'
import hero_img from '@/public/man.svg'

export default function Hero() {

  return (
    <section className={styles.hero_container}>
      <div className={styles.hero_content}>
        <div className={styles.hero_text}>
          <p className={styles.trust_txt}> ⚡︎ Trusted by 10,000+ marketers worldwide</p>
          <h1 className={styles.hero_heading}>
            Short Links On Short Notice.
          </h1>
          <p className={styles.hero_subtext}>
            Boost your brand and improve performance with shorter links that last.
          </p>

          <div className={styles.cta_container}>
              <Link href="/about" className={styles.hero_cta}>
                Start For Free
              </Link>

              <Link href="/about" className={styles.learn_cta}>
                See How It Works →
              </Link>
          </div>

          <p className={styles.no_card_txt}>No credit card required • Free plan includes 100 links/mo</p>
        </div>
        <div className={styles.hero_image_wrap}>
          <Image
            src={hero_img}
            alt="deskworkers"
            width={750}
            height={750}
            className={styles.hero_image}
            priority
          />
        </div>
      </div>
    </section>
  )
}