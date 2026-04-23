import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({
  selectedRecommendationType,
  onRecommendationTypeChange,
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>

      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          checked={selectedRecommendationType === 'SingleProduct'}
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="mr-2"
        />
        <label className="mr-4">Produto Único</label>

        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          checked={selectedRecommendationType === 'MultipleProducts'}
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="mr-2"
        />
        <label>Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;