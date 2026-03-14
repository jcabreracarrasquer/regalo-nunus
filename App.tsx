import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Linking, useWindowDimensions, Platform, Animated, Easing, Modal } from 'react-native';

// --- INYECCIÓN DE TIPOGRAFÍAS WEB ---
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Dancing+Script:wght@700&display=swap');
    
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `));
  document.head.appendChild(style);
}

// --- PALETA DE COLORES PREMIUM ---
const COLORS = {
  bg: '#050505',
  paper: '#FDFCF8',
  lines: '#DCE6ED',
  margin: '#E57373',
  accent: '#D94343',
  text: '#1A1A1A',
  lightText: '#888888',
  cardBg: '#0D0D0D',
  routeMap: '#111111',
  overlay: 'rgba(0,0,0,0.9)' // Color para el fondo del visualizador ampliado
};

// 1️⃣ COMPONENTE: CONTADOR DE TIEMPO JUNTOS
const TimeCounter = () => {
  const [timeLeft, setTimeLeft] = useState({ años: 0, meses: 0, días: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const startDate = new Date('2026-02-06T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = now - startDate;
      
      setTimeLeft({
        años: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
        meses: Math.floor((difference / (1000 * 60 * 60 * 24 * 30.416)) % 12),
        días: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.416),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterTitle}>AGUANTANDONOS</Text>
      <View style={styles.counterNumbersRow}>
        <View style={styles.timeBox}><Text style={styles.timeNum}>{timeLeft.meses}</Text><Text style={styles.timeLabel}>Meses</Text></View>
        <View style={styles.timeBox}><Text style={styles.timeNum}>{timeLeft.días}</Text><Text style={styles.timeLabel}>Días</Text></View>
        <View style={styles.timeBox}><Text style={styles.timeNum}>{timeLeft.horas}</Text><Text style={styles.timeLabel}>Hrs</Text></View>
        <View style={styles.timeBox}><Text style={styles.timeNum}>{timeLeft.minutos}</Text><Text style={styles.timeLabel}>Min</Text></View>
        <View style={styles.timeBox}><Text style={styles.timeNum}>{timeLeft.segundos}</Text><Text style={styles.timeLabel}>Seg</Text></View>
      </View>
    </View>
  );
};

// 2️⃣ COMPONENTES MICRO-INTERACCIONES
const HoverPolaroid = ({ children }: any) => {
  const hoverAnim = useRef(new Animated.Value(0)).current;
  const handleHoverIn = () => Animated.spring(hoverAnim, { toValue: 1, friction: 5, useNativeDriver: false }).start();
  const handleHoverOut = () => Animated.spring(hoverAnim, { toValue: 0, friction: 5, useNativeDriver: false }).start();
  const rotate = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '0deg'] });
  const scale = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
  const shadow = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 25] });
  return (
    // @ts-ignore
    <Pressable onHoverIn={handleHoverIn} onHoverOut={handleHoverOut}>
      <Animated.View style={[styles.polaroidFrame, { transform: [{ rotate }, { scale }], shadowRadius: shadow }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const HoverReasonCard = ({ number, text }: any) => {
  const hoverAnim = useRef(new Animated.Value(0)).current;
  const handleHoverIn = () => Animated.spring(hoverAnim, { toValue: 1, friction: 6, useNativeDriver: false }).start();
  const handleHoverOut = () => Animated.spring(hoverAnim, { toValue: 0, friction: 6, useNativeDriver: false }).start();
  const translateY = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const borderColor = hoverAnim.interpolate({ inputRange: [0, 1], outputRange: ['#1A1A1A', COLORS.accent] });
  return (
    // @ts-ignore
    <Pressable onHoverIn={handleHoverIn} onHoverOut={handleHoverOut} style={{ width: 280 }}>
      <Animated.View style={[styles.reasonCard, { transform: [{ translateY }], borderColor }]}>
        <Text style={styles.reasonNumber}>{number}</Text>
        <Text style={styles.reasonText}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
};

// 3️⃣ COMPONENTE NUEVO: VISUALIZADOR DE FOTOS AMPLIADO (Modal)
const PhotoViewerModal = ({ visible, onClose, photos, location, date }: any) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        {/* Botón de cerrar en la esquina */}
        <Pressable style={styles.modalCloseButton} onPress={onClose}>
          <Text style={styles.modalCloseText}>✕</Text>
        </Pressable>

        <ScrollView contentContainerStyle={styles.modalScrollContent} showsVerticalScrollIndicator={false}>
          {/* Cabecera dentro del modal */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalLocation}>{location}</Text>
            <Text style={styles.modalDate}>{date}</Text>
          </View>

          {/* Lista de fotos ampliadas */}
          <View style={styles.modalPhotosList}>
            {photos.map((photo: any, index: number) => (
              <Image 
                key={index} 
                source={photo} 
                style={[styles.modalPhoto, { width: isMobile ? width * 0.9 : 800 }]} 
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

// 4️⃣ COMPONENTE: GALERÍA POR VIAJES (Actualizado para ser clickeable)
const TravelGallery = ({ location, date, photos, onPressTitle }: { location: string, date: string, photos: any[], onPressTitle: () => void }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Animación para el hover de la cabecera
  const headerHoverAnim = useRef(new Animated.Value(0)).current;
  const handleHeaderHoverIn = () => Animated.timing(headerHoverAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  const handleHeaderHoverOut = () => Animated.timing(headerHoverAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  const headerBgColor = headerHoverAnim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.03)'] });

  return (
    <View style={styles.travelBlock}>
      {/* Cabecera del Viaje - Ahora Clickeable */}
      {/* @ts-ignore */}
      <Pressable onPress={onPressTitle} onHoverIn={handleHeaderHoverIn} onHoverOut={handleHeaderHoverOut}>
        <Animated.View style={[styles.travelHeader, { backgroundColor: headerBgColor }]}>
          <View style={styles.travelLocationBox}>
             <Text style={styles.travelIcon}>📍</Text>
             <Text style={styles.travelLocation}>{location}</Text>
          </View>
          <View style={styles.travelDateBox}>
            <Text style={styles.travelDate}>{date}</Text>
            <Text style={styles.expandIcon}>🔍</Text> 
          </View>
        </Animated.View>
      </Pressable>

      {/* Grid de Fotos del Viaje */}
      <View style={styles.travelPhotosGrid}>
        {photos.map((photo, index) => (
          <View key={index} style={[styles.travelPhotoWrapper, { width: isMobile ? '48%' : '23%' }]}>
            <Image source={photo} style={styles.travelPhoto} />
          </View>
        ))}
      </View>
      <View style={styles.travelDivider} />
    </View>
  );
};

// FADE-IN DE ENTRADA GENERAL
const FadeInView = ({ children, delay = 0, style }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, delay, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(translateY, { toValue: 0, duration: 800, delay, useNativeDriver: true, easing: Easing.out(Easing.cubic) })
    ]).start();
  }, [delay, fadeAnim, translateY]);
  return <Animated.View style={[style, { opacity: fadeAnim, transform: [{ translateY }] }]}>{children}</Animated.View>;
};

// ESTILO PAPEL
const notebookPaperStyle = Platform.select({
  web: {
    backgroundColor: COLORS.paper,
    backgroundImage: `linear-gradient(${COLORS.lines} 1px, transparent 1px), linear-gradient(90deg, transparent 79px, ${COLORS.margin} 1px, ${COLORS.margin} 2px, transparent 81px)`,
    backgroundSize: '100% 32px, 100% 100%',
    backgroundPosition: '0 10px, 0 0',
  },
  default: { backgroundColor: COLORS.paper },
});


// ==========================================
// PÁGINA PRINCIPAL APP
// ==========================================
export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Estado para controlar el visualizador de fotos
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentGallery, setCurrentGallery] = useState({ photos: [], location: '', date: '' });

  const openSpotify = () => Linking.openURL('https://open.spotify.com/intl-es/track/6l18mUHOGVZRr5wTyITX0M?si=0569719bae744c18'); 
  const openMap = () => Linking.openURL('https://www.google.com/maps/dir/Zaragoza/Bilbao/'); 

  // Función para abrir la galería ampliada
  const openGalleryViewer = (photos: any[], location: string, date: string) => {
    setCurrentGallery({ photos, location, date });
    setViewerVisible(true);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER & TIMER */}
      <FadeInView delay={100} style={styles.header}>
        <Text style={styles.headerText}>UN 6 DE FEBRERO</Text>
        <View style={styles.headerLine} />
        <TimeCounter />
      </FadeInView>

      {/* --- SECCIÓN 1: LA CARTA --- */}
      <FadeInView delay={300} style={[styles.section, { paddingHorizontal: isMobile ? 20 : 0 }]}>
        <View style={[styles.paperCard, notebookPaperStyle]}>
          {Platform.OS !== 'web' && <View style={styles.nativeMarginLine} />}
          
          <View style={styles.cardContent}>
            <Text style={styles.title}>Para mi Nunus</Text>
            
            <Text style={[styles.letterText, { fontFamily: Platform.OS === 'web' ? "'Caveat', cursive" : 'serif', fontSize: 24 }]}>
              Mi amor,{'\n\n'}
              Parece mentira lo rápido que pasa el tiempo. Escribo esto porque quería tener un pequeño rincón solo nuestro en internet. Un lugar donde guardar nuestra canción, nuestras fotos y todas esas razones que hacen que cada kilómetro valga la pena.{'\n\n'}
              Gracias por ser tú, por los viajes, por las risas tontas y por aguantar mis frikadas informáticas.{'\n\n'}
              Con todo mi amor,{'\n'}
            </Text>
            <Text style={[styles.signature, { fontFamily: Platform.OS === 'web' ? "'Dancing Script', cursive" : 'serif' }]}>
              Juanillo ❤️
            </Text>

            <View style={styles.imageWrapper}>
              <HoverPolaroid>
                <Image source={require('./assets/foto1.png')} style={styles.letterImage} />
                <Text style={styles.polaroidCaption}>Nuestro comienzo</Text>
              </HoverPolaroid>
            </View>
          </View>
        </View>
      </FadeInView>

      {/* --- SECCIÓN 2: LA CANCIÓN --- */}
      <FadeInView delay={500} style={[styles.section, styles.songSection]}>
        <Text style={styles.sectionTitle}>Nuestra Canción</Text>
        <View style={[styles.songContainer, { flexDirection: isMobile ? 'column' : 'row' }]}>
          
          <View style={[styles.playerCard, { width: isMobile ? '100%' : '38%', marginBottom: isMobile ? 40 : 0 }]}>
             <Image source={require('./assets/foto2.png')} style={styles.albumCover} />
             <Text style={styles.songTitle}>Nombre de vuestra canción</Text>
             <Text style={styles.songArtist}>Artista de la canción</Text>
             <Pressable style={({ pressed }) => [styles.spotifyButton, { opacity: pressed ? 0.8 : 1 }]} onPress={openSpotify}>
                <Text style={styles.spotifyButtonText}>REPRODUCIR EN SPOTIFY</Text>
             </Pressable>
          </View>

          <View style={[styles.songTextWrapper, { width: isMobile ? '100%' : '55%', paddingHorizontal: isMobile ? 0 : 20 }]}>
            <View style={[styles.quoteMark, { left: isMobile ? 0 : -20 }]}><Text style={styles.quoteMarkText}>"</Text></View>
            <Text style={styles.explanationText}>
              Cada vez que suena esta canción me transporta directamente a esos momentos nuestros. Es increíble cómo una melodía puede guardar tantos recuerdos.
            </Text>
          </View>
        </View>
      </FadeInView>

      {/* --- SECCIÓN NUEVA: EL MAPA --- */}
      <FadeInView delay={600} style={[styles.section, { paddingHorizontal: isMobile ? 20 : 0 }]}>
        <Text style={styles.sectionTitle}>Distancia (dos saltos)</Text>
        
        <View style={styles.routeMapCard}>
           <View style={styles.routeVisual}>
              <View style={styles.cityCol}>
                 <Text style={styles.cityText}>Zgz</Text>
                 <Text style={styles.citySub}>Zaragoza</Text>
              </View>

              <View style={styles.routeLineBox}>
                 <Text style={styles.routeKm}>300 Kilómetros</Text>
                 <View style={styles.dashedLineContainer}>
                    <View style={styles.routeDot} />
                    <View style={styles.dashedLine} />
                    <View style={styles.routeDot} />
                 </View>
              </View>

              <View style={styles.cityCol}>
                 <Text style={styles.cityText}>Bil</Text>
                 <Text style={styles.citySub}>Bilbao</Text>
              </View>
           </View>

           <Pressable style={({ pressed }) => [styles.mapButton, { opacity: pressed ? 0.8 : 1 }]} onPress={openMap}>
              <Text style={styles.mapButtonText}>VER RUTA EN GOOGLE MAPS 📍</Text>
           </Pressable>
        </View>
      </FadeInView>

      {/* --- SECCIÓN 3: RAZONES --- */}
      <FadeInView delay={700} style={[styles.section, { paddingHorizontal: isMobile ? 20 : 0 }]}>
        <Text style={styles.sectionTitle}>3 cosas que amo de ti</Text>
        <View style={styles.reasonsGrid}>
          <HoverReasonCard number="01" text="Cómo iluminas cualquier sitio en el que entras con tu sonrisa y tu energía." />
          <HoverReasonCard number="02" text="Esa forma tan tuya de entender mis chistes malos y reírte de ellos." />
          <HoverReasonCard number="03" text="Que a pesar de los 300 kilómetros, siempre te siento a mi lado." />
        </View>
      </FadeInView>

      {/* --- SECCIÓN 4: GALERÍA POR VIAJES --- */}
      <FadeInView delay={800} style={[styles.section, { paddingHorizontal: isMobile ? 20 : 0, marginTop: 40 }]}>
         <Text style={[styles.sectionTitle, { marginBottom: 30 }]}>El Archivo</Text>
         <Text style={styles.archiveSubtitle}>Nuestros momentos, clasificados (pulsa en el título para ampliar).</Text>
         
         <View style={styles.archiveContainer}>
            {/* TANDA 1: BILBAO - Actualizado con foto1 y foto2 */}
            <TravelGallery 
               location="Bilbao, País Vasco" 
               date="7 - 8 Marzo 2026" 
               photos={[
                 require('./assets/foto3.png'),
                 require('./assets/foto4.png'),
                 require('./assets/foto5.png'),
                 require('./assets/foto6.png'),
                 require('./assets/foto1.png'), // AÑADIDA
                 require('./assets/foto2.png'), // AÑADIDA
               ]} 
               onPressTitle={() => openGalleryViewer(
                 [
                   require('./assets/foto3.png'),
                   require('./assets/foto4.png'),
                   require('./assets/foto5.png'),
                   require('./assets/foto6.png'),
                   require('./assets/foto1.png'),
                   require('./assets/foto2.png'),
                 ],
                 "Bilbao, País Vasco",
                 "7 - 8 Marzo 2026"
               )}
            />
         </View>
      </FadeInView>

      {/* FOOTER */}
      <FadeInView delay={900} style={styles.footer}>
        <Text style={styles.footerText}>DE JUANILLO A NUNUS</Text>
      </FadeInView>

      {/* MODAL VISUALIZADOR DE FOTOS AMPLIADO */}
      <PhotoViewerModal 
        visible={viewerVisible} 
        onClose={() => setViewerVisible(false)} 
        {...currentGallery} 
      />

    </ScrollView>
  );
}

// ==========================================
// ESTILOS
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', paddingVertical: 50 },
  headerText: { color: COLORS.accent, letterSpacing: 6, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  headerLine: { width: 30, height: 2, backgroundColor: COLORS.accent, marginTop: 15, opacity: 0.5, marginBottom: 30 },
  
  counterContainer: { alignItems: 'center', backgroundColor: '#0A0A0A', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#1A1A1A' },
  counterTitle: { color: COLORS.lightText, fontSize: 10, letterSpacing: 2, marginBottom: 15 },
  counterNumbersRow: { flexDirection: 'row', gap: 10 },
  timeBox: { alignItems: 'center', minWidth: 45 },
  timeNum: { color: COLORS.paper, fontSize: 24, fontWeight: '900', fontFamily: 'monospace' },
  timeLabel: { color: COLORS.accent, fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },

  section: { width: '100%', maxWidth: 900, alignSelf: 'center', paddingVertical: 40 },
  
  cardContent: { paddingLeft: 80, paddingRight: 30, paddingTop: 30, paddingBottom: 40 },
  nativeMarginLine: { position: 'absolute', left: 79, top: 0, bottom: 0, width: 2, backgroundColor: COLORS.margin },
  paperCard: { padding: 20, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.4, shadowRadius: 30, elevation: 10, position: 'relative', overflow: 'hidden' },
  title: { fontSize: 46, color: COLORS.accent, textAlign: 'center', marginBottom: 40, fontFamily: 'serif', fontStyle: 'italic', lineHeight: 50 },
  letterText: { color: COLORS.text, lineHeight: 32, marginBottom: 10 },
  signature: { fontSize: 40, color: COLORS.accent, textAlign: 'right', marginTop: 10 },
  
  imageWrapper: { width: '100%', alignItems: 'center', marginTop: 30, paddingRight: 50 },
  polaroidFrame: { backgroundColor: '#FFF', padding: 12, paddingBottom: 45, borderRadius: 2, shadowColor: '#000', shadowOffset: { width: 5, height: 10 }, shadowOpacity: 0.2, position: 'relative' },
  letterImage: { width: 320, height: 320, resizeMode: 'cover', backgroundColor: '#EEE' },
  polaroidCaption: { position: 'absolute', bottom: 15, width: '100%', textAlign: 'center', fontFamily: 'serif', fontStyle: 'italic', fontSize: 16, color: '#333' },

  songSection: { paddingHorizontal: 20, marginVertical: 40 },
  sectionTitle: { fontSize: 36, color: '#FFF', textAlign: 'center', fontFamily: 'serif', marginBottom: 60, letterSpacing: 1 },
  songContainer: { justifyContent: 'space-between', alignItems: 'center' },
  playerCard: { backgroundColor: COLORS.paper, padding: 30, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.5, shadowRadius: 30, alignItems: 'center' },
  albumCover: { width: 200, height: 200, borderRadius: 10, marginBottom: 25 },
  songTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 5, textAlign: 'center' },
  songArtist: { fontSize: 15, color: COLORS.lightText, marginBottom: 30 },
  spotifyButton: { backgroundColor: '#1DB954', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 50, width: '100%', alignItems: 'center' },
  spotifyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12, letterSpacing: 1.5 },
  songTextWrapper: { justifyContent: 'center', position: 'relative' },
  quoteMark: { position: 'absolute', top: -40, opacity: 0.1 },
  quoteMarkText: { fontSize: 120, fontFamily: 'serif', color: COLORS.accent },
  explanationText: { fontSize: 18, color: '#CCCCCC', lineHeight: 32, marginBottom: 20, fontFamily: 'serif', fontStyle: 'italic' },

  routeMapCard: { backgroundColor: COLORS.routeMap, borderRadius: 16, padding: 30, borderWidth: 1, borderColor: '#222', alignItems: 'center' },
  routeVisual: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  cityCol: { alignItems: 'center', width: 80 },
  cityText: { fontSize: 28, fontWeight: '900', color: '#FFF', letterSpacing: 2 },
  citySub: { fontSize: 12, color: COLORS.lightText, textTransform: 'uppercase', letterSpacing: 1, marginTop: 5 },
  routeLineBox: { flex: 1, alignItems: 'center', paddingHorizontal: 15 },
  routeKm: { fontSize: 16, fontWeight: 'bold', color: COLORS.accent, marginBottom: 10 },
  dashedLineContainer: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  routeDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.accent },
  dashedLine: { flex: 1, height: 2, borderWidth: 1, borderColor: '#444', borderStyle: 'dashed', marginHorizontal: 5 },
  mapButton: { paddingVertical: 12, paddingHorizontal: 25, borderRadius: 30, borderWidth: 1, borderColor: COLORS.accent, backgroundColor: 'rgba(217, 67, 67, 0.1)' },
  mapButtonText: { color: COLORS.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },

  reasonsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 25 },
  reasonCard: { backgroundColor: COLORS.cardBg, padding: 35, borderRadius: 12, borderWidth: 1, alignItems: 'center', position: 'relative' },
  reasonNumber: { fontSize: 50, fontWeight: '900', color: 'rgba(217, 67, 67, 0.1)', position: 'absolute', top: 10, left: 20 },
  reasonText: { fontSize: 16, color: '#EEEEEE', textAlign: 'center', lineHeight: 26, fontFamily: 'serif', marginTop: 20 },

  archiveSubtitle: { color: COLORS.lightText, textAlign: 'center', fontSize: 16, marginTop: -20, marginBottom: 50, fontStyle: 'italic', fontFamily: 'serif' },
  archiveContainer: { backgroundColor: '#0A0A0A', borderRadius: 16, padding: 30, borderWidth: 1, borderColor: '#1A1A1A' },
  travelBlock: { marginBottom: 30 },
  travelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, padding: 10, borderRadius: 8 },
  travelLocationBox: { flexDirection: 'row', alignItems: 'center' },
  travelIcon: { fontSize: 20, marginRight: 10 },
  travelLocation: { color: '#FFF', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 },
  travelDateBox: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  travelDate: { color: COLORS.accent, fontSize: 14, fontWeight: '600', fontFamily: 'monospace' },
  expandIcon: { fontSize: 16, opacity: 0.7 }, 
  travelPhotosGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 15 },
  travelPhotoWrapper: { aspectRatio: 1, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#222' },
  travelPhoto: { width: '100%', height: '100%', resizeMode: 'cover' },
  travelDivider: { height: 1, backgroundColor: '#1A1A1A', marginTop: 30 },

  footer: { paddingVertical: 80, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#111', marginTop: 40 },
  footerText: { color: COLORS.lightText, fontSize: 10, letterSpacing: 4 },

  // ESTILOS DEL MODAL (PhotoViewer)
  modalOverlay: { flex: 1, backgroundColor: COLORS.overlay, justifyContent: 'center', alignItems: 'center' },
  modalCloseButton: { position: 'absolute', top: 40, right: 40, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.1)', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  modalCloseText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  modalScrollContent: { alignItems: 'center', paddingVertical: 100 },
  modalHeader: { alignItems: 'center', marginBottom: 60, paddingHorizontal: 20 },
  modalLocation: { color: '#FFF', fontSize: 32, fontWeight: 'bold', letterSpacing: 2, marginBottom: 10, textAlign: 'center' },
  modalDate: { color: COLORS.accent, fontSize: 18, fontWeight: '600', fontFamily: 'monospace' },
  modalPhotosList: { gap: 30, alignItems: 'center' },
  modalPhoto: { height: undefined, aspectRatio: 1, borderRadius: 8, resizeMode: 'contain', borderWidth: 1, borderColor: '#333' }
});