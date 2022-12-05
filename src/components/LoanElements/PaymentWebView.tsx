import React from 'react';
import { Alert, Dimensions, Modal, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import LoadingOverlay from './LoadingOverlay';

const windowHeight = Dimensions.get('window').height;
const borderRadiusDimension = 24 / 896;

export interface PaymemtWebViewProps{
    uri?: string;
    onPaymentSuccess?: (reference: string, transaction_id: string)=> void;
    onPaymentFailed?: (reference: string)=> void;
    onError?: (err: any)=> void;
    open?: boolean;
    onClose?: ()=> void;
}

const PaymentWebView: React.FC<PaymemtWebViewProps> = ({
    uri = '', onPaymentSuccess, onError, open = false, onClose, onPaymentFailed
})=>{

    const parseQueryStringToJson = (qstring: string): { [index: string]: any }=>{
        // Sample of qstring:  abc=foo&def=%5Basf%5D&xyz=5
        let json: { [index:string]: any } = {};
        let qstringArray: string[] = qstring.split('&');
        for (let i = 0; i < qstringArray.length; i++) {
            const element = qstringArray[i];
            let pairs: string[] = element.split('=');
            json[pairs[0]] = pairs[1];
        }
        return json;
    }

    interface ResponseQueryParams{
        status?: string;
        tx_ref?: string;
        transaction_id?: string;
    }
    const handleNavigationStateChange = (state: WebViewNavigation)=>{
        console.log(state.url);
        let url = state.url;
        let sliceIndex = url.indexOf('?');
        let queryString = url.slice(sliceIndex + 1);
        console.log(queryString);
        let queryJson: ResponseQueryParams = parseQueryStringToJson(queryString);
        console.log(JSON.stringify(queryJson));
        if (queryJson.status === 'successful' && queryJson.tx_ref && queryJson.transaction_id) {
            onPaymentSuccess && onPaymentSuccess(queryJson.tx_ref, queryJson.transaction_id)
        }
        if (queryJson.status === 'cancelled' && queryJson.tx_ref) {
            onClose && onClose();
        }
        if (queryJson.status === 'failed' && queryJson.tx_ref) {
            onPaymentFailed && onPaymentFailed(queryJson.tx_ref)
        }
    }

    const handleAbort = (confirmed: boolean = false) => {
        if (!confirmed) {
          Alert.alert('', 'Are you sure you want to cancel this payment?', [
            {text: 'No'},
            {
              text: 'Yes, Cancel',
              style: 'destructive',
              onPress: () => handleAbort(true),
            },
          ]);
          return;
        }
        onClose && onClose();
      };

    // Elements
    const backdrop = (
        <TouchableWithoutFeedback testID='checkout-backdrop' onPress={()=> handleAbort()}>
            <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
    )


    return(
        <Modal
            animationType="slide"
            visible={open}
            transparent
        >
            { backdrop }
            <View style={styles.webviewContainter}>
                <WebView
                    source={{ uri }}
                    originWhitelist={['https://*']}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    javaScriptEnabled = {true}
                    renderLoading={()=> <LoadingOverlay visible/>}
                    renderError={()=> <Text>Error</Text>}
                    //domStorageEnabled = {true}
                    onNavigationStateChange={handleNavigationStateChange}
                />
            </View>
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    webviewContainter:{
        top: Platform.select({ios: 96, android: 64}), // status bar height aware for ios
        flex: 1,
        backgroundColor: '#efefef',
        paddingBottom: Platform.select({ios: 96, android: 64}), // status bar height aware for ios
        overflow: 'hidden',
        borderTopLeftRadius: windowHeight * borderRadiusDimension,
        borderTopRightRadius: windowHeight * borderRadiusDimension,
    },

    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})


export default PaymentWebView;