import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

export default interface ISideBarProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
