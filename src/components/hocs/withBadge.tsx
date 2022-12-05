
import React from "react";
import { Animated, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Badge } from "react-native-paper";

export interface WithBadgeOptions{
    /**
     * Whether the badge is visible
     */
    visible?: boolean | undefined;
    /**
     * Content of the `Badge`.
     */
    children?: string | number | undefined;
    /**
     * Size of the `Badge`.
     */
    size?: number | undefined;
    badgStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    ref?: React.RefObject<Animated.AnimatedComponent<typeof import("react-native").Text>> | undefined;
}

const withBadge = (value: number, options: WithBadgeOptions = {}) => (WrappedComponent: JSX.Element) =>
  class extends React.Component {
    render() {
        const { 
          visible = (value || value !== 0), 
          badgStyle,
          containerStyle, 
          ...badgeProps 
        } = options;

      let widerStyle: StyleProp<TextStyle> = value > 99 ? 
      { width: 26, left: 7 } 
      : {};

      return (
        <View style={containerStyle}>
          {WrappedComponent}
          {visible && (
            <Badge 
                style={[styles.badge, widerStyle, badgStyle]}
                {...badgeProps}
            >
                {value}
            </Badge>
          )}
        </View>
      );
    }
  };

  const styles = StyleSheet.create({
    badge:{
        position: 'absolute',
        top: -9,
        bottom: 0,
        right: 0,
        left: 9,
    },
  });

export default withBadge;