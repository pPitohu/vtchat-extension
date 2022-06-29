import router from '@/router';

export const socketEmit = (event: any, data: any) =>
  router.app.$socket.client.emit(event, data);
