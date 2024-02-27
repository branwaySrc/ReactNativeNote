import { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { SvgIcon } from "@/manager/statics";
import { SvgXml } from "react-native-svg";
import { COLOR } from "@/manager/statics";

//TODO
// Animate.View로 자연스러운 뽕짝 버튼 움직임 만들기
// RippleButton로 RippleEffect 구현하기

const ActiveTabColor = COLOR.SLATE_900;
const InActiveTabColor = COLOR.SLATE_100;

export const BottomNavigationTab = ({ state, descriptors, navigation }) => {
  const initialBg = "transparent";
  const [bg, setBg] = useState<string>(initialBg);
  const [iconScale, setIconScale] = useState<number>(1);
  const handlePressIn = () => {
    // 터치가 시작되면 0.5초 후에 투명도를 0.5로 변경
    setTimeout(() => {
      setBg("#FF000000");
      setIconScale(1);
    }, 200);
  };

  const handlePressOut = () => {
    // 터치가 끝나면 투명도를 다시 1로 변경
    setBg("#80808020");
    setIconScale(0.94);
  };

  return (
    <View style={style.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={1}
            style={[style.tab, { backgroundColor: isFocused ? bg : null }]}
          >
            <SvgXml
              style={{ transform: [{ scale: isFocused ? iconScale : 1 }] }}
              xml={SvgIcon({
                color: isFocused ? ActiveTabColor : InActiveTabColor,
                svgName: label,
                height: 34,
                width: 34,
              })}
            />
            <Text style={{ marginTop: -2 }} weight="bold" color={isFocused ? ActiveTabColor : InActiveTabColor}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  tabContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderTopWidth: 1.5,
    borderRightWidth: 0.8,
    borderLeftWidth: 0.8,
    borderBottomWidth: 0,
    borderColor: COLOR.GRAY100,
    backgroundColor: COLOR.WHITE_100,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    zIndex: 999,
  },
  tab: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.WHITE_100,
    borderRadius: 999,
    paddingVertical: 4,
  },
});
