import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../../components/Form/Form';

jest.mock('axios', () => ({ get: jest.fn() }));
jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useForm');

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

jest.mock('../../components/Form/SubmitButton', () => ({ SubmitButton: ({ text }) => <button type="submit">{text}</button> }));

describe('Form', () => {
    const mockSetRecommendations = jest.fn();
    const mockGetRecommendations = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        require('../../hooks/useProducts').default.mockReturnValue({
            preferences: ['pref1'],
            features: ['feat1'],
            products: ['prod1'],
        });

        require('../../hooks/useForm').default.mockReturnValue({
            formData: {
                selectedPreferences: [],
                selectedFeatures: [],
                selectedRecommendationType: 'SingleProduct',
            },
            handleChange: jest.fn(),
        });

        mockGetRecommendations.mockReturnValue(['result1']);
    });

    it('renderiza o formulário corretamente', () => {
        render(
            <Form
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
        const handleChangeMock = jest.fn();

        require('../../hooks/useForm').default.mockReturnValue({
            formData: {
                selectedPreferences: [],
                selectedFeatures: [],
                selectedRecommendationType: 'SingleProduct',
            },
            handleChange: handleChangeMock,
        });

        render(
            <Form
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
        expect(handleChangeMock).toHaveBeenCalledWith('selectedRecommendationType', 'SingleProduct');
    });

    it('submete o formulário e chama getRecommendations e setRecommendations', () => {
        render(
            <Form
                recommendationHook={{
                    setRecommendations: mockSetRecommendations,
                    getRecommendations: mockGetRecommendations,
                }}
            />
        );

        fireEvent.click(screen.getByText('Obter recomendação'));

        expect(mockGetRecommendations).toHaveBeenCalledWith(expect.any(Object),['prod1']);
        expect(mockSetRecommendations).toHaveBeenCalledWith(['result1']);
    });
});