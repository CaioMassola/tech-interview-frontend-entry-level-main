import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../../components/Form/Form';

jest.mock('axios', () => ({ get: jest.fn() }));
jest.mock('../../hooks/useProducts');

jest.mock('../../components/Form/Fields', () => ({
  Preferences: ({ onPreferenceChange }) => (
    <button onClick={() => onPreferenceChange(['pref1'])}>
      Preferences
    </button>
  ),
  Features: ({ onFeatureChange }) => (
    <button onClick={() => onFeatureChange(['feat1'])}>
      Features
    </button>
  ),
  RecommendationType: ({ onRecommendationTypeChange }) => (
    <button onClick={() => onRecommendationTypeChange('SingleProduct')}>
      RecommendationType
    </button>
  ),
}));

jest.mock('../../components/Form/SubmitButton', () => ({
  SubmitButton: ({ text, disabled }) => (
    <button type="submit" disabled={disabled}>
      {text}
    </button>
  ),
}));

describe('Form', () => {
  const mockSetRecommendations = jest.fn();
  const mockGetRecommendations = jest.fn();
  const handleChangeMock = jest.fn();

  const baseFormHook = {
    formData: {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    },
    handleChange: handleChangeMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    require('../../hooks/useProducts').default.mockReturnValue({
      preferences: ['pref1'],
      features: ['feat1'],
      products: ['prod1'],
    });

    mockGetRecommendations.mockReturnValue(['result1']);
  });

  it('renderiza o formulário corretamente', () => {
    render(
      <Form
        formHook={baseFormHook}
        recommendationHook={{
          setRecommendations: mockSetRecommendations,
          getRecommendations: mockGetRecommendations,
        }}
      />
    );

    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('RecommendationType')).toBeInTheDocument();
    expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
  });

  it('chama handleChange ao interagir com os campos', () => {
    render(
      <Form
        formHook={baseFormHook}
        recommendationHook={{
          setRecommendations: mockSetRecommendations,
          getRecommendations: mockGetRecommendations,
        }}
      />
    );

    fireEvent.click(screen.getByText('Preferences'));
    fireEvent.click(screen.getByText('Features'));
    fireEvent.click(screen.getByText('RecommendationType'));

    expect(handleChangeMock).toHaveBeenCalledWith('selectedPreferences', ['pref1']);
    expect(handleChangeMock).toHaveBeenCalledWith('selectedFeatures', ['feat1']);
    expect(handleChangeMock).toHaveBeenCalledWith(
      'selectedRecommendationType',
      'SingleProduct'
    );
  });

  it('deve iniciar com botão desabilitado', () => {
    render(
      <Form
        formHook={baseFormHook}
        recommendationHook={{
          setRecommendations: mockSetRecommendations,
          getRecommendations: mockGetRecommendations,
        }}
      />
    );

    const button = screen.getByText('Obter recomendação');
    expect(button).toBeDisabled();
  });

  it('submete o formulário quando houver seleção', () => {
    const formHookWithData = {
      formData: {
        selectedPreferences: ['pref1'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      },
      handleChange: handleChangeMock,
    };

    render(
      <Form
        formHook={formHookWithData}
        recommendationHook={{
          setRecommendations: mockSetRecommendations,
          getRecommendations: mockGetRecommendations,
        }}
      />
    );

    const button = screen.getByText('Obter recomendação');

    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    expect(mockGetRecommendations).toHaveBeenCalledWith(
      formHookWithData.formData,
      ['prod1']
    );

    expect(mockSetRecommendations).toHaveBeenCalledWith(['result1']);
  });
});