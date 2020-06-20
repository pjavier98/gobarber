import React from 'react';
import RouteData from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedApi = new MockAdapter(api);
let mockedToken: jest.SpyInstance;

const mockLocation = {
  withToken: {
    pathname: '',
    hash: '',
    search: '?token=new-token',
    state: '',
  },

  withoutToken: {
    pathname: '',
    hash: '',
    search: '',
    state: '',
  },
};

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: '',
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
    mockedToken = jest.spyOn(RouteData, 'useLocation');
  });

  it('should be able to reset the password', async () => {
    jest
      .spyOn(RouteData, 'useLocation')
      .mockReturnValue(mockLocation.withToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    mockedApi.onPost('/password/reset').replyOnce(200);

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

  it('should not be able to reset the password without token', async () => {
    mockedToken.mockReturnValue(mockLocation.withoutToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    mockedApi.onPost('/password/reset').replyOnce(200);

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
      expect(mockedHistoryPush).not.toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should not be able to reset the password with invalid confirmation password', async () => {
    mockedToken.mockReturnValue(mockLocation.withToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    mockedApi.onPost('/password/reset').replyOnce(200);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const newPasswordConfirmationField = getByPlaceholderText(
      'Confirmação da senha',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: 'invalid-password' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
