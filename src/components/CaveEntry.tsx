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
  genes?: string;
  scientificValue?: string;
  recreationalValue?: string;
  protectionValue?: string;
}

export default function CaveEntry({ data }: { data: Cave }) {
  const { name, id, coordinates, type, importance, description } = data;

  return (
    <div className="mb-4 pt-2" id={id}>
      <h2 className="text-xl font-extrabold mb-2">{name}</h2>
      <p>
        <em>Typ: </em>
        {type}
      </p>
      <p>
        <em>Värde: </em>
        {importance}
      </p>
      <p>
        <em>Koordinater: </em>
        <a
          title="Öppna i Google Maps"
          href={`https://www.google.com/maps?t=k&q=${coordinates.join(",")}`}
        >
          {coordinates.join(", ")}
        </a>
      </p>
      {description && (
        <div className="mt-4">
          <em>Beskrivning: </em>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
