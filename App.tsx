import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated, Pressable, ScrollView, Easing } from 'react-native';

const COLORS = {
  bg: '#050505',
  accent: '#FF2D55', // El rojo pasión
  text: '#ffffff',
  secondary: '#888'
};

// IMPORTANTE: Asegúrate de que los nombres coincidan exactamente con las fotos de tu carpeta assets
const FOTOS = [
  { id: 1, text: "Donde empezó todo", img: require('./assets/foto1.png') },
  { id: 2, text: "Nuestro mejor viaje", img: require('./assets/foto2.png') },
  { id: 3, text: "Por mil momentos más", img: require('./assets/foto3.png') },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const wheelAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    wheelAnim.setValue(0);
    Animated.timing(wheelAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    }).start();
  }, [index]);

  const rotateY = wheelAnim.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '0deg'] });
  const scale = wheelAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      <Text style={styles.title}>Para Nunus ❤️</Text>
      
      <View style={styles.wheelContainer}>
        <Animated.View style={[styles.card, { transform: [{ perspective: 1000 }, { rotateY }, { scale }] }]}>
          <Image source={FOTOS[index].img} style={styles.image} />
          <View style={styles.textOverlay}>
            <Text style={styles.cardText}>{FOTOS[index].text}</Text>
          </View>
        </Animated.View>
      </View>

      <Pressable style={styles.button} onPress={() => setIndex((index + 1) % FOTOS.length)}>
        <Text style={styles.buttonText}>Siguiente Recuerdo ✨</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { alignItems: 'center', paddingVertical: 60 },
  title: { fontSize: 36, fontWeight: 'bold', color: COLORS.accent, marginBottom: 40 },
  wheelContainer: { width: '85%', maxWidth: 400, height: 500, alignItems: 'center' },
  card: { width: '100%', height: '100%', borderRadius: 25, overflow: 'hidden', backgroundColor: '#151515', borderWidth: 2, borderColor: COLORS.accent },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  textOverlay: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: 'rgba(0,0,0,0.6)' },
  cardText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
  button: { marginTop: 40, backgroundColor: COLORS.accent, paddingVertical: 15, paddingHorizontal: 35, borderRadius: 50 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});