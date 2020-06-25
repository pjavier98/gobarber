import React from 'react';
import { render, wait, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import Dashboard from '../../pages/Dashboard';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
const mockedUpdateUser = jest.fn();

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
    apiMock.reset();
  });

  it('should be able to list the appointments', async () => {
    // const appointments = [
    //   {
    //     id: '372f6e83-59a3-4fa5-9b0c-bef286c8a325',
    //     date: '2020-06-25T11:00:00.000Z',
    //     user: {
    //       name: 'Jhon Doe',
    //       avatar_url:
    //         'http://localhost:3333/files/b7625718218b420d09d7-jhon.jpeg',
    //     },
    //   },
    //   {
    //     id: 'a5b69155-2cc9-4455-9836-4429a258b79c',
    //     date: '2020-06-25T12:00:00.000Z',
    //     user: {
    //       name: 'Jhon Tre',
    //       avatar_url:
    //         'http://localhost:3333/files/7b3eb7d4fa61d22afdb6-jhon.png',
    //     },
    //   },
    //   {
    //     id: 'd62927ab-3df7-4480-8eb3-9d4bbba06f55',
    //     date: '2020-06-25T14:00:00.000Z',
    //     user: {
    //       name: 'Jhon Qua',
    //       avatar_url:
    //         'http://localhost:3333/files/7b3eb7d4fa61d22afdb6-jhon.png',
    //     },
    //   },
    // ];
    // const monthAvailability = [
    //   {
    //     day: 1,
    //     available: false,
    //   },
    //   {
    //     day: 2,
    //     available: false,
    //   },
    //   {
    //     day: 3,
    //     available: false,
    //   },
    //   {
    //     day: 4,
    //     available: false,
    //   },
    //   {
    //     day: 5,
    //     available: false,
    //   },
    //   {
    //     day: 6,
    //     available: false,
    //   },
    //   {
    //     day: 7,
    //     available: false,
    //   },
    //   {
    //     day: 8,
    //     available: false,
    //   },
    //   {
    //     day: 9,
    //     available: false,
    //   },
    //   {
    //     day: 10,
    //     available: false,
    //   },
    //   {
    //     day: 11,
    //     available: false,
    //   },
    //   {
    //     day: 12,
    //     available: false,
    //   },
    //   {
    //     day: 13,
    //     available: false,
    //   },
    //   {
    //     day: 14,
    //     available: false,
    //   },
    //   {
    //     day: 15,
    //     available: false,
    //   },
    //   {
    //     day: 16,
    //     available: false,
    //   },
    //   {
    //     day: 17,
    //     available: false,
    //   },
    //   {
    //     day: 18,
    //     available: false,
    //   },
    //   {
    //     day: 19,
    //     available: false,
    //   },
    //   {
    //     day: 20,
    //     available: false,
    //   },
    //   {
    //     day: 21,
    //     available: false,
    //   },
    //   {
    //     day: 22,
    //     available: true,
    //   },
    //   {
    //     day: 23,
    //     available: true,
    //   },
    //   {
    //     day: 24,
    //     available: true,
    //   },
    //   {
    //     day: 25,
    //     available: true,
    //   },
    //   {
    //     day: 26,
    //     available: true,
    //   },
    //   {
    //     day: 27,
    //     available: true,
    //   },
    //   {
    //     day: 28,
    //     available: true,
    //   },
    //   {
    //     day: 29,
    //     available: true,
    //   },
    //   {
    //     day: 30,
    //     available: true,
    //   },
    // ];
    // apiMock.onGet('/appointments/me').reply(200, [
    //   {
    //     id: '372f6e83-59a3-4fa5-9b0c-bef286c8a325',
    //     date: '2020-06-25T11:00:00.000Z',
    //     user: {
    //       name: 'Jhon Doe',
    //       avatar_url:
    //         'http://localhost:3333/files/b7625718218b420d09d7-jhon.jpeg',
    //     },
    //   },
    // ]);
    // // apiMock
    // //   .onGet(`/providers/${user.id}/month-availability`, {
    // //     params: {
    // //       month: 6,
    // //       year: 2020,
    // //     },
    // //   })
    // //   .reply(200);
    // const { getByTestId } = render(<Dashboard />);
    // const flushAllPromises = () => {
    //   return new Promise(resolve => setImmediate(resolve));
    // };
    // await flushAllPromises();
    // expect(getByTestId('372f6e83-59a3-4fa5-9b0c-bef286c8a325')).toBeTruthy();
    // debug();
    // const first_appointment = getByTestId(appointments[0].id);
    // const second_appointment = getByTestId(appointments[1].id);
    // const third_appointment = getByTestId(appointments[2].id);
    // expect(first_appointment).toBe(
    //   expect.objectContaining({
    //     ...appointments[0],
    //   }),
    // );
    // expect(second_appointment).toBe(
    //   expect.objectContaining({
    //     ...appointments[1],
    //   }),
    // );
    // expect(third_appointment).toBe(
    //   expect.objectContaining({
    //     ...appointments[2],
    //   }),
    // );
  });
});
