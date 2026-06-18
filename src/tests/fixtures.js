/**
 * A small sample response that looks like the real Aertrip API data.
 * It includes two vendor groups, a few flights, and the lookup data
 * needed for testing the normalizer and Redux slice.
 */
export const mockApiPayload = {
  success: true,
  data: {
    flights: [
      {
        vcode: 'tp',
        results: {
          aldet: { UK: 'Vistara', AI: 'Air India' },
          alMaster: {
            UK: { name: 'Vistara', bgcolor: '#601848' },
            AI: { name: 'Air India', bgcolor: '#E9522A' },
          },
          apdet: {
            BOM: { c: 'Mumbai' },
            CCU: { c: 'Kolkata' },
          },
          j: [
            {
              id: '0',
              al: ['UK'],
              ap: ['BOM', 'CCU'],
              dt: '07:05',
              at: '09:45',
              dd: '2021-10-17',
              ad: '2021-10-17',
              tt: [9600],
              stp: '0',
              farepr: 4564,
            },
            {
              id: '1',
              al: ['AI'],
              ap: ['BOM', 'CCU'],
              dt: '20:30',
              at: '23:15',
              dd: '2021-10-17',
              ad: '2021-10-17',
              tt: [9900],
              stp: '0',
              farepr: 5687,
            },
          ],
        },
      },
      {
        vcode: '6e',
        results: {
          aldet: { '6E': 'Indigo' },
          alMaster: { '6E': { name: 'Indigo', bgcolor: '#001b94' } },
          apdet: { BOM: { c: 'Mumbai' }, CCU: { c: 'Kolkata' } },
          j: [
            {
              id: '0',
              al: ['6E'],
              ap: ['BOM', 'CCU'],
              dt: '22:10',
              at: '00:55',
              dd: '2021-10-17',
              ad: '2021-10-18', // arrives next day
              tt: [9900],
              stp: '0',
              farepr: 3855,
            },
          ],
        },
      },
    ],
  },
};
