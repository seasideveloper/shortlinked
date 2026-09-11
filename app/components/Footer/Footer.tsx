import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return <footer className={styles.footer} id="contact">
    <div className={styles.top}>
      <div><Link href="/" className={styles.logo}>ShortLinked</Link><p>Shorten. Brand. Track every click.</p></div>
      <div className={styles.columns}>
        <div><h3>Product</h3><Link href="#analytics">Analytics</Link><Link href="#pricing">Pricing</Link><Link href="#features">Features</Link></div>
        <div><h3>Company</h3><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="#">Blog</Link></div>
        <div><h3>Get started</h3><Link href="#pricing">Start for free</Link><Link href="#">Log in</Link></div>
      </div>
    </div>
    <div className={styles.bottom}><span>© {new Date().getFullYear()} ShortLinked. All rights reserved.</span><div><Link href="#">Privacy</Link><Link href="#">Terms</Link></div></div>
  </footer>;
}
