import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigationTab } from "./BottomNavigationTab";
import { SvgName } from "@/manager/statics";
import * as Main from "@/core/screens/main";

const Tab = createBottomTabNavigator();

interface MainStack extends SvgName {
  name: string;
  component: () => React.ReactNode;
  lazy: boolean;
}

/**
 * @BottomNavigation
 * * 바텀 네비게이션을 만들때, 각 Screen을 배열에 담아 Map 함수를 통해 동일한 관리가 가능하다.
 *
 */

const MainStack: MainStack[] = [
  {
    svgName: "home",
    name: "HomeScreen",
    component: Main.HomeScreen,
    lazy: false,
  },
  {
    svgName: "map",
    name: "MapViewScreen",
    component: Main.MapViewScreen,
    lazy: true,
  },
  {
    svgName: "discover",
    name: "DiscoverScreen",
    component: Main.DiscoverScreen,
    lazy: true,
  },
  {
    svgName: "saved",
    name: "SavedScreen",
    component: Main.SavedScreen,
    lazy: true,
  },
  {
    svgName: "my",
    name: "MyScreen",
    component: Main.MyScreen,
    lazy: true,
  },
];

export const BottomNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigationTab {...props} />}
      screenOptions={{
        tabBarShowLabel: true,
        unmountOnBlur: false,
        freezeOnBlur: true,
        headerShadowVisible: false,
      }}
      initialRouteName="HomeScreen"
    >
      {MainStack.map(stack => {
        return (
          <Tab.Screen
            key={stack.svgName}
            name={stack.name}
            component={stack.component}
            options={{
              tabBarLabel: stack.svgName,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
