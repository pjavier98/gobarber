import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day from a provider', async () => {
    const nextYear = new Date().getFullYear() + 1;

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(nextYear, 4, 20, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(nextYear, 4, 20, 11, 0, 0),
    });

    const availability = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: nextYear,
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });

  it('should be able to save the appointments on a specific day from a provider in the cache', async () => {
    const nextYear = new Date().getFullYear() + 1;

    const appointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(nextYear, 4, 20, 8, 0, 0),
    });

    await fakeCacheProvider.save('appointment', appointment);

    const availability = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: nextYear,
    });

    expect(availability[0].id).toBe(appointment.id);
  });

  it('should be able to recover the appointments on a specific day from a provider in the cache', async () => {
    const nextYear = new Date().getFullYear() + 1;

    const appointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(nextYear, 4, 20, 8, 0, 0),
    });

    await fakeCacheProvider.save('appointment', appointment);

    const findAllInDayFromProvider = jest.spyOn(
      fakeAppointmentsRepository,
      'findAllInDayFromProvider',
    );

    await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: nextYear,
    });

    await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: nextYear,
    });

    expect(findAllInDayFromProvider).toBeCalledTimes(1);
  });
});
