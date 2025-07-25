import type { Shape, ShapeType } from "../types/shapes";

const Footer = ({ shapes }: { shapes: Shape[] }) => {
  const counts = shapes.reduce((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1;
    return acc;
  }, {} as Record<ShapeType, number>);

  return (
    <div className="p-2 bg-blue-800 text-sm text-white flex gap-4 min-h-10">
      {Object.keys(counts).length
        ? Object.entries(counts).map(([type, count]) => (
            <div key={type}>
              {type}: {count}
            </div>
          ))
        : "Canvas is empty!"}
    </div>
  );
};

export default Footer;
