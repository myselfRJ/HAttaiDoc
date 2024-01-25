import React from 'react';
import {View, Text} from 'react-native';
import {CUSTOMCOLOR} from '../settings/styles';
import {moderateScale} from '../utility/scaleDimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TextStyle = props => {
  return (
    <View style={{flexDirection: 'row', gap: 5, flexWrap: 'wrap'}}>
      {props.txt?.map((item, id) => (
        <View
          key={id}
          style={[
            {
              borderWidth: moderateScale(1),
              borderColor: CUSTOMCOLOR.primary,
              padding: 5,
              borderRadius: 2,
              justifyContent: 'space-between',
              backgroundColor: '#EAF3FC',
              flexDirection: 'row',
              gap: moderateScale(10),
              marginTop: moderateScale(5),
              alignItems: 'center',
            },
            props.container,
          ]}>
          <View style={{flexDirection: 'row', gap: moderateScale(40)}}>
            {Array.isArray(item) ? (
              item.map((temp, id) => (
                <Text
                  key={id}
                  style={{
                    color: CUSTOMCOLOR.primary,
                    fontWeight: '500',
                    fontSize: moderateScale(15),
                  }}>
                  {temp}
                </Text>
              ))
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: moderateScale(5),
                }}>
                <Icon
                  name={props.icon}
                  size={moderateScale(30)}
                  color={'red'}
                  style={{}}
                />
                <Text
                  style={[
                    {
                      color: CUSTOMCOLOR.primary,
                      fontWeight: '500',
                      fontSize: moderateScale(15),
                    },
                    props.txtstyle,
                  ]}>
                  {item}
                </Text>
              </View>
            )}
          </View>
          {props.remove && (
            <Icon
              name="close-circle"
              size={20}
              color={CUSTOMCOLOR.delete}
              onPress={() => props.remove(id)}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default TextStyle;
