import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { Cave } from "./CaveEntry";

export default function Map({ caves }: { caves: Cave[] }) {
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const key = new URLSearchParams(window.location.search).get("key") ?? "";

      if (!key) {
        throw new Error(
          "A valid Mapbox access token is required in query param `key` to get a working map."
        );
      }

      mapboxgl.accessToken = key;

      const map = new mapboxgl.Map({
        container: "map",
        projection: "mercator",
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [11.580408533154396, 58.3594082820708],
        zoom: 6,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.NavigationControl());

      map.addControl(
        new mapboxgl.ScaleControl({
          maxWidth: 80,
          unit: "metric",
        }) as any
      );

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );

      map.addControl(
        new mapboxgl.AttributionControl({
          customAttribution:
            "Grottor i Göteborgs och Bohus län av Lars Bengtsson, Miljövårdsrapport 1993:6, Länsstyrelsen",
        })
      );

      class StyleControl {
        _map: MapboxMap | undefined;
        _container: HTMLElement | undefined;

        onAdd(map: any) {
          this._map = map;
          this._container = document.createElement("div");
          this._container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
          this._container.addEventListener("contextmenu", (e: Event) =>
            e.preventDefault()
          );
          this._container.addEventListener("click", () => this.onClick());

          this._container.innerHTML =
            '<div class="tools-box">' +
            "<button>" +
            '<span class="mapboxgl-ctrl-icon" aria-hidden="true" title="Toggle satellite view"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21.05l-9-7l1.65-1.25L12 18.5l7.35-5.7L21 14.05zM12 16L3 9l9-7l9 7zm0-2.55L17.75 9L12 4.55L6.25 9z"></path></svg></span>' +
            "</button>" +
            "</div>";

          return this._container;
        }

        onRemove() {
          this._container?.parentNode?.removeChild(this._container);
          this._map = undefined;
        }

        onClick() {
          this._map?.style.globalId === "mapbox://styles/mapbox/outdoors-v12"
            ? this._map?.setStyle("mapbox://styles/mapbox/satellite-v9")
            : this._map?.setStyle("mapbox://styles/mapbox/outdoors-v12");
        }
      }

      const styleControl = new StyleControl();
      map.addControl(styleControl, "top-right");
      map.on("load", () => {
        caves.map((entry) => {
          const marker = new mapboxgl.Marker();
          marker
            .setLngLat([entry.coordinates[1], entry.coordinates[0]])
            .setPopup(
              new mapboxgl.Popup({
                closeOnMove: true,
                closeButton: false,
              }).setText(entry.name)
            )
            .addTo(map);
          marker.getElement().setAttribute("title", entry.name);
          marker.getElement().addEventListener("click", () => {
            window.location.hash = entry.id;
          });
        });
      });
    } catch (e) {
      console.error(error);
      setError((e as Error).message);
      const map = document.querySelector("#map");
      if (map)
        map.innerHTML = `<span class="block text-red-600 mt-[50vh]">${error}</span>`;
    }
  });

  return <div id="map"></div>;
}
