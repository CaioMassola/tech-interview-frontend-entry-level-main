import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from '../../components/RecommendationList/RecommendationList';

describe('RecommendationList', () => {
  it('deve exibir mensagem quando não há recomendações', () => {
    const recommendationHook = {
      recommendations: [],
    };

    render(<RecommendationList recommendationHook={recommendationHook} />);

    expect(screen.getByText('Nenhuma recomendação encontrada.')).toBeInTheDocument();
  });

  it('deve renderizar a lista de recomendações', () => {
    const recommendationHook = {
      recommendations: [
        { name: 'Produto 1' },
        { name: 'Produto 2' },
      ],
    };

    render(<RecommendationList recommendationHook={recommendationHook} />);

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
  });

  it('deve exibir o título da lista', () => {
    const recommendationHook = {
      recommendations: [],
    };

    render(<RecommendationList recommendationHook={recommendationHook} />);

    expect(screen.getByText('Lista de Recomendações:')).toBeInTheDocument();
  });
});