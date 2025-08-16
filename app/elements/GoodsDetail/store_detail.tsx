import { router } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

export default function Detail_txt(){
    const txt = `남은 단팥빵을 당일 판매 원칙에 따라 40% 할인 판매합니다. 달콤한 팥과 부드러운 식감이 어우러진 정성 가득한 단팥빵, 오늘 간식이나 커피와 함께 가볍게 즐겨보세요!`
    return(
        <View style={styles.container}>
            {/* 해시태그 */}
            <View style={styles.hash_con}>
            <Text style={styles.hashtag}> #근처 5KM 이내</Text>
            <Text style={styles.hashtag}>#보관 기관 3일 이내</Text>
            </View>
            {/* 제품 이름과 보관기간 */}
             <View style={styles.head_con}>
             <Text style={styles.head}>단팥빵</Text>
             <Text style={styles.haveday}>보관기간:{1}일</Text>
            </View>
            {/* 할인율 */}
            <Text style={styles.sale}>{40}% off</Text>
            {/* 가격 */}
            <View style={styles.head_con}>
             <Text style={styles.sale_price}>{1200}원</Text>
             <Text style={styles.bone_price}>{2000}원</Text>
            </View>
            {/* 세부 설명 */}
            <Text style={styles.input}>{txt}</Text>
            <View>
            {/* 리뷰 */}
            <TouchableOpacity  style={styles.hash_con} onPress={()=>{router.push('/elements/reivew/review')}}
            activeOpacity={0.9}>
            <Text style={styles.review}>리뷰 보기 {91}개</Text>
            {/* 오른쪽 화살표 아이콘 */}
            <Entypo name="chevron-right" size={24}/>
          </TouchableOpacity></View>

        </View>
    )
}

const styles = StyleSheet.create({
    sale:{
        marginTop:15,
        fontSize: 20,
        fontWeight: "500",
        color:"#006AE6"
    },
    container:{
        margin:20,
    },
    hashtag:{
        fontSize : 14,
        color: "#006AE6",
        marginRight: 10,
    },
    hash_con:{
        flexDirection: "row",
    },
    head_con:{
        flexDirection: "row",
        marginTop: 15,
        alignItems: "flex-end", 
    },
    head:{
        fontSize : 25,
        fontWeight : "700",
    },
    haveday: {
        fontSize : 15,
        marginLeft: 5
    },
    review: {
        fontSize: 18
    },
    sale_price:{
        fontSize: 20,
        fontWeight: "500",
        marginRight:8,
    },
    bone_price:{
        fontSize: 20,
        fontWeight: "500",
        color:'#A7A7A7',
        textDecorationLine: 'line-through',
    },
    input:{
        marginVertical:15,
        fontSize: 14,
        lineHeight: 22,
        color: '#333',
        flexWrap: 'wrap',        // 줄바꿈 허용 (보통 Text에선 기본)
        width: '100%',           // 부모 컨테이너에 맞게 꽉 채우기
        // 또는 maxWidth: '100%' 도 가능
    }
})

