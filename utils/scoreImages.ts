import { EcoScore, NovaGroup, NutriScore } from "./../constants/Types";
export function getNutriscoreImage(nutriscore: NutriScore) {
  return `https://static.openfoodfacts.org/images/attributes/nutriscore-${
    nutriscore || "unknown"
  }.svg`;
}

export function getEcoScoreImage(ecoscore: EcoScore) {
  return `https://static.openfoodfacts.org/images/attributes/ecoscore-${
    ecoscore || "unknown"
  }.svg`;
}

export function getNovaGroupImage(novagroup: NovaGroup) {
  return `https://static.openfoodfacts.org/images/attributes/nova-group-${
    novagroup || "unknown"
  }.svg`;
}
