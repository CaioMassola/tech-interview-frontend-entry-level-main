import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Preferences from '../../components/Form/Fields/Preferences';

jest.mock('../../components/shared/Checkbox', () => ({
  __esModule: true,
  default: ({ children, checked, onChange }) => (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </label>
  ),
}));

describe('Preferences', () => {
  const mockOnPreferenceChange = jest.fn();

  const preferences = ['pref1', 'pref2'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todas as preferências', () => {
    render(
      <Preferences
        preferences={preferences}
        selectedPreferences={[]}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    expect(screen.getByText('pref1')).toBeInTheDocument();
    expect(screen.getByText('pref2')).toBeInTheDocument();
    expect(screen.getByText('Preferências:')).toBeInTheDocument();
  });

  it('deve selecionar uma preferência ao clicar', () => {
    render(
      <Preferences
        preferences={preferences}
        selectedPreferences={[]}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    fireEvent.click(screen.getByLabelText('pref1'));

    expect(mockOnPreferenceChange).toHaveBeenCalledWith(['pref1']);
  });

  it('deve remover uma preferência já selecionada', () => {
    render(
      <Preferences
        preferences={preferences}
        selectedPreferences={['pref1']}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    fireEvent.click(screen.getByLabelText('pref1'));

    expect(mockOnPreferenceChange).toHaveBeenCalledWith([]);
  });

  it('deve manter múltiplas seleções', () => {
    render(
      <Preferences
        preferences={preferences}
        selectedPreferences={['pref1']}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    fireEvent.click(screen.getByLabelText('pref2'));

    expect(mockOnPreferenceChange).toHaveBeenCalledWith(['pref1', 'pref2']);
  });
});