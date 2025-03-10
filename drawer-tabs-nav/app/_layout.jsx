import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Current Path", pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.infoContainer}>
        <View style={styles.infoDetailsContainer}>
          <Text style={styles.appTitle}>StoryPath</Text>
        </View>
      </View>
      {/* Welcome Tab */}
      <DrawerItem
        icon={({ size }) => (
          <Feather name="home" size={size} color={pathname === "/" ? "#fff" : "#000"} />
        )}
        label={"Welcome"}
        labelStyle={[styles.navItemLabel, { color: pathname === "/" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname === "/" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/");
        }}
      />
      {/* About Tab */}
      <DrawerItem
        icon={({ size }) => (
          <Feather name="info" size={size} color={pathname === "/about" ? "#fff" : "#000"} />
        )}
        label={"About"}
        labelStyle={[styles.navItemLabel, { color: pathname === "/about" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname === "/about" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/about");
        }}
      />
      {/* Profile Tab */}
      <DrawerItem
        icon={({ size }) => (
          <Feather name="user" size={size} color={pathname === "/profile" ? "#fff" : "#000"} />
        )}
        label={"Profile"}
        labelStyle={[styles.navItemLabel, { color: pathname === "/profile" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname === "/profile" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/profile");
        }}
      />
      {/* Projects Tab */}
      <DrawerItem
        icon={({ size }) => (
          <Feather name="briefcase" size={size} color={pathname === "/(tabs)/Projects" ? "#fff" : "#000"} />
        )}
        label={"Projects"}
        labelStyle={[styles.navItemLabel, { color: pathname === "/(tabs)/Projects" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname === "/(tabs)/Projects" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/(tabs)/Projects");
        }}
      />
      {/* Tips Tab */}
      <DrawerItem
        icon={({ size }) => (
          <Feather name="help-circle" size={size} color={pathname === "/tips" ? "#fff" : "#000"} />
        )}
        label={"Tips"}
        labelStyle={[styles.navItemLabel, { color: pathname === "/tips" ? "#fff" : "#000" }]}
        style={{ backgroundColor: pathname === "/tips" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/tips");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="index" options={{ headerTitle: "Home" }} />
      <Drawer.Screen name="about" options={{ headerTitle: "About" }} />
      <Drawer.Screen name="profile" options={{ headerTitle: "Profile" }} />
      <Drawer.Screen name="(tabs)/Projects" options={{ headerTitle: "Projects" }} />
      <Drawer.Screen name="tips" options={{ headerTitle: "Tips" }} />
      <Drawer.Screen name="ProjectDetailsScreen" options={{ headerTitle: "Project Details" }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  infoDetailsContainer: {
    marginTop: 25,
    marginLeft: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
