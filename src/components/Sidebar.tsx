import type { ShapeType } from "../types/shapes";

const shapes: ShapeType[] = ["circle", "square", "triangle"];

const Sidebar = ({ onSelect }: { onSelect: (s: ShapeType) => void }) => {
  return (
    <div className="w-28 p-2 bg-gray-100 space-y-2">
      {shapes.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="w-full px-2 py-1 bg-white border rounded hover:bg-gray-200">
          {s}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
