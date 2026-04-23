import React from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import useProducts from './hooks/useProducts';
import useRecommendations from './hooks/useRecommendations';

function App() {
  const { products } = useProducts();
  const recommendationHook = useRecommendations(products);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">
        Recomendador de Produtos RD Station
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2 mb-4">
          <p className="text-lg">
            Bem-vindo ao Recomendador de Produtos RD Station...
          </p>
        </div>

        <div>
          <Form recommendationHook={recommendationHook} />
        </div>

        <div>
          <RecommendationList recommendationHook={recommendationHook} />
        </div>
      </div>
    </div>
  );
}

export default App;