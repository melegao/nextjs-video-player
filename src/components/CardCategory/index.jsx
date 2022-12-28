import styles from "../../styles/CardCategory.module.css";

export default function CardCategory(props) {
  const { setCatFilteres, category } = props;

  const handleCategory = () => {
    setCatFilteres(category);
  };

  return (
    <div className={styles.card} onClick={handleCategory}>
      <p>{props.category}</p>
    </div>
  );
}
