# Verktoykassen BETA

Nettside for Verktøykassen: Designsystemet og God praksis.

## Kom i gang

### Nettside (localhost:3000)

```
yarn install
yarn dev
```

For å se preview innhold kan man legge til `preview` i URL-en´.
Eks:

`/preview/designsystem/side/button´

### Sanity (localhost:3333)

> Note: Må være developer i https://verktoykasse.sanity.studio, Ta kontakt med Ken Aleksander Johansen nevnt under "Henvendelser" om det trengs.

```
yarn install
yarn sanity
```

### .env

Blir brukt fire keys i .env under `./website`, men ingen av dem trengs for å teste lokalt

- SANITY_WRITE_KEY: Secret for å sende feedback dokumenter til sanity (Feedback-komponent fungerer ikke lokalt uten denne)
- ALGOLIA_ADMIN: Secret for å oppdatere records i søkemotoren. Gjøres automatisk i prod ved hjelp av Sanity-webhook hver gang et dokument endres.
- ALGOLIA_ID: Søkemotor Index-id for å redigere riktig Index. ---||---
- HOOK_SECRET: Secret som sanity-webhook bruker for å verifisere at index-oppdatering blir sendt fra riktig sender. Trengs bare for å oppdatere index-records lokalt.
- TRELLO_TOKEN: Sender feedback til et egent trello-board.

## Henvendelser

Tar gjerne imot issues, men spørsmål og kontakt kan rettes til Ken Aleksander Johansen på slack eller mail: `ken.aleksander.johansen@nav.no`
