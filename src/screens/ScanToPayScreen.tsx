import React from 'react';
import { Animated, Dimensions, Share, ShareAction, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeReadEvent } from 'react-native-camera';
import { Avatar, Caption, Card, Title } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/store';
import { TestScreenParams } from './TestScanResult';
import { ScanParams, ToSanwoPayScreenProps } from './ToSanwoPayScreen';
import QRCode from 'react-native-qrcode-svg';
import ShareSvg from '../icons/share';
import DownloadSvg from '../icons/download';

/**
 * References:
 * https://medium.com/nerd-for-tech/qr-code-scanner-app-in-react-native-3a4e574d052d
 * https://react-native-camera.github.io/react-native-camera/docs/rncamera
 * https://www.fullstacklabs.co/blog/react-native-camera
 * https://www.npmjs.com/package/react-native-camera
 * https://www.npmjs.com/package/react-native-qrcode-scanner
 * https://github.com/zoontek/react-native-permissions#setup
 * 
 * @param param0 
 * @returns 
 */
const ScanToPayScreen: React.FC<ToSanwoPayScreenProps> = ({ navigation })=>{

    // Ref
    const swiper = React.useRef<Swiper>(null);
    let svg: any = null;

    // Redux
    const { user } = useSelector((state: RootState)=> state.auth);

    // State
    const pan = React.useState(new Animated.Value(0))[0];

    /** Handling slide to next page */
    const slideToScan = ()=>{
        swiper.current?.scrollTo(0)
    }

    /** Handling slide to previous page */
    const slideToCode = ()=>{
        swiper.current?.scrollTo(1);
    }

    // Interpolations
    const colorInterpolation =  pan.interpolate({
        inputRange: [0, Dimensions.get('window').width / 2],
        outputRange:["#14142B" , "#0122AE"]
    })
    const colorInterpolation2 =  pan.interpolate({
        inputRange: [0, Dimensions.get('window').width / 2],
        outputRange:["#0122AE", "#14142B"]
    })

    const handleSuccess = (event: BarCodeReadEvent)=>{
        let testParams: TestScreenParams = {
            value: event.data
        }
        let scanParams: ScanParams = {
            fromScan: true,
            value: event.data
        }
        navigation?.navigate('ToSanwopay', scanParams);
    }

    // QR Sharing handler
    const shareQR = ()=>{
        svg?.toDataURL((data: any) => {
          const shareImageBase64 = {
            title: "Share QR",
            message: "Sanwo Pay - QR Code",
            url: `data:image/png;base64,${data}`
          };
          Share.share(
              shareImageBase64,
            {
                dialogTitle: 'Sanwo Pay - QR Code'
            }
            ).then((result: ShareAction)=>{

          })
          .catch((error)=>{
              console.log(error);
          })
        });
    }

    // Tab
    const tabView = (
        <React.Fragment>
            <View style={styles.tabBar} >

                {/** Scan */}
                <TouchableOpacity activeOpacity={0.5} style={styles.tabContent}
                    onPress={slideToScan}
                >
                    <Animated.Text style={[styles.tabText, {
                        color: colorInterpolation2
                    }]}>
                        Scan
                    </Animated.Text>
                </TouchableOpacity>

                {/** Code */}
                <TouchableOpacity activeOpacity={0.5} style={styles.tabContent}
                    onPress={slideToCode}
                >
                    <Animated.Text style={[styles.tabText, {
                        color: colorInterpolation
                    }]}>
                        My Code
                    </Animated.Text>
                </TouchableOpacity>

            </View>
            <Animated.View style={[styles.indicator, { transform:[{ translateX: Animated.divide(pan, 2) }] }]}></Animated.View>
        </React.Fragment>
    )

    const QRCodeDisplay = (
        <View style={styles.codeDisplay}>
            <Card elevation={1} style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    {/** Avatar Display */}
                    <View>
                        <Avatar.Image
                            source={{
                                uri: user?.profile_photo
                            }}
                            size={70}
                            style={{
                                alignSelf: 'center',
                                marginTop: -50
                            }}
                        />
                        <Title style={styles.avatarTitle}>
                            {`${user?.first_name || ''} ${user?.middle_name || ''} ${user?.last_name || ''}`}
                        </Title>
                        <Text style={styles.avatarCaption}>
                            {user?.user_type.toUpperCase() || ''}
                        </Text>
                    </View>

                    {/** QR Code Display */}
                    <View style={styles.qr}>
                        <QRCode
                            value={user?.mobile}
                            size={160}
                            getRef={(ref)=> (svg = ref)}
                        />
                    </View>
                </Card.Content>
            </Card>

            {/** Footer */}
            <View style={styles.footer}>
                <TouchableOpacity activeOpacity={0.5} style={styles.footerSpan} onPress={shareQR}>
                    <ShareSvg/>
                    <Text style={styles.footerText}>Share my code</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity activeOpacity={0.5} style={styles.footerSpan}>
                    <DownloadSvg/>
                    <Text style={styles.footerText}>Save to gallery</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )

    const scannerView = (
        <QRCodeScanner
            //reactivate={true}
            showMarker={true}
            topContent={
                <View style={styles.topContent}>
                    <Text style={styles.topText} >
                        Scan the QR code for customer information
                    </Text>
                </View>
            }
            onRead={handleSuccess}
        />
    )

    return(
        <View style={styles.container}>
            { tabView }
            <Swiper showsButtons={false} showsPagination={false} loop={false}
                ref={swiper}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: { x: pan },
                        },
                      },
                    ],
                    { useNativeDriver: false }
                  )}
            >
                { scannerView }
                { QRCodeDisplay }
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar:{
        flexDirection: 'row',
    },

    indicator:{
        borderBottomWidth: 2,
        borderBottomColor: '#0122AE',
        width: Dimensions.get('window').width / 2
    },

    tabContent:{
        paddingHorizontal: 15,
        paddingVertical: '4%',
        flex: 1,
    },

    tabText:{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 32,
        letterSpacing: 0.75
    },

    codeDisplay:{
        paddingTop: '15%',
        //paddingHorizontal: 15,
        flexDirection: 'column',
        alignItems: 'center',
    },

    card:{
        width: '85%',
    },

    cardContent:{
        position: 'relative'
    },

    avatar:{
        position: 'absolute'
    },

    avatarTitle:{
        textAlign: 'center',
        fontSize: 20,
        letterSpacing: 0.75,
        lineHeight: 28,
        marginVertical: 8,
    },

    avatarCaption:{
        textAlign: 'center',
    },

    qr:{
        alignSelf: 'center',
        paddingVertical: '10%'
    },

    footer:{
        marginTop: 10
    },

    footerSpan:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },

    footerText:{
        fontSize: 16,
        letterSpacing: 0.75,
        lineHeight: 28,
        marginLeft: 10,
    },

    container:{
        flex: 1,
        backgroundColor: '#FCFCFC',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    topContent:{
        flex: 1,
        paddingTop: 10,
    },

    topText:{
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 28,
        letterSpacing: 0.75
    },
})

export default ScanToPayScreen;