import React from 'react';
import { render, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
// import DayPicker from 'react-day-picker';

import Dashboard from '../../pages/Dashboard';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
const mockedUpdateUser = jest.fn();
// const mockedOnDayChange = jest.fn();
// const mockedOnMonthChange = jest.fn();

const apiMock = new MockAdapter(api);

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: {
        id: 123,
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
      },
      signOut: mockedUpdateUser,
    }),
  };
});

describe('Dashboard Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedUpdateUser.mockClear();
    // mockedOnDayChange.mockClear();
    // mockedOnMonthChange.mockClear();
    apiMock.reset();
  });

  it('should be able to list the appointments', async () => {
    const appointments = [
      {
        id: '372f6e83-59a3-4fa5-9b0c-bef286c8a325',
        date: '2020-06-25T11:00:00.000Z',
        user: {
          name: 'Jhon Doe',
          avatar_url:
            'http://localhost:3333/files/b7625718218b420d09d7-jhon.jpeg',
        },
      },
      {
        id: 'a5b69155-2cc9-4455-9836-4429a258b79c',
        date: '2020-06-25T12:00:00.000Z',
        user: {
          name: 'Jhon Tre',
          avatar_url:
            'http://localhost:3333/files/7b3eb7d4fa61d22afdb6-jhon.png',
        },
      },
      {
        id: 'd62927ab-3df7-4480-8eb3-9d4bbba06f55',
        date: '2020-06-25T17:00:00.000Z',
        user: {
          name: 'Jhon Qua',
          avatar_url:
            'http://localhost:3333/files/7b3eb7d4fa61d22afdb6-jhon.png',
        },
      },
    ];

    const monthAvailability = [
      {
        day: 1,
        available: false,
      },
      {
        day: 2,
        available: false,
      },
      {
        day: 3,
        available: false,
      },
      {
        day: 4,
        available: false,
      },
      {
        day: 5,
        available: false,
      },
      {
        day: 6,
        available: false,
      },
      {
        day: 7,
        available: false,
      },
      {
        day: 8,
        available: false,
      },
      {
        day: 9,
        available: false,
      },
      {
        day: 10,
        available: false,
      },
      {
        day: 11,
        available: false,
      },
      {
        day: 12,
        available: false,
      },
      {
        day: 13,
        available: false,
      },
      {
        day: 14,
        available: false,
      },
      {
        day: 15,
        available: false,
      },
      {
        day: 16,
        available: false,
      },
      {
        day: 17,
        available: false,
      },
      {
        day: 18,
        available: false,
      },
      {
        day: 19,
        available: false,
      },
      {
        day: 20,
        available: false,
      },
      {
        day: 21,
        available: false,
      },
      {
        day: 22,
        available: true,
      },
      {
        day: 23,
        available: true,
      },
      {
        day: 24,
        available: true,
      },
      {
        day: 25,
        available: true,
      },
      {
        day: 26,
        available: true,
      },
      {
        day: 27,
        available: true,
      },
      {
        day: 28,
        available: true,
      },
      {
        day: 29,
        available: true,
      },
      {
        day: 30,
        available: true,
      },
    ];

    apiMock.onGet('/appointments/me').reply(200, appointments);
    apiMock
      .onGet(`/providers/123/month-availability`)
      .reply(200, monthAvailability);

    const { getByTestId } = render(<Dashboard />);

    await wait(() => {
      expect(getByTestId('372f6e83-59a3-4fa5-9b0c-bef286c8a325')).toBeTruthy();
      expect(getByTestId('a5b69155-2cc9-4455-9836-4429a258b79c')).toBeTruthy();
      expect(getByTestId('d62927ab-3df7-4480-8eb3-9d4bbba06f55')).toBeTruthy();
    });
  });

  // it('should be able do change the date', async () => {
  //   const appointments = [
  //     {
  //       id: '372f6e83-59a3-4fa5-9b0c-bef286c8a325',
  //       date: '2020-06-25T11:00:00.000Z',
  //       user: {
  //         name: 'Jhon Doe',
  //         avatar_url:
  //           'http://localhost:3333/files/b7625718218b420d09d7-jhon.jpeg',
  //       },
  //     },
  //     {
  //       id: 'a5b69155-2cc9-4455-9836-4429a258b79c',
  //       date: '2020-06-25T12:00:00.000Z',
  //       user: {
  //         name: 'Jhon Tre',
  //         avatar_url:
  //           'http://localhost:3333/files/7b3eb7d4fa61d22afdb6-jhon.png',
  //       },
  //     },
  //     {
  //       id: 'd62927ab-3df7-4480-8eb3-9d4bbba06f55',
  //       date: '2020-06-25T17:00:00.000Z',
  //       user: {
  //         name: 'Jhon Qua',
  //         avatar_url:
  //           'http://localhost:3333/files/7b3eb7d4fa61d22afdb6-jhon.png',
  //       },
  //     },
  //   ];

  //   const monthAvailability = [
  //     {
  //       day: 1,
  //       available: false,
  //     },
  //     {
  //       day: 2,
  //       available: false,
  //     },
  //     {
  //       day: 3,
  //       available: false,
  //     },
  //     {
  //       day: 4,
  //       available: false,
  //     },
  //     {
  //       day: 5,
  //       available: false,
  //     },
  //     {
  //       day: 6,
  //       available: false,
  //     },
  //     {
  //       day: 7,
  //       available: false,
  //     },
  //     {
  //       day: 8,
  //       available: false,
  //     },
  //     {
  //       day: 9,
  //       available: false,
  //     },
  //     {
  //       day: 10,
  //       available: false,
  //     },
  //     {
  //       day: 11,
  //       available: false,
  //     },
  //     {
  //       day: 12,
  //       available: false,
  //     },
  //     {
  //       day: 13,
  //       available: false,
  //     },
  //     {
  //       day: 14,
  //       available: false,
  //     },
  //     {
  //       day: 15,
  //       available: false,
  //     },
  //     {
  //       day: 16,
  //       available: false,
  //     },
  //     {
  //       day: 17,
  //       available: false,
  //     },
  //     {
  //       day: 18,
  //       available: false,
  //     },
  //     {
  //       day: 19,
  //       available: false,
  //     },
  //     {
  //       day: 20,
  //       available: false,
  //     },
  //     {
  //       day: 21,
  //       available: false,
  //     },
  //     {
  //       day: 22,
  //       available: true,
  //     },
  //     {
  //       day: 23,
  //       available: true,
  //     },
  //     {
  //       day: 24,
  //       available: true,
  //     },
  //     {
  //       day: 25,
  //       available: true,
  //     },
  //     {
  //       day: 26,
  //       available: true,
  //     },
  //     {
  //       day: 27,
  //       available: true,
  //     },
  //     {
  //       day: 28,
  //       available: true,
  //     },
  //     {
  //       day: 29,
  //       available: true,
  //     },
  //     {
  //       day: 30,
  //       available: true,
  //     },
  //   ];

  //   apiMock.onGet('/appointments/me').reply(200, appointments);
  //   apiMock
  //     .onGet(`/providers/123/month-availability`)
  //     .reply(200, monthAvailability);

  //   const { getByText, getAllByRole } = render(
  //     <DayPicker
  //       onMonthChange={mockedOnMonthChange}
  //       onDayClick={mockedOnDayChange}
  //     />,
  //   );

  //   // const days = getByText('1');

  //   const [leftButton, rightButton] = getAllByRole('button');

  //   // console.log(days);

  //   // console.log(buttons[0]);

  //   fireEvent.click(rightButton, { day: new Date() });

  //   // fireEvent.click(days);
  //   // const dayPickers = component.find('DayPickerInput');
  //   // dayPickers.at(0).prop('onDayChange')('date1');
  //   // dayPickers.at(1).prop('onDayChange')('date2');

  //   // component.find('button').simulate('click');
  //   // expect(mockedOnDayChange).toHaveBeenCalled();

  //   // await wait(() => {
  //   // });
  // });
});
