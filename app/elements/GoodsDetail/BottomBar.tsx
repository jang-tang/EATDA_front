import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function Bottom_Bar(){
    return(
        <View style={styles.wrapper}>
            <View style={styles.box}>
                <TouchableOpacity activeOpacity={0.9}>
                <View style={styles.pickupbtn}>
                  <Text style={styles.pickup_txt}>픽업 예약하기</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9}>
                <View style={styles.paybtn}>
                  <Text style={styles.paybtn_txt}>미리 결제하기</Text>
                </View>
                </TouchableOpacity>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
      alignSelf: "center",
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    box: {
      width: width,
      height: height / 7,
      backgroundColor: "#FFFFFF",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 12,
      // iOS용 그림자
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      // Android용 elevation
      elevation: 20,
      flexDirection: "row",
      ...Platform.select({
        android: {
          borderTopWidth:1,
          borderTopColor: '#ddd',  // 연한 회색 테두리
        },
      }),
    },
    pickupbtn : {
        marginHorizontal: 5,
        width: width / 2.3,
        height: width / 6.5,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center",
      },
      pickup_txt:{
        fontSize: 15,
        fontWeight : "700",
        color: "#A7A7A7"
      },
      paybtn : {
        marginHorizontal: 5,
        width: width / 2.3,
        height: width / 6.5,
        backgroundColor: "#4892E9",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center",
      },
      paybtn_txt:{
        fontSize: 15,
        fontWeight : "700",
        color: "#FFFFFF"
      },
});
