import React from "react";
import { Cave } from "./CaveEntry";

export default function Filter({
  caves,
  onChange,
}: {
  caves: Cave[];
  onChange: (caves: Cave[]) => void;
}) {
  const filterType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO: Includes?
    // TODO: Don't clear both when clearing one, use a ref
    if (e.target.value === "") {
      onChange(caves);
    } else {
      onChange(caves.filter((cave) => cave.type === e.target.value));
    }
  };

  const filterValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      onChange(caves);
    } else {
      onChange(
        caves.filter((cave) => cave.importance.includes(e.target.value))
      );
    }
  };

  return (
    <div className="sticky p-3 top-0 right-0 bg-white flex justify-between">
      <div className="mr-2">
        <label>
          Typ
          <select id="type" onChange={filterType}>
            <option value="">Alla</option>
            {caves
              .map((entry) => entry.type)
              .filter((type, index, types) => types.indexOf(type) === index)
              .sort()
              .map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className="mr-2">
        <label>
          Värde
          <select id="values" onChange={filterValue}>
            <option value="">Alla</option>
            <option value="V1">V1 (högt vetenskapligt värde)</option>
            <option value="V2">V2 (visst vetenskapligt värde)</option>
            <option value="V3">V3 (lågt vetenskapligt värde)</option>
            <option value="R1">R1 (högt rekreativt värde)</option>
            <option value="R2">R2 (visst rekreativt värde)</option>
            <option value="R3">R3 (lågt rekreativt värde)</option>
            <option value="S1">S1 (högt skyddsbehov)</option>
            <option value="S2">S2 (visst skyddsbehov)</option>
            <option value="S3">S3 (lågt skyddsbehov)</option>
          </select>
        </label>
      </div>
    </div>
  );
}
