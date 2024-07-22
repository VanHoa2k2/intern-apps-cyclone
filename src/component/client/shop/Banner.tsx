import styles from "@/styles/client.module.scss";

const Banner = ({ title }: { title: string }) => {
  return (
    <section className={styles["banner__section"]}>
      <h1>{title}</h1>
    </section>
  );
};

export default Banner;
