/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import VerifyCodeScreen from "../screens/VerifyCodeScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Read more about the protected routes pattern in React Native
 *
 * https://reactnavigation.org/docs/auth-flow
 */
const RootNavigator = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      <ClerkLoading>
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>
            This is the blank screen after the splash and before the initial
            screen., If you remove this whole thing with its wrapper ClerkLoading, a white screen will appear for 1-2 seconds.
          </Text>
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <Stack.Navigator>
          {isSignedIn ? (
            <Stack.Screen
              name="MyProfile"
              component={MyProfileScreen}
              options={{ title: "MyProfile" }}
            />
          ) : (
            <>
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ title: "Sign Up" }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ title: "Sign In" }}
              />
              <Stack.Screen
                name="VerifyCode"
                component={VerifyCodeScreen}
                options={{ title: "Sign Up" }}
              />
            </>
          )}
        </Stack.Navigator>
      </ClerkLoaded>
    </>
  );
};
