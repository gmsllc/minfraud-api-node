import { ArgumentError } from '../errors';
import Device from './device';
import Event from './event';
import Transaction from './transaction';

describe('Transaction()', () => {
  it('throws an error if `device` is not defined', () => {
    expect(() => {
      const test = new Transaction({
        // @ts-ignore
        device: undefined,
      });
    }).toThrowError(ArgumentError);
  });

  it('throws an error if `device` is not an instance of Device', () => {
    expect(() => {
      const test = new Transaction({
        device: {
          ipAddress: '123',
        },
      });
    }).toThrowError(ArgumentError);
  });

  it('constructs', () => {
    expect(() => {
      const test = new Transaction({
        device: new Device({
          ipAddress: '1.1.1.1',
        }),
      });
    }).not.toThrow();
  });

  describe('toString()', () => {
    it('it handles mandatory device field', () => {
      const test = new Transaction({
        device: new Device({
          ipAddress: '1.1.1.1',
          sessionAge: 100,
        }),
      });

      expect(test.toString()).toEqual(
        '{"device":{"ip_address":"1.1.1.1","session_age":100}}'
      );
    });

    it('it handles optional event field', () => {
      const mockDate = '2019-05-29T21:33:35.565Z';
      const test = new Transaction({
        device: new Device({
          ipAddress: '1.1.1.1',
          sessionAge: 100,
        }),
        event: new Event({
          time: new Date(mockDate),
          transactionId: 'foobar',
        }),
      });

      expect(test.toString()).toEqual(
        `
        {
          "device":{"ip_address":"1.1.1.1","session_age":100}
          ,"event":{"time":"${mockDate}","transaction_id":"foobar"}
        }
      `.replace(/\n|\s+/g, '')
      );
    });
  });
});
