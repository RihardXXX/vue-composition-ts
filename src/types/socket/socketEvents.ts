// Интерфейс и объект для вызова событий от клиента серверу
interface SocketEventsClient {
    updateAllRooms: string;
    updateMyRooms: string;
    initialRooms: string;
    createNewMessage: string;
    joinedRooms: string;
    exitRoom: string;
    createNewRoom: string;
    deleteMyRoom: string;
}

const socketEventsClient: SocketEventsClient = {
    updateAllRooms: 'updateAllRooms',
    updateMyRooms: 'updateMyRooms',
    initialRooms: 'initialRooms',
    createNewMessage: 'createNewMessage',
    joinedRooms: 'joinedRooms',
    exitRoom: 'exitRoom',
    createNewRoom: 'createNewRoom',
    deleteMyRoom: 'deleteMyRoom',
};

export { socketEventsClient };
