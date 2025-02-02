import React from "react";
import CaveEntry, { Cave } from "./components/CaveEntry";
import Filter from "./components/Filter";
import Map from "./components/Map";
import data from "./data.json";

// Coordinates are provided as RT90 minus 1 digit
// Converted to WGS84 here: https://pap.as/sweref
// Also good for converting: https://dancasey.ie/batch-coordinate-converter

export default function App() {
  data.sort((a, b) => b.coordinates[0] - a.coordinates[0]);
  const [caves, setCaves] = React.useState<Cave[]>(data);

  return (
    <>
      <div>
        <Filter caves={data} onChange={(caves) => setCaves(caves)} />
        <Map caves={caves} />
      </div>

      <div className="fixed right-0 w-1/2 h-full pl-3 overflow-y-scroll pt-3">
        <div>
          <h1 className="text-3xl font-bold">Grottor i Bohuslän</h1>

          {caves.map((cave) => (
            <CaveEntry data={cave} key={cave.id} />
          ))}
        </div>

        <p className="inline-block italic mt-10 text-gray-600">
          Informationen är baserad på Lars Bengtssons "Grottor i Göteborgs och
          Bohus län" (Miljövårdsrapport 1993:6, Länsstyrelsen)
        </p>
      </div>
    </>
  );
}
