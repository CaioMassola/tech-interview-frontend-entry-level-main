const RECOMMENDATION_TYPE = {
  SINGLE: "SingleProduct",
  MULTIPLE: "MultipleProducts"
};

const countMatches = (items = [], selectedItems = []) => items.filter(item => selectedItems.includes(item)).length;

const calculateScore = (product, selectedFeatures, selectedPreferences) => {
  const featureMatches = countMatches(product.features, selectedFeatures);
  const preferenceMatches = countMatches(product.preferences, selectedPreferences);

  return featureMatches + preferenceMatches;
};

const rankProducts = (products, selectedFeatures, selectedPreferences) => {
  return products.map(product => ({
      ...product,
      score: calculateScore(product, selectedFeatures, selectedPreferences)
    })).filter(product => product.score > 0).sort((a, b) => b.score - a.score);
};

const getBestProduct = (rankedProducts) => {
  if (!rankedProducts.length) return [];

  const highestScore = rankedProducts[0].score;

  const bestProducts = rankedProducts.filter(product => product.score === highestScore);

  return [bestProducts[bestProducts.length - 1]];
};

export const getRecommendationsService = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: RECOMMENDATION_TYPE.SINGLE },
  products = []
) => {
  const { selectedFeatures, selectedPreferences, selectedRecommendationType } = formData;

  const rankedProducts = rankProducts(products, selectedFeatures, selectedPreferences);

  if (selectedRecommendationType === RECOMMENDATION_TYPE.SINGLE) {
    return getBestProduct(rankedProducts);
  }

  return rankedProducts;
};