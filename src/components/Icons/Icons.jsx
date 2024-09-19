import Sprite from "../../components/Images/sprite.svg";
export const Icons = ({ className, width = 18, height = 18, name }) => {
  return (
    <svg className={className} width={width} height={height} stroke="#FFFFFFCC">
      <use href={`${Sprite}#${name}`}></use>
    </svg>
  );
};
