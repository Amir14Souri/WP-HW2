import { useRef } from "react";

type Props = {
  title: string;
  setTitle: (v: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
};

const Header = ({ title, setTitle, onExport, onImport }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-2 bg-blue-100 flex items-center justify-between">
      <input
        className="p-1 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-200 rounded" onClick={onExport}>
          Export
        </button>
        <button
          className="px-3 py-1 bg-green-200 rounded"
          onClick={handleImportClick}>
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Header;
