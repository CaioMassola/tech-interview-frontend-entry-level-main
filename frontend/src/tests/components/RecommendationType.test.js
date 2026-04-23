import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationType from '../../components/Form/Fields/RecommendationType';

jest.mock('../../components/shared/Checkbox', () => ({
  __esModule: true,
  default: ({ children, onChange, value, type, ...props }) => (
    <label>
      <input type={type} value={value} onChange={onChange} {...props} />
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
    render(<RecommendationType onRecommendationTypeChange={mockOnChange} />);

    expect(screen.getByText('Produto Único')).toBeInTheDocument();
    expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument();
  });

  it('deve ter SingleProduct como padrão selecionado', () => {
    render(<RecommendationType onRecommendationTypeChange={mockOnChange} />);

    const single = screen.getByDisplayValue('SingleProduct');
    expect(single).toBeChecked();
  });

  it('deve chamar callback ao selecionar MultipleProducts e depois o SingleProduct', () => {
    render(<RecommendationType onRecommendationTypeChange={mockOnChange} />);

    fireEvent.click(screen.getByDisplayValue('MultipleProducts'));

    expect(mockOnChange).toHaveBeenCalledWith('MultipleProducts');

    fireEvent.click(screen.getByDisplayValue('SingleProduct'));

    expect(mockOnChange).toHaveBeenCalledWith('SingleProduct');
  });
});