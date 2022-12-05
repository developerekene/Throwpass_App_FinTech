import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import LoansSvg from '../../icons/loans';
import SavingsSvg from '../../icons/savings-management';
import SecuritySvg from '../../icons/security';

export interface HeroImageProps{
    imageIndex?: number;
}
/**
 * Should be rendered within a view with an aspect ratio of 1
 * @param param0 
 */
const HeroImage: React.FC<HeroImageProps> = ({ imageIndex = 0 })=>{

    const Image1 = (
       <SavingsSvg/>
    );

    const Image2 = (
        <SecuritySvg/>
    );

    const Image3 = (
      <LoansSvg />
    );

    const images = [Image1, Image2, Image3];

    return(
        images[imageIndex]
    )
}

const styles = StyleSheet.create({
    image:{
        width: 150,
        height: 150,
    }
})

export default HeroImage;