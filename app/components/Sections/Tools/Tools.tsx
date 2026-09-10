import React from 'react'
import styles from './tools.module.css'
import Link from 'next/link'
import lightning from '../../../../public/lightning.svg'
import globe from '../../../../public/globe.svg'
import analytics from '../../../../public/analytics.svg'
import Image from 'next/image'

export default function Tools() {
  return (
    <section className={styles.links_section}>
        <p className={styles.try_now}>Everything you need</p>
        <h2 className={styles.heading}>Powerful tools for every link</h2>
        <p className={styles.subheading}>From solo creators to enterprise teams - ShortLinked scales with your growth.</p>

        <div className={styles.tools_container}> 
            <div className={styles.tool_box}>
                <div className={styles.tool_box_container}>
                    <Image src={lightning} width={25} height={25} alt='lightning icon' className={styles.icon}></Image>
                    <h3>
                        Instant Link Shortening
                    </h3>
                    <p>Shorten any URL in seconds. Paste, click, done.</p>
                    <Link href="/about" className={styles.learn_more}>Learn More →</Link>
                </div>
            </div>

            <div className={styles.tool_box}>
                <div className={styles.tool_box_container}>
                    <Image src={globe} width={25} height={25} alt='globe icon' className={styles.icon}></Image>
                    <h3>
                        Custom Branded Domains 
                    </h3>
                    <p>Use your own domain. ShortLinked.com becomes links.yourbrand.com.</p>
                    <Link href="/about" className={styles.learn_more}>Learn More →</Link>
                </div>
            </div>

            <div className={styles.tool_box}>
                <div className={styles.tool_box_container}>
                    <Image src={analytics} width={25} height={25} alt='analytics icon' className={styles.icon}></Image>
                    <h3>
                        Real-Time Analytics
                    </h3>
                    <p>Track clicks, locations, devices, and referrers - live.</p>
                    <Link href="/about" className={styles.learn_more}>Learn More →</Link>
                </div>
            </div>

        </div>

    </section>
  )
}
