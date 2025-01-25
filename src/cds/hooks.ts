import { Hono } from 'hono';

export const hooksRouter = new Hono();

hooksRouter.post('/:id', async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();

  console.log('Received CDS Hook Request:', {
    serviceId: id,
    body,
  });

  // const patient = body.prefetch.patient;
  //   const conditions = body.prefetch.conditions;

  //   const firstName = patient.name[0].given[0]
  //   const secondName = patient.name[0].family

  if (id === '0001')
  {

  }
  // Example response with a static card
  const response = {
    cards: [
      {
          summary: `Hello, you have Conditions`,
          indicator: 'warning',
          source: {
              label: 'my service!'
          },
          links: [
              {
                  label: 'google it',
                  url: 'https://google.com',
                  type: 'absolute' 
              },
              {
                  label: 'my app',
                  url: 'http://localhost:4434/launch',
                  type: 'smart' 
              }
          ]
      }
  ],
  };

  return c.json(response);
});