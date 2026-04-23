import React from 'react';
import { SubmitButton } from '../Form/SubmitButton';

function RecommendationList({ recommendationHook, productsHook, formHook }) {
  const { recommendations, setRecommendations } = recommendationHook;
  const { setPreferences, setFeatures } = productsHook;
  const { resetForm } = formHook;

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecommendations([]);
    setPreferences([]);
    setFeatures([]);
    resetForm();
  };

  return (
    <div className='max-w-md mx-auto p-4 bg-[#262626] rounded-lg shadow-md'>
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>
      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-2">
            {recommendation.name}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className='mt-10'>
        <SubmitButton text="Limpar Recomendações" disabled={!recommendations.length} />
      </form>
    </div>
  );
}

export default RecommendationList;