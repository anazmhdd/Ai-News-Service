// import styles from "./styles.module.css"
import AdsCard from "../../components/AdsCard";
import BreakingNews from "../../components/BreakingNews";
import CategorySection from "../../components/CategorySection";
import NavBar from "../../components/NavBar";
import TopNews from "../../components/TopNews";
function Home() {
  return (
    <>
      <NavBar />
      <BreakingNews />
      <TopNews />
      <AdsCard />
      <CategorySection />
    </>
  );
}

export default Home;
