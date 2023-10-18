import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const libs: any = ["geometry", "drawing"];

function MyGoogleMap({ city }: { city: string }): any {
  const [mapCenter, setMapCenter] = useState({ lat: 53.4261, lng: 14.4821 });
  const [loadingError, setLoadingError] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: libs,
  });

  useEffect(() => {
    if (!city) return;

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        city
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setMapCenter({ lat, lng });
        }
      })
      .catch((error) => {
        setLoadingError(error);
      });
  }, [city]);

  return loadingError ? (
    <div>Something went wrong</div>
  ) : (
    isLoaded && (
      <GoogleMap
        center={mapCenter}
        zoom={13}
        options={{ draggable: false }}
        mapContainerClassName={"singleJob_page_google_map"}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    )
  );
}

export const MemoizedGoogleMap = React.memo(MyGoogleMap);
