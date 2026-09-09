import styles from "./page.module.css";
import Hero from './components/Sections/Hero'
import Links from './components/Sections/Links/Links'

export default function Home() {
  return (
      <main className={styles.main}>
        <Hero />
        <Links />
      </main>
  );
}
