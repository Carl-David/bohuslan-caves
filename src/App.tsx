import React, { useEffect } from "react";
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

  useEffect(() => {
    window.addEventListener("load", () =>
      setTimeout(() => {
        if (window.location.hash) {
          document
            .getElementById(window.location.hash.replace("#", ""))
            ?.scrollIntoView();
        }
      }, 100)
    );
  });

  return (
    <div className="flex flex-col">
      <div className="fixed flex-row p-3 z-10 bg-white bg-opacity-50">
        <div className="flex-1 content-center">
          <h1 className="block text-2xl font-bold">Grottor i Bohuslän</h1>
        </div>

        <div className="flex-1 flex">
          <Filter caves={data} onChange={(caves) => setCaves(caves)} />
        </div>
      </div>

      <div>
        <div
          id="map"
          className="lg:fixed lg:left-0 lg:h-full h-[50vh] lg:w-1/2 w-full mr-3 p-4"
        >
          <Map caves={caves} />
        </div>

        <div className="lg:fixed lg:w-1/2 lg:right-0 lg:h-full h-[50vh] w-full overflow-y-scroll pl-3 mt-2">
          <div>
            {caves.map((cave) => (
              <CaveEntry data={cave} key={cave.id} />
            ))}
          </div>

          <p className="inline-block italic mt-10 text-gray-600">
            Informationen är baserad på Lars Bengtssons "Grottor i Göteborgs och
            Bohus län" (Miljövårdsrapport 1993:6, Länsstyrelsen)
          </p>
        </div>
      </div>
    </div>
  );
}
