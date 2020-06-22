import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import Profile from '../../pages/Profile';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
const mockedUpdateUser = jest.fn();
const mockedAddToast = jest.fn();

const mockedApi = new MockAdapter(api);

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: {
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
      },
      updateUser: mockedUpdateUser,
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

describe('Profile Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedUpdateUser.mockClear();
    mockedAddToast.mockClear();
    mockedApi.reset();
  });

  it('should be able to update the profile (name and email)', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const updateUser = {
      name: 'Jhon Tre',
      email: 'jhontre@example.com',
    };

    mockedApi.onPut('/profile').replyOnce(200, updateUser);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameField, { target: { value: updateUser.name } });
    fireEvent.change(emailField, { target: { value: updateUser.email } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedUpdateUser).toHaveBeenCalledWith(
        expect.objectContaining(updateUser),
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should be able to update the profile (name, email and password)', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const updateUser = {
      name: 'Jhon Tre',
      email: 'jhontre@example.com',
      oldPassword: '123456',
      password: '123123',
      passwordConfirmation: '123123',
    };

    mockedApi.onPut('/profile').replyOnce(200, updateUser);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const oldPasswordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação de senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameField, { target: { value: updateUser.name } });
    fireEvent.change(emailField, { target: { value: updateUser.email } });
    fireEvent.change(oldPasswordField, {
      target: { value: updateUser.oldPassword },
    });
    fireEvent.change(passwordField, { target: { value: updateUser.password } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: updateUser.passwordConfirmation },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedUpdateUser).toHaveBeenCalledWith(
        expect.objectContaining(updateUser),
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able to update the profile with invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const updateUser = {
      email: 'invalid-email',
    };

    const emailField = getByPlaceholderText('E-mail');

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(emailField, { target: { value: updateUser.email } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).not.toHaveBeenCalled();
    });
  });

  it('should not be able to update the profile with incorrect confirmation password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const updateUser = {
      name: 'Jhon Tre',
      email: 'jhontre@example.com',
      oldPassword: '123456',
      password: '123123',
      passwordConfirmation: 'invalid-confirmation',
    };

    mockedApi.onPut('/profile').replyOnce(200, updateUser);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const oldPasswordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação de senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameField, { target: { value: updateUser.name } });
    fireEvent.change(emailField, { target: { value: updateUser.email } });
    fireEvent.change(oldPasswordField, {
      target: { value: updateUser.oldPassword },
    });
    fireEvent.change(passwordField, { target: { value: updateUser.password } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: updateUser.passwordConfirmation },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).not.toHaveBeenCalled();
    });
  });

  it('should not be able to update the profile if has an error (status 400)', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const updateUser = {
      name: 'Jhon Tre',
      email: 'jhontre@example.com',
      oldPassword: 'incorrect-old-password',
      password: '123123',
      passwordConfirmation: '123123',
    };

    mockedApi.onPut('/profile').replyOnce(400);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const oldPasswordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação de senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameField, { target: { value: updateUser.name } });
    fireEvent.change(emailField, { target: { value: updateUser.email } });
    fireEvent.change(oldPasswordField, {
      target: { value: updateUser.oldPassword },
    });
    fireEvent.change(passwordField, { target: { value: updateUser.password } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: updateUser.passwordConfirmation },
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

  it('should be able to update the profile avatar', async () => {
    const { getByTestId } = render(<Profile />);

    mockedApi.onPatch('/users/avatar').replyOnce(200);

    const inputAvatarFile = getByTestId('input-avatar-file');

    fireEvent.change(inputAvatarFile, {
      target: {
        files: ['test-file'],
      },
    });

    await wait(() => {
      expect(mockedUpdateUser).toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });
});
