import React from 'react';
import { Alert, Platform, Share, Vibration, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/store';
import { NotificationBellProps } from './NotificationBell';

const ShareButton: React.FC<NotificationBellProps> = ()=>{

    // Redux
    const { receiptPath } = useSelector((state: RootState)=> state.share);

    // Error alert
    const alertError = (message: string = 'An unknown error occurred')=>{
        Vibration.vibrate();
        Alert.alert(
            'Error',
            message,
            [
                { text: 'OK' }
            ]
        );
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
            url: `file://${receiptPath}` || '',
            title: 'Sanwo Pay - Transaction Receipt',
          },
          {
              dialogTitle: 'Sanwo Pay - Transaction Receipt'
          }
          );
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alertError('An error occured while sharing')
        }
    };
        

    return(
        <TouchableOpacity activeOpacity={0.5} onPress={onShare}>
            <Ionicon name='share-outline'
                color={Platform.OS === 'ios' ? '#3683f6' : 'black'}
                size={25}
            />
        </TouchableOpacity>
    )
}

export default ShareButton;