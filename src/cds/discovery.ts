import { Hono } from 'hono';

export const discoveryRouter = new Hono();

discoveryRouter.get('/', (c) => {
    const services = [
        {
            hook: 'patient-view',
            id: '0001',
            description: 'An example CDS Service that returns a static set of cards',
            prefetch: {
                patient: "Patient/{{context.patientId}}",
                conditions: "Condition?patient={{context.patientId}}&recorded-date=gt{{today() - 10 years}}"
            },
        },
    ];

    return c.json({ services });
});