import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Linking, useWindowDimensions } from 'react-native';

// --- PALETA DE COLORES ---
const COLORS = {
  bg: '#FFF8F0',       // Crema cálido para el fondo general
  paper: '#FFFFFF',    // Blanco puro para las "tarjetas" o zonas de lectura
  accent: '#D94343',   // Rojo pasión/elegante
  text: '#2C2C2C',     // Gris muy oscuro para el texto (menos agresivo que el negro)
  lightText: '#777777' // Gris clarito para textos secundarios
};

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Función para abrir Spotify
  const openSpotify = () => {
    // Aquí pondrás el link de tu canción, por ahora pongo uno de ejemplo
    Linking.openURL('https://open.spotify.com/intl-es/track/6l18mUHOGVZRr5wTyITX0M?si=0569719bae744c18'); 
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER SIMPLE */}
      <View style={styles.header}>
        <Text style={styles.headerText}>02 [ MINE ] 09</Text>
      </View>

      {/* --- SECCIÓN 1: LA CARTA --- */}
      <View style={[styles.section, { paddingHorizontal: isMobile ? 20 : 0 }]}>
        <View style={styles.paperCard}>
          <Text style={styles.title}>Para mi Nunus</Text>
          
          <Text style={styles.letterText}>
            Mi amor,{'\n\n'}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{'\n\n'}
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{'\n\n'}
            Con todo mi amor,{'\n'}
            Jorge ❤️
          </Text>

          {/* FOTO DE LA CARTA */}
          {/* Asegúrate de tener una foto1.jpg en tu carpeta assets */}
          <View style={styles.imageWrapper}>
            <Image source={require('./assets/foto1.png')} style={styles.letterImage} />
          </View>
        </View>
      </View>

      {/* --- SECCIÓN 2: LA CANCIÓN --- */}
      <View style={[styles.section, styles.songSection]}>
        <Text style={styles.sectionTitle}>Nuestra Canción</Text>
        
        <View style={[styles.songContainer, { flexDirection: isMobile ? 'column' : 'row' }]}>
          
          {/* Tarjeta del Reproductor */}
          <View style={[styles.playerCard, { width: isMobile ? '100%' : '40%' }]}>
             {/* Necesitarás añadir una foto cuadrada de la portada en assets */}
             <Image source={require('./assets/foto2.png')} style={styles.albumCover} />
             <Text style={styles.songTitle}>Nombre de vuestra canción</Text>
             <Text style={styles.songArtist}>Artista de la canción</Text>
             
             <Pressable style={styles.spotifyButton} onPress={openSpotify}>
                <Text style={styles.spotifyButtonText}>▶ Reproducir en Spotify</Text>
             </Pressable>
          </View>

          {/* Texto Explicativo */}
          <View style={[styles.songTextWrapper, { width: isMobile ? '100%' : '55%', marginTop: isMobile ? 30 : 0 }]}>
            <Text style={styles.explanationText}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac odio ac leo imperdiet vehicula. Phasellus placerat quis neque id vulputate. Quisque finibus, tortor sit amet mollis finibus, ipsum tortor rhoncus lectus, nec convallis eros tellus mattis libero."
            </Text>
            <Text style={styles.explanationText}>
              "Maecenas lobortis at nisl et tincidunt. Nullam eget risus vitae urna commodo aliquet sed non justo. Nullam nec turpis ac augue sodales venenatis."
            </Text>
          </View>

        </View>
      </View>

      {/* --- SECCIÓN 3: IDEAS EXTRA (3 COSAS QUE AMO DE TI) --- */}
      <View style={[styles.section, { paddingHorizontal: isMobile ? 20 : 0 }]}>
        <Text style={styles.sectionTitle}>3 cosas que amo de ti</Text>
        
        <View style={styles.reasonsGrid}>
          <View style={styles.reasonCard}>
            <Text style={styles.reasonNumber}>01</Text>
            <Text style={styles.reasonText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </View>
          <View style={styles.reasonCard}>
            <Text style={styles.reasonNumber}>02</Text>
            <Text style={styles.reasonText}>Phasellus placerat quis neque id vulputate sed non justo.</Text>
          </View>
          <View style={styles.reasonCard}>
            <Text style={styles.reasonNumber}>03</Text>
            <Text style={styles.reasonText}>Nullam eget risus vitae urna commodo aliquet nec turpis.</Text>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Hecho con amor | 2026</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217, 67, 67, 0.2)', // Línea roja muy sutil
  },
  headerText: {
    color: COLORS.accent,
    letterSpacing: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    paddingVertical: 60,
  },
  
  // SECCIÓN CARTA
  paperCard: {
    backgroundColor: COLORS.paper,
    padding: 40,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  title: {
    fontSize: 42,
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'serif', // Fuente clásica
    fontStyle: 'italic',
  },
  letterText: {
    fontSize: 18,
    color: COLORS.text,
    lineHeight: 32,
    fontFamily: 'serif',
    marginBottom: 40,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  letterImage: {
    width: '100%',
    maxWidth: 500,
    height: 350,
    borderRadius: 4,
    resizeMode: 'cover',
    borderWidth: 8,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  // SECCIÓN CANCIÓN
  songSection: {
    backgroundColor: '#FFF1E6', // Un crema ligeramente diferente para separar
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 32,
    color: COLORS.accent,
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 50,
  },
  songContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerCard: {
    backgroundColor: COLORS.paper,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
  },
  albumCover: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
    textAlign: 'center',
  },
  songArtist: {
    fontSize: 14,
    color: COLORS.lightText,
    marginBottom: 20,
  },
  spotifyButton: {
    backgroundColor: '#1DB954', // Verde Spotify (o pon COLORS.accent si lo prefieres rojo)
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  spotifyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  songTextWrapper: {
    justifyContent: 'center',
  },
  explanationText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 28,
    marginBottom: 20,
    fontStyle: 'italic',
  },

  // SECCIÓN RAZONES
  reasonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  reasonCard: {
    backgroundColor: COLORS.paper,
    width: 250,
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
    borderTopWidth: 4,
    borderTopColor: COLORS.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  reasonNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'rgba(217, 67, 67, 0.2)', // Rojo transparente
    marginBottom: 15,
  },
  reasonText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 24,
  },

  // FOOTER
  footer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.lightText,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  }
});