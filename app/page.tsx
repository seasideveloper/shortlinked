import styles from "./page.module.css";
import Hero from './components/Sections/Hero'
import Links from './components/Sections/Links/Links'
import Tools from "./components/Sections/Tools/Tools";

export default function Home() {
  return (
      <main className={styles.main}>
        <Hero />
        <Links />
        <Tools />
      </main>
  );
}
