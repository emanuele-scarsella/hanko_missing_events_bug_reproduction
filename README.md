# Bug reproduction for HANKO Auth server

This project is a minimal reproduction for a bug in HANKO Auth server, it shows that contrary to what [the hanko documentation claims](https://docs.hanko.io/guides/webhooks/introduction#event-types), the webhook events are not sent on email creation nor on user updates (on username change for example).

### Steps to reproduce:

1. Setup the repository:

```
git clone https://github.com/emanuelescarsella/hanko_missing_events_bug_reproduction.git
cd hanko_missing_events_bug_reproduction
npm install
```

2. Run the containers and the express server:

```
docker-compose up -d
npm run start
```

3. Open the browser and go to http://localhost:9000 to test several user interactions and visit http://localhost:5000 to validate user emails.

4. Check the logs of the express server to see what events where received.

### Expected behavior:

The express server should receive the following events:

```
┌───────────────────┬─────────────────────────────┬───────────────┐
│ (iteration index) │ Event                       │ TimesReceived │
├───────────────────┼─────────────────────────────┼───────────────┤
│ 0                 │ 'user.delete'               │ #             │
│ 1                 │ 'email.send'                │ #             │
│ 2                 │ 'user.create'               │ #             │
│ 3                 │ 'user.update'               │ #             │
│ 4                 │ 'user.update.email.create'  │ #             │
│ 5                 │ 'user.update.email.primary' │ #             │
│ 6                 │ 'user.update.email.delete'  │ #             │
└───────────────────┴─────────────────────────────┴───────────────┘
```

### Actual behavior:

The express server does not receive any event on email creation or on username change:

```
┌───────────────────┬─────────────────────────────┬───────────────┐
│ (iteration index) │ Event                       │ TimesReceived │
├───────────────────┼─────────────────────────────┼───────────────┤
│ 0                 │ 'user.delete'               │ #             │
│ 1                 │ 'email.send'                │ #             │
│ 2                 │ 'user.create'               │ #             │
│ 3                 │ 'user.update.email.primary' │ #             │
│ 4                 │ 'user.update.email.delete'  │ #             │
└───────────────────┴─────────────────────────────┴───────────────┘
```
