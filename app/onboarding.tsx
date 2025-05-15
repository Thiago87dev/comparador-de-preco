import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingScreen() {
  const router = useRouter();

  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/home"); // vai pra home ou onde quiser
  };

  return (
    <Onboarding
      onSkip={finishOnboarding}
      onDone={finishOnboarding}
      pages={[
        {
          backgroundColor: "#3A8DFF",
          image: (
            <View className="w-[380px] flex-row h-[300px] items-center justify-center ">
              <View>
                <LottieView
                  source={require("../assets/animation/milkPrice.json")}
                  style={{ width: 130, height: 130 }}
                  autoPlay
                  loop
                />
              </View>
              <View>
                <LottieView
                  source={require("../assets/animation/vs.json")}
                  style={{ width: 130, height: 130 }}
                  autoPlay
                  loop
                />
              </View>
              <View>
                <LottieView
                  source={require("../assets/animation/milk2.json")}
                  style={{ width: 130, height: 130 }}
                  autoPlay
                  loop
                />
              </View>
            </View>
          ),
          title: "Bem-vindo!",
          titleStyles: {
            fontSize:38,
            fontWeight:'bold'
          },
          subtitle: "Compare preços de forma rápida e inteligente.",
          subTitleStyles:{
            fontSize:20,
            color:'#fff'
          }
        },
        {
          backgroundColor: "#226c24",
          image: (
            <View className="w-[380px] flex-row h-[300px] items-center justify-center ">
              <View>
                <LottieView
                  source={require("../assets/animation/saveMoney.json")}
                  style={{ width: 300, height: 300 }}
                  autoPlay
                  loop
                />
              </View>
            </View>
          ),
          title: "Economize!",
          titleStyles: {
            fontSize:38,
            fontWeight:'bold'
          },
          subtitle: "Veja qual produto compensa mais antes de comprar.",
          subTitleStyles:{
            fontSize:20,
            color:'#fff'
          }
        },
        {
          backgroundColor: "#000",
          image: (
            <View className="w-[380px] flex-row h-[300px] items-center justify-center ">
              <View>
                <TouchableOpacity onPress={finishOnboarding}>
                  <LottieView
                    source={require("../assets/animation/go.json")}
                    style={{ width: 300, height: 300 }}
                    autoPlay
                    loop
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
          title: "Tudo Pronto!",
          titleStyles: {
            fontSize:38,
            fontWeight:'bold'
          },
          subtitle: "Comece agora mesmo e aproveite seus descontos!",
          subTitleStyles:{
            fontSize:20,
            color:'#fff'
          }
        },
      ]}
    />
  );
}
