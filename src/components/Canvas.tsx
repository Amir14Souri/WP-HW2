import React from "react";
import type { Shape } from "../types/shapes";

const Canvas = ({
  shapes,
  onAdd,
  onRemove,
}: {
  shapes: Shape[];
  onAdd: (x: number, y: number) => void;
  onRemove: (id: string) => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (e.target != e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 20;
    const y = e.clientY - rect.top - 20;
    onAdd(x, y);
  };

  return (
    <div
      className="flex-1 relative bg-white border overflow-auto"
      onClick={handleClick}>
      {shapes.map((s) => (
        <div
          key={s.id}
          onDoubleClick={() => onRemove(s.id)}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: 40,
            height: 40,
            backgroundColor: "skyblue",
            borderRadius: s.type === "circle" ? "50%" : undefined,
            clipPath:
              s.type === "triangle"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : undefined,
          }}
        />
      ))}
    </div>
  );
};

export default Canvas;
