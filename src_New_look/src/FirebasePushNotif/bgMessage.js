import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';
import type { Notification, NotificationOpen} from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    // handle your message
    console.log("Message=>",message);
    const notification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
    }).setNotificationId(message.messageId)
            .setTitle(message.data.title)
            .setBody(message.data.body)
            .setData(message.data)
            .android.setColor(message.data.color)
            .android.setChannelId('test-channel')
            .android.setPriority(firebase.notifications.Android.Priority.High)
            // .android.setSmallIcon('ic_child_friendly')
            if(message.data.bigPicture != ''){
            notification.android.setBigPicture(message.data.bigPicture)
            }
            if(message.data.Text != ''){
            notification.android.setBigText(message.data.Text,message.data.title, message.data.summary)
            }
            if(message.data.usingAction == 'true'){
            console.log(message.data.usingAction);
            const action = new firebase.notifications.Android.Action('test','default','Like');
            const remoteInput = new firebase.notifications.Android.RemoteInput('inputText').setLabel('Type Your Comment');

            action.addRemoteInput(remoteInput);
            notification.android.addAction(action);
            }
    firebase.notifications().displayNotification(notification).catch(err => alert("Error in Background"));
    return Promise.resolve();
} 