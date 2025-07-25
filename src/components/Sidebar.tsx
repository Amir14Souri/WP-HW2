import type { ShapeType } from "../types/shapes";

const shapes: ShapeType[] = ["circle", "square", "triangle"];

const Sidebar = ({
  currentShape,
  onSelect,
}: {
  currentShape: ShapeType | null;
  onSelect: (s: ShapeType) => void;
}) => {
  return (
    <div className="w-28 p-2 bg-blue-500 space-y-2">
      {shapes.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={`w-full px-2 py-1 bg-white border rounded hover:bg-gray-200 ${
            s == currentShape ? "!bg-blue-300" : ""
          }`}>
          {s}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
