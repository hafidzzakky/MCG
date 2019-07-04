import DeviceInfo from 'react-native-device-info';

export const infoDevice = {
    'deviceModel'   : DeviceInfo.getModel(),
    'deviceVersion' : DeviceInfo.getSystemVersion(),
    'UUID'          : DeviceInfo.getUniqueID()
}