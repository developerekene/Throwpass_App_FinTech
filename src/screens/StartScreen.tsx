import { RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import Swiper from 'react-native-swiper';
import HeroScreen from './HeroScreen';

export interface StartScreenProps{
    navigation?: NativeStackNavigationProp<any, any>;
    route?: RouteProp<{
        params:{
            screenIndex?: number;
        }
    }>;
}

const StartScreen: React.FC<StartScreenProps> = ({ navigation })=>{
    const swiper = React.useRef<Swiper>(null);
    const [activeStep, setActiveStep] = React.useState(0);

    /** Handling slide to next page */
    const slideToNext = ()=>{
        swiper.current?.scrollBy(1);
    }

    /** Handling slide to previous page */
    const slideToPrev = ()=>{
        swiper.current?.scrollBy(-1);
    }

    /** Move to Login screen */
    const getStarted = ()=>{
        navigation?.navigate('Login');
    }
    

    return (
      <Swiper ref={swiper} showsButtons={false} showsPagination={false}
        loop={false} removeClippedSubviews={false}
        onIndexChanged={(step)=>{ 
            setActiveStep(step);
        }}
        index={activeStep} horizontal={true}
      >
        { 
            [0,1,2].map((screenIndex)=>(
                <HeroScreen screenIndex={screenIndex} key={screenIndex}
                onNext={slideToNext} onPrev={slideToPrev}
                onGetStarted={getStarted}
                />
            ))
        }
      </Swiper>
    )
}

export default StartScreen;