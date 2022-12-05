import React from 'react';
import { StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent, Pressable, StyleProp, TextStyle } from 'react-native';
import Swiper, { SwiperProps } from 'react-native-swiper';
import { Saving } from '../../types/saving';
import { formatAmount } from '../../utils/GeneralUtils';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/store';

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
    saving_type?: string
}
export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
    amount = 0.00, saving_type = 'Wallet Balance'
})=>{
    return(
        <View style={styles.displayContainer}>
            <Text style={styles.amountText}>
                {`₦${formatAmount(amount.toString())}`}
            </Text>
            <Text style={styles.savingsType}>
                {saving_type}
            </Text>
        </View>
    )
}

const SavingsBalanceView: React.FC<BalanceViewProps> = ()=>{

    // Redux
    const { savings } = useSelector((state: RootState)=> state.auth);
    
    const swiper = React.useRef<Swiper>(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [acctIndex, setAccountIndex] = React.useState(0);

    // Total Savings
    let totalSavings: any = [];
    if (savings) {
        totalSavings = [...savings]
    }

    /** Handling slide to next page */
    const slideToNext = ()=>{
        swiper.current?.scrollBy(1);
    }

    /** Handling slide to previous page */
    const slideToPrev = ()=>{
        swiper.current?.scrollBy(-1);
    }
       

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

    if (!savings) {
        return(
            <BalanceDisplay/>
        )
    }
    

    return (
      <View style={styles.main}>
            { totalSavings.length > 0 && scrollDisplay }
            <Swiper ref={swiper} style={styles.swiper} showsButtons={false}
                height={60} 
                showsPagination={false} loop={false}
                onIndexChanged={(step)=>{ 
                    setActiveStep(step);
                }}
                index={activeStep}
            >
                {
                    savings?.map((item, index)=>(
                        <BalanceDisplay amount={item.amount} saving_type={item.saving_type} 
                            key={`${index}BD`}
                        /> 
                    ))
                }
            </Swiper>
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
})

export default SavingsBalanceView;