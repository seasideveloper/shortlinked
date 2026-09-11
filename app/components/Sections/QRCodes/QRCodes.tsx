import Link from "next/link";
import styles from "./qr-codes.module.css";

const benefits = ["Dynamic QR codes for every link", "Add your logo and brand colors", "Download print-ready formats"];

export default function QRCodes() {
  return (
    <section className={styles.section} id="qr-codes">
      <div className={styles.visual} aria-label="QR code preview placeholder">
        <div className={styles.qrPlaceholder} aria-hidden="true"><div className={styles.qrPattern} /></div>
        <span className={styles.placeholderLabel}>QR code preview</span>
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>QR codes</p>
        <h2>QR codes that work as hard as you do.</h2>
        <p className={styles.description}>Create beautiful, branded QR codes for every short link. Share your campaigns anywhere, online or in the real world.</p>
        <ul className={styles.benefits}>
          {benefits.map((benefit) => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}
        </ul>
        <Link href="#pricing" className={styles.link}>Try QR codes <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
