import React from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import useProducts from './hooks/useProducts';
import useRecommendations from './hooks/useRecommendations';

function App() {
  const { products } = useProducts();
  const recommendationHook = useRecommendations(products);

  return (
    <div className="bg-[#212121] min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8 mt-4">
        Recomendador de Produtos RD Station
      </h1>

      <div className="bg-[#262626] p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2 flex justify-center mb-4">
          <p className="text-lg font-bold text-center">
            Bem-vindo ao Recomendador de Produtos RD Station...
          </p>
        </div>
        <div className="order-1 md:order-none">
          <Form recommendationHook={recommendationHook} />
        </div>
        <div className="order-2 md:order-none">
          <RecommendationList recommendationHook={recommendationHook} />
        </div>
      </div>
    </div>
  );
}

export default App;