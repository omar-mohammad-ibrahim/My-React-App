import { useState } from "react";
import { Copy, Info } from "lucide-react";

export default function SystemInfo({ formData, isEditing }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-1.5 text-sm mt-4">
      <div className="flex items-center text-gray-600">
        <span className="w-40 text-gray-500">Member ID</span>
        <span className="text-gray-900">{formData.memberId}</span>
        {isEditing ? (
          <button
            onClick={handleCopy}
            className="ml-auto text-blue-600 hover:underline text-xs"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        ) : (
          <button
            onClick={handleCopy}
            className="ml-2 text-gray-400 hover:text-gray-700"
          >
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center text-gray-600">
        <span className="w-40 text-gray-500 flex items-center gap-1">
          Country of registration {isEditing && <Info className="w-3 h-3" />}
        </span>
        <span className="flex items-center gap-2 text-gray-900">
          🇯🇴 {formData.country}{" "}
          {!isEditing && <Info className="w-4 h-4 text-gray-400" />}
        </span>
      </div>

      {!isEditing && (
        <div className="flex items-center text-gray-600">
          <span className="w-40 text-gray-500">Year joined</span>
          <span className="text-gray-900">{formData.yearJoined}</span>
        </div>
      )}
    </div>
  );
}
