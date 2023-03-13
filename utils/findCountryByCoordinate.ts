import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { multiPolygon, polygon } from "@turf/helpers";
import countries from "../assets/countries.json";

// TODO: Add types

const isPointInCountry = (country: any, point: any): boolean => {
  const { type: countryGeoType, coordinates: countryCoordinates } =
    country.geometry;
  if (countryGeoType === "Polygon") {
    return booleanPointInPolygon(point, polygon(countryCoordinates));
  } else if (countryGeoType === "MultiPolygon") {
    return booleanPointInPolygon(point, multiPolygon(countryCoordinates));
  }
  return false;
};

const extractCountryInfoFromCountryFeature = (countryFeature: any): any => {
  const { ISO_A3, ISO_A2, ADMIN } = countryFeature.properties;
  return {
    code: ISO_A3,
    isoA3Code: ISO_A3,
    isoA2Code: ISO_A2,
    name: ADMIN,
  };
};

export default function findCountryByCoordinate(
  latitude: number,
  longitude: number
): any {
  const countryFound = (countries as any).features?.find((country: any) =>
    isPointInCountry(country, [longitude, latitude])
  );

  if (!countryFound) return;

  return extractCountryInfoFromCountryFeature(countryFound);
}
