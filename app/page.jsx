import classes from "./page.module.css";
import { Calendar } from "./components/Calendar";

export default function Home() {
  return (
    <main className={classes.main}>
      <Calendar />
    </main>
  );
}
