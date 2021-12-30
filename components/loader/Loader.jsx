import style from "../../styles/loader.module.scss";

const Loader = () => {
  return (
    <span className={style.loaderWrapper}>
      <span className={style.firstLoader}></span>
      <span className={style.secondLoader}></span>
    </span>
  );
};

export default Loader;
