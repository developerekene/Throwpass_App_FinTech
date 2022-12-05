import React from "react";
import { Modal, StyleSheet, Text, Pressable, View, FlatList, StyleProp, TextStyle } from "react-native";
import { BankResponseData } from "../../types/responses";
import BankSearchTextField from "./BankSearchTextField";
import MainTextField from "./MainTextField";
import { TextFieldProps } from "./TextField";
import AntIcon from 'react-native-vector-icons/AntDesign';
import { TouchableRipple } from "react-native-paper";
import { getStatusBarHeight } from 'react-native-status-bar-height';

export interface BankModalFieldProps extends TextFieldProps{
  options?: BankResponseData[];
  valueCollector?: (value: any, label?: string) => any;
}

const BankModalField: React.FC<BankModalFieldProps> = ({ options, valueCollector, ...props }) =>{

    // State
    const [rows, setRows] = React.useState<BankResponseData[]>([]);
    const [resetRows, setResetRows] = React.useState<BankResponseData[]>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [bank, setBank] = React.useState<string>('');

    // Handlers
    const handleChange = (value: string)=>{
      let newRows = resetRows?.filter((row)=> row.name.toLowerCase().includes(value.toLowerCase()));
      setRows(newRows || []);
    }
    const handlePress = ()=>{
      setOpen(true);
    }
    const handleClose = ()=>{
      setOpen(false);
    }
    const handleSelect = (bankName?: string | null)=>{
      bankName && setBank(bankName);
    }

    // Effect
    React.useEffect(()=>{
      if (options) {
        setRows(options);
        setResetRows(options);
      }
    }, [options]);

    // Item render
    const _renderItem = ({ item }: { item: BankResponseData })=>{
      return(
          <TouchableRipple onPress={()=>{
            handleSelect(item.name);
            valueCollector && valueCollector(item.code, item.name);
            setOpen(false);
          }}>
              <View style={styles.textView}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
          </TouchableRipple>
      )
    }

    // Key extractor
    const keyExtractor = ({ name }: BankResponseData) =>{
      return name + 'Bk'
    }

    const DownIcon =( 
      <AntIcon 
          name="down" 
          size={20} 
          style={{
              color: '#6E7191',
          }} 
      />)

    const endAdornment = (
      <Pressable onPress={handlePress}>
        {
            ({ pressed })=>{
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return(
                    <View style={[style]}>
                        { DownIcon }
                    </View>
                )
            }
        }
        </Pressable>
    )

    const closeIcon = (
      <Pressable onPress={handleClose}>
            {({ pressed })=>{
                let pressedStyle: StyleProp<TextStyle> = {
                    opacity: 0.5
                }

                let style = pressed ? pressedStyle : null;

                return (
                  <AntIcon
                      name='close' size={20}
                      style={style}
                  />
                )
            }}
        </Pressable>
    )

    return(
        <View>
            <Modal
                animationType="slide"
                visible={open}
                style={styles.modal}
            >
              <View style={styles.header}>
                <View style={styles.close}>
                { closeIcon }
                </View>
                <Text style={styles.title}>Banks</Text>
              </View>
               <View>
                 <BankSearchTextField valueCollector={handleChange}/>
               </View>
              <FlatList
                  style={[styles.list]}
                  data={rows}
                  renderItem={_renderItem}
                  keyExtractor={keyExtractor}
              />
            </Modal>
            <Pressable onPress={handlePress}>
              <MainTextField
                placeholder={'Select Bank'}
                endAdornment={endAdornment}
                editable={false}
                value={bank}
                {...props}
              />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  modal:{
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 30
  },

  list:{
    flex: 1,
  },

  textView:{
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  text:{
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.75,
    lineHeight: 28
  },

  header:{
    position: 'relative',
    marginTop: getStatusBarHeight(), 
    paddingBottom: '10%',
    //paddingHorizontal: 15,
    //flexDirection: 'row'
  },

  title:{
    position: 'absolute',
    fontSize: 16,
    fontWeight: '600',
    //textAlign: 'center',
    top: '90%',
    left: '50%',
  marginLeft: -25,
  },

  close:{
    marginLeft: 10,
    position: "absolute",
  },

});

export default BankModalField;