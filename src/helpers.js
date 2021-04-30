import { store as notificationsStore } from 'react-notifications-component';
import { NOTIFICATION_CONFIG as notificationConfig } from '~/constants/constants';

export const showNotification = options => {
  notificationsStore.addNotification({ ...notificationConfig, ...options });
};
