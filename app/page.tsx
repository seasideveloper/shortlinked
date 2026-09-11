import styles from "./page.module.css";
import Hero from './components/Sections/Hero'
import Links from './components/Sections/Links/Links'
import Tools from "./components/Sections/Tools/Tools";
import Analytics from "./components/Sections/Analytics/Analytics";
import Pricing from "./components/Sections/Pricing/Pricing"
import Domains from "./components/Sections/Domains/Domains"
import QRCodes from "./components/Sections/QRCodes/QRCodes";

export default function Home() {
  return (
      <main className={styles.main}>
        <Hero />
        <Links />
        <Tools />
        <Analytics />
        <Domains />
        <QRCodes />
        <Pricing />
      </main>
  );
}
