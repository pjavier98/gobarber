import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedToken = jest.fn();

const mockedApi = new MockAdapter(api);

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: mockedToken,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
    mockedToken.mockClear();
  });

  it('should be able to reset the password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    mockedApi.onPost('/password/reset').replyOnce(200);

    // jest.spyOn(mockedToken, 'useLocation').mockReturnValue('?token=new-token');

    const newPasswordField = getByPlaceholderText('Nova senha');
    const newPasswordConfirmationField = getByPlaceholderText(
      'Confirmação da senha',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
