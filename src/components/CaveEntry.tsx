import { ReactNode, useState } from "react";

export interface Cave {
  id: string;
  name: string;
  type: string;
  importance: string;
  location?: string;
  mapId: string;
  coordinates: number[];
  surroundings?: string;
  description?: string;
  origin?: string;
  scientificValue?: string;
  recreationalValue?: string;
  protectionValue?: string;
}

const DataPoint = ({
  title,
  body,
  compact,
}: {
  title: string;
  body: string | ReactNode;
  compact?: boolean;
}) => {
  return (
    <p className={compact ? "" : "mt-4"}>
      <em className="font-medium">{title}: </em>
      {body}
    </p>
  );
};

export default function CaveEntry({ data }: { data: Cave }) {
  const [showDetails, setShowDetails] = useState(false);
  const {
    name,
    id,
    coordinates,
    type,
    importance,
    description,
    location,
    surroundings,
    origin,
    scientificValue,
    recreationalValue,
    protectionValue,
  } = data;

  return (
    <div className="mb-4 pt-2" id={id}>
      <h2 className="text-xl font-extrabold mb-2">{name}</h2>

      <DataPoint title="Typ" body={type} compact />
      <DataPoint title="Värdeklassificering" body={importance} compact />
      <DataPoint
        title="Koordinater"
        body={
          <a
            title="Öppna i Google Maps"
            href={`https://www.google.com/maps?t=k&q=${coordinates.join(",")}`}
          >
            {coordinates.join(", ")}
          </a>
        }
        compact
      />

      {description && <DataPoint title="Beskrivning" body={description} />}
      <a
        className="inline-block mt-2"
        href="#"
        onClick={() => setShowDetails(!showDetails)}
      >
        Mer information {showDetails ? "↑" : "↓"}
      </a>

      {showDetails && (
        <div className="ml-1 pl-2 border-l-4 border-l-gray-200">
          {location && <DataPoint title="Läge" body={location} />}
          {surroundings && <DataPoint title="Omgivning" body={surroundings} />}
          {origin && <DataPoint title="Uppkomst" body={origin} />}
          {scientificValue && (
            <DataPoint title="Vetenskapligt värde" body={scientificValue} />
          )}
          {recreationalValue && (
            <DataPoint title="Rekreativt värde" body={recreationalValue} />
          )}
          {protectionValue && (
            <DataPoint title="Skyddsbehov" body={protectionValue} />
          )}
        </div>
      )}
    </div>
  );
}
