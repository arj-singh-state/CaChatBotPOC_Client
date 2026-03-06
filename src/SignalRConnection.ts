import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7130/chatHub')
    .withAutomaticReconnect()
    .build();

export default connection;

