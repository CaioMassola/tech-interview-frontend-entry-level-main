import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Features from '../../components/Form/Fields/Features';

jest.mock('../../components/shared/Checkbox', () => ({
    __esModule: true,
    default: ({ children, checked, onChange }) => (
        <label>
            <input type="checkbox" checked={checked} onChange={onChange} />
            {children}
        </label>
    ),
}));

describe('Features', () => {
    const mockOnFeatureChange = jest.fn();

    const features = ['feat1', 'feat2'];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve renderizar todas as funcionalidades', () => {
        render(
            <Features
                features={features}
                selectedFeatures={[]}
                onFeatureChange={mockOnFeatureChange}
            />
        );

        expect(screen.getByText('feat1')).toBeInTheDocument();
        expect(screen.getByText('feat2')).toBeInTheDocument();
        expect(screen.getByText('Funcionalidades:')).toBeInTheDocument();
    });

    it('deve adicionar uma feature ao clicar', () => {
        render(
            <Features
                features={features}
                selectedFeatures={[]}
                onFeatureChange={mockOnFeatureChange}
            />
        );

        fireEvent.click(screen.getByLabelText('feat1'));

        expect(mockOnFeatureChange).toHaveBeenCalledWith(['feat1']);
    });

    it('deve remover uma feature selecionada', () => {
        render(
            <Features
                features={features}
                selectedFeatures={['feat1']}
                onFeatureChange={mockOnFeatureChange}
            />
        );

        fireEvent.click(screen.getByLabelText('feat1'));

        expect(mockOnFeatureChange).toHaveBeenCalledWith([]);
    });

    it('deve manter múltiplas features selecionadas', () => {
        render(
            <Features
                features={features}
                selectedFeatures={['feat1']}
                onFeatureChange={mockOnFeatureChange}
            />
        );

        fireEvent.click(screen.getByLabelText('feat2'));

        expect(mockOnFeatureChange).toHaveBeenCalledWith(['feat1', 'feat2']);
    });
});