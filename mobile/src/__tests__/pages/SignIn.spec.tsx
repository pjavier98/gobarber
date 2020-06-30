import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import { Alert } from 'react-native';

import SignIn from '../../pages/SignIn';

const mockedSignIn = jest.fn();
const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
    }),
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedSignIn.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholder, getByTestId } = render(<SignIn />);

    const emailField = getByPlaceholder('E-mail');
    const passwordField = getByPlaceholder('Senha');
    const buttonElement = getByTestId('submit-button');

    fireEvent.changeText(emailField, 'jhondoe@example.com');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalled();
    });
  });

  it('should not be able to sign in with invalid credentialsin', async () => {
    const { getByPlaceholder, getByTestId } = render(<SignIn />);

    const AlertSpy = jest.spyOn(Alert, 'alert');

    const emailField = getByPlaceholder('E-mail');
    const passwordField = getByPlaceholder('Senha');
    const buttonElement = getByTestId('submit-button');

    fireEvent.changeText(emailField, 'invalid-email');
    fireEvent.changeText(passwordField, '');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedSignIn).not.toHaveBeenCalled();
      expect(AlertSpy).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholder, getByTestId } = render(<SignIn />);

    const AlertSpy = jest.spyOn(Alert, 'alert');

    const emailField = getByPlaceholder('E-mail');
    const passwordField = getByPlaceholder('Senha');
    const buttonElement = getByTestId('submit-button');

    fireEvent.changeText(emailField, 'jhondoe@example.com');
    fireEvent.changeText(passwordField, 'invalid-password');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(AlertSpy).toHaveBeenCalled();
    });
  });

  it('should be able to redirect to Sign Up page', () => {
    const { getByTestId } = render(<SignIn />);

    const createAccountElement = getByTestId('signup-button');

    fireEvent.press(createAccountElement);

    expect(mockedNavigation).toHaveBeenCalledWith('SignUp');
  });
});
