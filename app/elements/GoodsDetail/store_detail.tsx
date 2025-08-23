import { router } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

interface ProductBoxProps {
    product_id:string;
    image: string;         // 이미지 소스 (require or uri)
    title: string;       // 상품명
    description?: string; // 간단한 설명 (옵션)
    sale: string;
    price: string;       // 가격 표시 (문자열로 처리)
    hashtags: string;
    extra_info:string;
    store_id:string;
  }

export default function Detail_txt({ image, title, description, price, sale, hashtags, extra_info, product_id, store_id }: ProductBoxProps){
    let hashs = hashtags.replace(/^#/, '').split('#')
    return(
        <View style={styles.container}>
            {/* 해시태그 */}
            <View style={styles.hash_con}>
            {hashs.map((hashtag, index)=>(
                 <Text key={index} style={styles.hashtag}>#{hashtag}</Text>
            ))}
            </View>
            {/* 제품 이름과 보관기간 */}
             <View style={styles.head_con}>
             <Text style={styles.head}>{title}</Text>
             <Text style={styles.haveday}>{description}</Text>
            </View>
            {/* 할인율 */}
            <Text style={styles.sale}>{Math.floor((1 - Number(sale) / Number(price))* 100)}% off</Text>
            {/* 가격 */}
            <View style={styles.head_con}>
             <Text style={styles.sale_price}>{sale}원</Text>
             <Text style={styles.bone_price}>{price}원</Text>
            </View>
            {/* 세부 설명 */}
            <Text style={styles.input}>{extra_info}</Text>
            <View>
            {/* 리뷰 */}
            <TouchableOpacity  style={styles.hash_con} onPress={()=>{router.push({
                pathname: '/elements/reivew/review',
                params: { product_id }   // ✅ product_id 같이 넘기기
            })}}
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

