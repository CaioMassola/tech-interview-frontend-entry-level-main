import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationList from '../../components/RecommendationList/RecommendationList';

jest.mock('../../components/Form/SubmitButton', () => ({
  SubmitButton: ({ text, disabled }) => (
    <button type="submit" disabled={disabled}>
      {text}
    </button>
  ),
}));

describe('RecommendationList', () => {
  const mockSetRecommendations = jest.fn();
  const mockSetPreferences = jest.fn();
  const mockSetFeatures = jest.fn();
  const mockResetForm = jest.fn();

  const baseProps = {
    recommendationHook: {
      recommendations: [],
      setRecommendations: mockSetRecommendations,
    },
    productsHook: {
      setPreferences: mockSetPreferences,
      setFeatures: mockSetFeatures,
    },
    formHook: {
      resetForm: mockResetForm,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve exibir mensagem quando não há recomendações', () => {
    render(<RecommendationList {...baseProps} />);

    expect(
      screen.getByText('Nenhuma recomendação encontrada.')
    ).toBeInTheDocument();
  });

  it('deve renderizar a lista de recomendações', () => {
    const props = {
      ...baseProps,
      recommendationHook: {
        ...baseProps.recommendationHook,
        recommendations: [
          { name: 'Produto 1' },
          { name: 'Produto 2' },
        ],
      },
    };

    render(<RecommendationList {...props} />);

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
  });

  it('deve exibir o título da lista', () => {
    render(<RecommendationList {...baseProps} />);

    expect(
      screen.getByText('Lista de Recomendações:')
    ).toBeInTheDocument();
  });

  it('deve limpar recomendações, preferências, features e resetar o form ao submeter', () => {
    const props = {
      ...baseProps,
      recommendationHook: {
        ...baseProps.recommendationHook,
        recommendations: [{ name: 'Produto 1' }],
      },
    };

    render(<RecommendationList {...props} />);

    const button = screen.getByText('Limpar Recomendações');

    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    expect(mockSetRecommendations).toHaveBeenCalledWith([]);
    expect(mockSetPreferences).toHaveBeenCalledWith([]);
    expect(mockSetFeatures).toHaveBeenCalledWith([]);
    expect(mockResetForm).toHaveBeenCalled();
  });

  it('deve desabilitar o botão quando não há recomendações', () => {
    render(<RecommendationList {...baseProps} />);

    const button = screen.getByText('Limpar Recomendações');

    expect(button).toBeDisabled();
  });
});