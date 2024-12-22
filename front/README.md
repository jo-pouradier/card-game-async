# Front

## Chat

The chat UI is already created, the only issue is notifing the user when a new message is received and storing the messages outside the component.
With the current app architecture, we'll store the messages in the redux store. And listend the socket event globally in the app
to update the store.
Thus we'll be able to add a little notif to the user when a new message is received.
With the message property `isRead` we can also know if the user has read the message or not.

TODO:
- [x] Create the redux store
- [x] Listen the socket event globally
- [x] Add a notif (via notifications) to the user when a new message is received
- [ ] Add a `isRead` property to the message
- [ ] Add a notif (via a little `(n)` on the chat) to the user when a new message is received, until the message is read
- [ ] Listen connected user globally in the app
- [ ] Update component `ConnectedUserList` to display the connected user via the store

## React Router Type safe

we need to follow the doc: https://reactrouter.com/how-to/route-module-type-safety
and install `npm i @react-router/dev` but it not yet available for vite 6.
