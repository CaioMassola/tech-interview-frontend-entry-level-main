import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';

function Form({ recommendationHook, formHook }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = formHook;
  const { setRecommendations, getRecommendations } = recommendationHook;
  const disabled = !formData.selectedFeatures.length && !formData.selectedPreferences.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataRecommendations = getRecommendations(formData, products);

    setRecommendations(dataRecommendations);
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-[#262626] rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        selectedRecommendationType={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" disabled={disabled} />
    </form>
  );
}

export default Form;
