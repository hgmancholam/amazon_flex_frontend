import { FaReact } from "react-icons/fa";
export default function SelectorModo(props) {
  const { imagen, nombre, activo, onClick } = props;

  const Icono = imagen || FaReact;

  return (
    <div
      className={`group rounded-lg border border-gray-300 bg-gray-100 px-2 pt-2 pb-0 transition-colors flex flex-col items-center text-center  
        cursor-pointer m-2 !w-[27%]
        ${activo ? "border-red-500 bg-red-200 !font-extrabold" : ""}`}
      onClick={onClick}
    >
      <Icono className="text-4xl md:text-[calc(3vw)]" />
      <span
        className={`self-center text-center mb-3 text-[15px] md:text-[calc(2vw)] font-normal`}
      >
        {nombre}
      </span>
    </div>
  );
}
