import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationType from '../../components/Form/Fields/RecommendationType';

jest.mock('../../components/shared/Checkbox', () => ({
  __esModule: true,
  default: ({ children, onChange, value, type, checked, ...props }) => (
    <label>
      <input
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {children}
    </label>
  ),
}));

describe('RecommendationType', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar os tipos de recomendação', () => {
    render(
      <RecommendationType
        selectedRecommendationType="SingleProduct"
        onRecommendationTypeChange={mockOnChange}
      />
    );

    expect(screen.getByText('Produto Único')).toBeInTheDocument();
    expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument();
  });

  it('deve ter SingleProduct como selecionado', () => {
    render(
      <RecommendationType
        selectedRecommendationType="SingleProduct"
        onRecommendationTypeChange={mockOnChange}
      />
    );

    const single = screen.getByDisplayValue('SingleProduct');
    expect(single).toBeChecked();
  });

  it('deve chamar callback ao selecionar MultipleProducts e depois SingleProduct', () => {
    const { rerender } = render(
      <RecommendationType
        selectedRecommendationType="SingleProduct"
        onRecommendationTypeChange={mockOnChange}
      />
    );

    const multiple = screen.getByDisplayValue('MultipleProducts');

    fireEvent.click(multiple);
    expect(mockOnChange).toHaveBeenCalledWith('MultipleProducts');

    rerender(
      <RecommendationType
        selectedRecommendationType="MultipleProducts"
        onRecommendationTypeChange={mockOnChange}
      />
    );

    const single = screen.getByDisplayValue('SingleProduct');

    fireEvent.click(single);
    expect(mockOnChange).toHaveBeenCalledWith('SingleProduct');
  });
});