import { useState } from "react";
import Canvas from "./components/Canvas";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import type { Shape, ShapeType } from "./types/shapes";

const App = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType | null>(null);
  const [title, setTitle] = useState("MyPainting");

  const addShape = (x: number, y: number) => {
    if (!selectedShape) return;
    setShapes([
      ...shapes,
      { id: crypto.randomUUID(), type: selectedShape, x, y },
    ]);
  };

  const removeShape = (id: string) => {
    setShapes(shapes.filter((s) => s.id !== id));
  };

  const handleExport = () => {
    const data = JSON.stringify(shapes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drawing.json";
    a.click();
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = JSON.parse(reader.result as string);
      setShapes(data);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header
        title={title}
        setTitle={setTitle}
        onExport={handleExport}
        onImport={handleImport}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentShape={selectedShape} onSelect={setSelectedShape} />
        <Canvas shapes={shapes} onAdd={addShape} onRemove={removeShape} />
      </div>
      <Footer shapes={shapes} />
    </div>
  );
};

export default App;
