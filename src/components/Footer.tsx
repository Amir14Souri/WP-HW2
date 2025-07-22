import type { Shape, ShapeType } from "../types/shapes";

const Footer = ({ shapes }: { shapes: Shape[] }) => {
  const counts = shapes.reduce((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1;
    return acc;
  }, {} as Record<ShapeType, number>);

  return (
    <div className="p-2 bg-gray-200 text-sm flex gap-4">
      {Object.entries(counts).map(([type, count]) => (
        <div key={type}>
          {type}: {count}
        </div>
      ))}
    </div>
  );
};

export default Footer;
