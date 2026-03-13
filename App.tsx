import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated, Pressable, ScrollView, Easing, useWindowDimensions } from 'react-native';

const COLORS = {
  bg: '#050505',
  accent: '#FF2D55', 
  text: '#ffffff',
  secondary: '#888'
};

// --- TUS FOTOS ---
// IMPORTANTE: Asegúrate de que los nombres coincidan exactamente con las fotos de tu carpeta assets
const FOTOS = [
  { id: 1, text: "Donde empezó todo...", img: require('./assets/foto1.png') },
  { id: 2, text: "Un viaje inolvidable", img: require('./assets/foto2.png') },
  { id: 3, text: "Para siempre juntos", img: require('./assets/foto3.png') },
  { id: 3, text: "Para siempre juntos", img: require('./assets/foto4.png') },
  { id: 3, text: "Para siempre juntos", img: require('./assets/foto5.png') },
  { id: 3, text: "Para siempre juntos", img: require('./assets/foto6.png') },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Una transición suave de 1 segundo
      useNativeDriver: true,
    }).start();
  }, [index]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center} showsVerticalScrollIndicator={false}>
      {/* HEADER TIPO TU REFERENCIA */}
      <View style={[styles.header, { width: isMobile ? '90%' : '80%' }]}>
        <Text style={styles.headerText}>02</Text>
        <Text style={styles.headerText}>[ MINE ]</Text>
        <Text style={styles.headerText}>09</Text>
      </View>

      <Text style={styles.title}>Para Nunus ❤️</Text>
      
      {/* EL TIOVIVO SLIDER 3D */}
      <View style={styles.wheelContainer}>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Image source={FOTOS[index].img} style={styles.image} />
          <View style={styles.textOverlay}>
            <Text style={styles.cardText}>{FOTOS[index].text}</Text>
          </View>
        </Animated.View>
      </View>

      <Pressable style={styles.button} onPress={() => setIndex((index + 1) % FOTOS.length)}>
        <Text style={styles.buttonText}>Siguiente Recuerdo ✨</Text>
      </Pressable>

      <Text style={styles.footer}>Hecho con amor por Jorge</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { alignItems: 'center', paddingVertical: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerText: { color: COLORS.secondary, fontSize: 14, textTransform: 'uppercase', letterSpacing: 2 },
  title: { fontSize: 36, fontWeight: 'bold', color: COLORS.accent, marginBottom: 40 },
  wheelContainer: { width: '85%', maxWidth: 400, height: 500, elevation: 10, shadowColor: COLORS.accent, shadowOpacity: 0.3, shadowRadius: 20, marginBottom: 40, borderRadius: 25, overflow: 'hidden' },
  card: { flex: 1, backgroundColor: '#151515' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  textOverlay: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: 'rgba(0,0,0,0.6)' },
  cardText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
  button: { backgroundColor: COLORS.accent, paddingVertical: 15, paddingHorizontal: 35, borderRadius: 50, shadowColor: COLORS.accent, shadowOpacity: 0.5, shadowRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { marginTop: 50, color: COLORS.secondary, fontSize: 12 }
});