import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function FishDetailsScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Loading camera permissions...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.permissionContainer}>
          <ThemedText type="title" style={styles.title}>
            Fish Details
          </ThemedText>
          <ThemedText style={styles.permissionText}>
            We need your permission to access the camera to identify fish
          </ThemedText>
          <Pressable
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.buttonText}>Grant Camera Permission</Text>
          </Pressable>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });

        if (photo?.uri) {
          setCapturedImage(photo.uri);
          setShowCamera(false);

          // Here you could add fish identification logic
          Alert.alert(
            "Photo Captured!",
            "Fish identification feature coming soon!",
            [{ text: "OK" }]
          );
        }
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
        console.error("Camera error:", error);
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (showCamera) {
    return (
      <SafeAreaView style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.cameraButtonContainer}>
            <Pressable style={styles.cameraButton} onPress={takePicture}>
              <IconSymbol name="camera.fill" size={30} color="#fff" />
            </Pressable>
            <Pressable style={styles.flipButton} onPress={toggleCameraFacing}>
              <IconSymbol name="camera.rotate" size={24} color="#fff" />
            </Pressable>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <IconSymbol name="xmark" size={24} color="#fff" />
            </Pressable>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Fish Details
        </ThemedText>

        <ThemedText style={styles.description}>
          Take a photo of a fish to identify its species and add it to your
          collection!
        </ThemedText>

        {capturedImage && (
          <View style={styles.imageContainer}>
            <ThemedText type="subtitle" style={styles.imageTitle}>
              Last Captured Fish:
            </ThemedText>
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
              contentFit="cover"
            />
          </View>
        )}

        <Pressable
          style={styles.cameraOpenButton}
          onPress={() => setShowCamera(true)}
        >
          <IconSymbol name="camera.fill" size={24} color="#fff" />
          <Text style={styles.buttonText}>Open Camera</Text>
        </Pressable>

        <View style={styles.infoContainer}>
          <ThemedText type="subtitle">Features:</ThemedText>
          <ThemedText style={styles.featureText}>
            • Take high-quality fish photos
          </ThemedText>
          <ThemedText style={styles.featureText}>
            • AI-powered fish identification (coming soon)
          </ThemedText>
          <ThemedText style={styles.featureText}>
            • Add fish to your collection
          </ThemedText>
          <ThemedText style={styles.featureText}>
            • Track your fishing progress
          </ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
    lineHeight: 24,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cameraOpenButton: {
    backgroundColor: "#48D0B0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 30,
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  camera: {
    flex: 1,
  },
  cameraButtonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageTitle: {
    marginBottom: 10,
  },
  capturedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#48D0B0",
  },
  infoContainer: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
  },
  featureText: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 20,
  },
});
