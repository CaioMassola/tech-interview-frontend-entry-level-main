import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import useProducts from '../hooks/useProducts';
import useRecommendations from '../hooks/useRecommendations';

jest.mock('axios', () => ({ get: jest.fn() }));
jest.mock('../hooks/useProducts');
jest.mock('../hooks/useRecommendations');
jest.mock('../components/Form/Form', () => () => (
  <div data-testid="form" />
));
jest.mock('../components/RecommendationList/RecommendationList', () => () => (
  <div data-testid="recommendation-list" />
));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useProducts.mockReturnValue({
      products: ['prod1', 'prod2'],
    });

    useRecommendations.mockReturnValue({
      recommendations: [],
      setRecommendations: jest.fn(),
      getRecommendations: jest.fn(),
    });
  });

  it('deve renderizar o layout principal corretamente', () => {
    render(<App />);

    expect(screen.getByText('Recomendador de Produtos RD Station')).toBeInTheDocument();
    expect(screen.getByText(/Bem-vindo ao Recomendador de Produtos RD Station/i)).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation-list')).toBeInTheDocument();
  });
});