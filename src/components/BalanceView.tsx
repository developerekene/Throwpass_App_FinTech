import React from 'react';
import { StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent, Pressable, StyleProp, TextStyle } from 'react-native';
import Swiper, { SwiperProps } from 'react-native-swiper';
import { Saving } from '../types/saving';
import { formatAmount } from '../utils/GeneralUtils';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/slices/store';

const RightIcon =( 
    <AntDesignIcon 
        name="right" 
        size={14}
        color="#6E7191"
    />
);

const LeftIcon =( 
    <AntDesignIcon 
        name="left" 
        size={14}
        color="#6E7191"
    />
)

export interface BalanceViewProps{
    savings?: Saving[];
    showTopUp?: boolean;
    onAddBalance?: (arg?: any) => void;
}

export const sampleSavings: Saving[] = [
    {
        id: 1,
        customerID: 56777,
        saving_type: 'Personal Savings',
        amount: 50000,
        customerName: 'John Eze'
    },
    {
        id: 2,
        customerID: 56778,
        saving_type: 'Group Savings',
        amount: 25000,
        customerName: 'John Eze'
    },
    {
        id: 3,
        customerID: 56779,
        saving_type: 'Installment Savings',
        amount: 32500,
        customerName: 'John Eze'
    }
]

interface BalanceDisplayProps{
    amount?: number | string;
    saving_type?: string;
}
export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
    amount = 0.00, saving_type = 'Sanwo Balance',
})=>{

    return(
        <View style={styles.balanceContent}>
            <View style={styles.displayContainer}>
                <Text style={styles.amountText}>
                    {`₦${formatAmount(amount.toString())}`}
                </Text>
                <Text style={styles.savingsType}>
                    {saving_type}
                </Text>
            </View>
        </View>
    )
}

const BalanceView: React.FC<BalanceViewProps> = ({ 
    onAddBalance, showTopUp = false 
})=>{

    // Redux
    const { user, savings } = useSelector((state: RootState)=> state.auth);
    
    const swiper = React.useRef<Swiper>(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [acctIndex, setAccountIndex] = React.useState(0);

    // Total Savings
    let totalSavings: any = [];
    if (user) {
       totalSavings = [user.wallet_amount] 
    }
    if (savings) {
        totalSavings = [...totalSavings, ...savings]
    }

    /** Handling slide to next page */
    const slideToNext = ()=>{
        swiper.current?.scrollBy(1);
    }

    /** Handling slide to previous page */
    const slideToPrev = ()=>{
        swiper.current?.scrollBy(-1);
    }

    const topUpButton = (
        <Pressable onPress={onAddBalance}>
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <View style={[styles.topUpBtn, style]}>
                        <Text style={styles.topUpText}>Top Up</Text>
                    </View>
                )
                
            }}
        </Pressable>
    )

    const addButton = (
        <Pressable onPress={onAddBalance}>
            {({ pressed }) => {
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <View style={[styles.btnContainer, style]}>
                        <View style={styles.overlay}></View>
                        <AntDesignIcon name="plus" color="#0122AE"
                            style={styles.addBtn}
                        />
                    </View>
                )
                
            }}
        </Pressable>
    )
       

    const scrollDisplay = (
        <View style={styles.scrollDisplay}>
            {/** Left button */}
            {/*<TouchableOpacity onPress={slideToPrev}>
                {LeftIcon}
                </TouchableOpacity>*/}
            
            {/** Count display */}
            <View>
                <Text style={styles.countText}>
                    {`Account ${activeStep + 1} of ${totalSavings?.length}`}
                </Text>
            </View>

            {/** Right button */}
            {/*<TouchableOpacity onPress={slideToNext}>
                {RightIcon}
            </TouchableOpacity>*/}
        </View>
    )

    if (!savings && user) {
        return(
            <BalanceDisplay amount={user.wallet_amount}/>
        )
    }

    if (!savings) {
        return(
            <BalanceDisplay/>
        )
    }
    

    return (
      <View style={styles.main}>
            { totalSavings.length > 0 && scrollDisplay }
            {
                showTopUp ?
                <View style={styles.balanceContent}>
                    <Swiper ref={swiper} style={styles.swiper} showsButtons={false}
                        height={60} 
                        showsPagination={false} loop={false}
                        onIndexChanged={(step)=>{ 
                            setActiveStep(step);
                        }}
                        index={activeStep}
                    >
                        {
                            user && 
                            <BalanceDisplay amount={user.wallet_amount}/>
                        }
                        {
                            savings?.map((item, index)=>(
                                <BalanceDisplay amount={item.amount} saving_type={item.saving_type} 
                                    key={`${index}BD`}
                                /> 
                            ))
                        }
                    </Swiper>
                    {  topUpButton }
                </View>
                :
                <Swiper ref={swiper} style={styles.swiper} showsButtons={false}
                    height={60} 
                    showsPagination={false} loop={false}
                    onIndexChanged={(step)=>{ 
                        setActiveStep(step);
                    }}
                    index={activeStep}
                >
                    {
                        user && 
                        <BalanceDisplay amount={user.wallet_amount}/>
                    }
                    {
                        savings?.map((item, index)=>(
                            <BalanceDisplay amount={item.amount} saving_type={item.saving_type} 
                                key={`${index}BD`}
                            /> 
                        ))
                    }
                </Swiper>
            }
      </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex: 0.22,
    },

    displayContainer:{
        paddingHorizontal: 15
    },

    amountText:{
        fontWeight: '500',
        fontSize: 24,
        letterSpacing: 0.75,
        lineHeight: 28,
    },

    savingsType:{
        color: '#6E7191',
        fontWeight: '500',
        fontSize: 12,
        letterSpacing: 0.75,
        lineHeight: 28,
    },

    swiper:{
    },

    scrollDisplay:{
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    count:{
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#6E7191',
        paddingHorizontal: 10,
        paddingVertical: 1,
        alignItems: 'center'
    },

    countText:{
        fontSize: 12,
    },

    btnContainer:{
        position: 'relative',
        marginHorizontal: 15,
    },

    overlay:{
        backgroundColor: "#0122AE",
        opacity: 0.1,
        width: '100%',
        height: '100%',
        position: "absolute",
        borderRadius: 5,
    },

    addBtn:{
        padding: 1,
        fontSize: 20,
    },

    balanceContent:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    topUpBtn:{
        position: 'relative',
        marginHorizontal: 15,
        backgroundColor: 'rgba(1, 34, 174, 0.1)',
        padding: 5,
        borderRadius: 5
    },

    topUpText:{
        color: '#0122AE',
        fontSize: 12,
        fontWeight: '600',
    }
})

export default BalanceView;