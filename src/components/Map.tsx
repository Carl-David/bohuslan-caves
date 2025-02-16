import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { Cave } from "./CaveEntry";

export default function Map({
  caves,
  selectedCave,
}: {
  caves: Cave[];
  selectedCave: Cave | null;
}) {
  useEffect(() => {
    // TODO: Make map collapsible

    mapboxgl.accessToken =
      "pk.eyJ1IjoiZXZpZXhhYWIiLCJhIjoiY2lxaHJ2d3I4MDA5Zmk2a3g2MXluMzlkdyJ9.GzIqoAYBLTE5TZeFyQF0fg";

    const map = new mapboxgl.Map({
      container: "map",
      projection: "mercator",
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: selectedCave
        ? [selectedCave.coordinates[1], selectedCave.coordinates[0] + 0.0005]
        : [11.580408533154396, 58.3594082820708],
      zoom: selectedCave ? 16 : 6,
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
              closeButton: false,
            }).setText(entry.name)
          )
          .addTo(map);
        marker.getElement().setAttribute("title", entry.name);
        marker.getElement().onclick = () => {
          document.getElementById(entry.id)?.scrollIntoView();
          const url = new URL(window.location.href);
          url.searchParams.set("id", entry.id);
          window.history.pushState({}, "", url);
        };
      });
    });
  });

  return <div id="map"></div>;
}
