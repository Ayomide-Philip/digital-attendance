import { RADIUS_OF_THE_EARTH } from "../database/config";

export default function haversineDistanceCalculation(lat1, lat2, long1, long2) {
  const radOfLat1 = (Math.PI / 180) * lat1;
  const radOfLat2 = (Math.PI / 180) * lat2;
  const radOfLong1 = (Math.PI / 180) * long1;
  const radOfLong2 = (Math.PI / 180) * long2;

  const changeInLat = radOfLat2 - radOfLat1;
  const changeInLong = radOfLong2 - radOfLong1;

  const a =
    Math.sin(changeInLat / 2) ** 2 +
    Math.cos(radOfLat1) * Math.cos(radOfLat2) * Math.sin(changeInLong / 2) ** 2;

  return Number(RADIUS_OF_THE_EARTH) * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
