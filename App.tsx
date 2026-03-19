import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Linking, useWindowDimensions, Platform, Animated, Easing, Modal } from 'react-native';

// --- DEFINICIÓN DE TIPOS PARA TYPESCRIPT ---
interface GalleryData {
  photos: any[];
  location: string;
  date: string;
}

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

const TimeCounter = () => {
  const [timeLeft, setTimeLeft] = useState({ meses: 0, días: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const startDate = new Date('2026-02-06T00:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = now - startDate;
      setTimeLeft({
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
      <Text style={styles.counterTitle}>AGUANTÁNDONOS</Text>
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

const FadeInView = ({ children, delay = 0, style }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 800, delay, useNativeDriver: true })
    ]).start();
  }, [delay]);
  return <Animated.View style={[style, { opacity: fadeAnim, transform: [{ translateY }] }]}>{children}</Animated.View>;
};

const notebookPaperStyle = Platform.select({
  web: {
    backgroundColor: COLORS.paper,
    backgroundImage: `linear-gradient(${COLORS.lines} 1px, transparent 1px), linear-gradient(90deg, transparent 79px, ${COLORS.margin} 1px, ${COLORS.margin} 2px, transparent 81px)`,
    backgroundSize: '100% 32px, 100% 100%',
    backgroundPosition: '0 10px, 0 0',
  },
  default: { backgroundColor: COLORS.paper },
});

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<GalleryData>({ photos: [], location: '', date: '' });

  const openSpotify = () => Linking.openURL('https://open.spotify.com/intl-es/track/6l18mUHOGVZRr5wTyITX0M?si=c3d5c1cf2c414401'); 
  const openMap = () => Linking.openURL('google.com/maps/dir/Zaragoza-delicias,+Av.+de+Navarra,+80,+50011+Zaragoza/Ibis+Bilbao+Barakaldo,+Retuerto,+69+Barrio+De+Kareaga+Norte,+Nº+Reg,+Hbi01170,+48903+San+Vicente+de+Barakaldo,+Bizkaia/@42.3411533,-3.1004446,287251m/data=!3m2!1e3!5s0xd4e50a9b5710ed1:0x2cc3133d7fad94e6!4m13!4m12!1m5!1m1!1s0xd596b49be33de8f:0x28a5a027ddc927aa!2m2!1d-0.91127!2d41.65866!1m5!1m1!1s0xd4e50c3ffffffc9:0xa256f10809693b6c!2m2!1d-3.0101498!2d43.2887683?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D'); 

  const openGalleryViewer = (photos: any[], location: string, date: string) => {
    setCurrentGallery({ photos, location, date });
    setViewerVisible(true);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <FadeInView delay={100} style={styles.header}>
        <Text style={styles.headerText}>UN 6 DE FEBRERO</Text>
        <View style={styles.headerLine} />
        <TimeCounter />
      </FadeInView>

      <View style={[styles.section, { paddingHorizontal: isMobile ? 20 : 0 }]}>
        <View style={[styles.paperCard, notebookPaperStyle]}>
          {Platform.OS !== 'web' && <View style={styles.nativeMarginLine} />}
          <View style={styles.cardContent}>
            <Text style={styles.title}>Para mi Nunus</Text>
            <Text style={[styles.letterText, { fontFamily: Platform.OS === 'web' ? "'Caveat', cursive" : 'serif', fontSize: 24 }]}>
              Hola Eukene,{'\n\n'}
              No te voy a decir nada que no te haya dicho ya unas quinientas veces, pero nunca está mal recordártelo otra vez. Gracias por elegirme desde el primer día. Tú dijiste ese 6 de febrero: "A este no lo dejo escapar", y yo, ¿cómo no me iba a dejar?{'\n\n'}
              Han pasado 40 días a día de hoy que escribo esto, y aún no me creo lo rápido y bien que va todo; me imagino todo a tu lado. Quiero aprender contigo, que seamos un equipo y superar los momentos difíciles sabiendo que nos tenemos el uno al otro, apoyándonos siempre.{'\n\n'}
              Me encantan tus "holaaaaaa", tus chistes que a nadie le hacen gracia, tus zapatitos "nada que ver", tu ropa de Nícoli y que me llames Juanillo.{'\n\n'}
              Quiero recordar también nuestro primer viaje a Bilbao. Aunque igual no era el mejor momento y no salió del todo como hubiésemos querido, ni te imaginas lo feliz que me llegué a sentir. Además, allí, en un portal perdido debajo de San Mamés, te tuve que pedir algo que los dos ya sabíamos de sobra: que Nunus y Juanillo ya estaban juntos.{'\n\n'}
              Acabando ya, quiero que sepas que voy a luchar por ti. Por muchos kilómetros que haya de por medio, aquí estaré esperando mil horas a que me llames...{'\n'}
            </Text>
            <Text style={[styles.signature, { fontFamily: Platform.OS === 'web' ? "'Dancing Script', cursive" : 'serif' }]}>
              Te quiero mucho,{'\n'}Jorge ❤️
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, styles.songSection]}>
        <Text style={styles.sectionTitle}>Nuestra Canción</Text>
        <View style={[styles.songContainer, { flexDirection: isMobile ? 'column' : 'row' }]}>
          <View style={[styles.playerCard, { width: isMobile ? '100%' : '38%', marginBottom: isMobile ? 40 : 0 }]}>
             <Image source={require('./assets/foto1.png')} style={styles.albumCover} />
             <Pressable style={styles.spotifyButton} onPress={openSpotify}>
                <Text style={styles.spotifyButtonText}>REPRODUCIR EN SPOTIFY</Text>
             </Pressable>
          </View>
          <View style={[styles.songTextWrapper, { width: isMobile ? '100%' : '55%', paddingHorizontal: isMobile ? 0 : 20 }]}>
            <Text style={styles.explanationText}>
              La cantaría mil veces más contigo
            </Text>
          </View>
        </View>
      </View>

      {/* --- SECCIÓN AÑADIDA: EL MAPA --- */}
      <View style={[styles.section, { paddingHorizontal: isMobile ? 20 : 0 }]}>
        <Text style={styles.sectionTitle}>Distancia (dos saltos)</Text>
        
        <View style={styles.routeMapCard}>
           <View style={styles.routeVisual}>
              <View style={styles.cityCol}>
                 <Text style={styles.cityText}>Zgz</Text>
                 <Text style={styles.citySub}>Zaragoza</Text>
              </View>

              <View style={styles.routeLineBox}>
                 <Text style={styles.routeKm}>303 Kilómetros</Text>
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
      </View>



      <View style={styles.footer}>
        <Text style={styles.footerText}>DE JUANILLO A NUNUS</Text>
      </View>

      <Modal animationType="fade" transparent={true} visible={viewerVisible} onRequestClose={() => setViewerVisible(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalCloseButton} onPress={() => setViewerVisible(false)}><Text style={{color:'#FFF'}}>✕</Text></Pressable>
          <ScrollView contentContainerStyle={{alignItems:'center', paddingVertical: 50}}>
            <Text style={styles.modalLocation}>{currentGallery.location}</Text>
            {currentGallery.photos.map((p, i) => <Image key={i} source={p} style={styles.modalPhoto} />)}
          </ScrollView>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', paddingVertical: 50 },
  headerText: { color: COLORS.accent, letterSpacing: 6, fontSize: 11, fontWeight: '800' },
  headerLine: { width: 30, height: 2, backgroundColor: COLORS.accent, marginVertical: 15 },
  counterContainer: { alignItems: 'center', backgroundColor: '#0A0A0A', padding: 20, borderRadius: 12 },
  counterTitle: { color: COLORS.lightText, fontSize: 10, marginBottom: 15 },
  counterNumbersRow: { flexDirection: 'row', gap: 10 },
  timeBox: { alignItems: 'center', minWidth: 45 },
  timeNum: { color: COLORS.paper, fontSize: 24, fontWeight: '900' },
  timeLabel: { color: COLORS.accent, fontSize: 9 },
  section: { width: '100%', maxWidth: 900, alignSelf: 'center', paddingVertical: 40 },
  paperCard: { borderRadius: 8, overflow: 'hidden', elevation: 10 },
  cardContent: { paddingLeft: 80, paddingRight: 30, paddingVertical: 40 },
  nativeMarginLine: { position: 'absolute', left: 79, top: 0, bottom: 0, width: 2, backgroundColor: COLORS.margin },
  title: { fontSize: 46, color: COLORS.accent, textAlign: 'center', marginBottom: 40, fontStyle: 'italic' },
  letterText: { color: COLORS.text, lineHeight: 32 },
  signature: { fontSize: 36, color: COLORS.accent, textAlign: 'right', marginTop: 20 },
  songSection: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 36, color: '#FFF', textAlign: 'center', marginBottom: 40 },
  songContainer: { justifyContent: 'space-between', alignItems: 'center' },
  playerCard: { backgroundColor: COLORS.paper, padding: 30, borderRadius: 16, alignItems: 'center' },
  albumCover: { width: 200, height: 200, borderRadius: 10, marginBottom: 25 },
  spotifyButton: { backgroundColor: '#1DB954', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 50 },
  spotifyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  songTextWrapper: { justifyContent: 'center' },
  explanationText: { fontSize: 18, color: '#CCCCCC', fontStyle: 'italic' },
  
  // --- ESTILOS DEL MAPA AÑADIDOS ---
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

  archiveContainer: { backgroundColor: '#0A0A0A', borderRadius: 16, padding: 20 },
  travelHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  travelLocation: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  travelDate: { color: COLORS.accent, fontSize: 14 },
  travelPhotosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  travelPhoto: { aspectRatio: 1, borderRadius: 8 },
  footer: { paddingVertical: 80, alignItems: 'center' },
  footerText: { color: COLORS.lightText, fontSize: 10, letterSpacing: 4 },
  modalOverlay: { flex: 1, backgroundColor: COLORS.overlay },
  modalCloseButton: { position: 'absolute', top: 40, right: 40, zIndex: 10 },
  modalLocation: { color: '#FFF', fontSize: 24, marginBottom: 30 },
  modalPhoto: { width: 300, height: 300, marginBottom: 20, borderRadius: 10 }
});