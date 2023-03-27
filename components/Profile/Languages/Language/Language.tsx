import styles from "./Language.module.scss";

interface LanguageProps {
  image: string;
  text: string;
}

const Language = ({ image, text }: LanguageProps) => {
  return (
    <div>
      <img src={image} />
      <h4>{text}</h4>
    </div>
  );
};

export default Language;
