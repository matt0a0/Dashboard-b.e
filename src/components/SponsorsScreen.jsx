import React, { useEffect } from 'react';

// CORREÇÃO:
// 1. Usar o nome da pasta correto: '../assests/logos/' (com três 's')
// 2. Importar ficheiros que existem na sua pasta 'src/assests/logos/'

// Exemplo usando ficheiros da sua listagem:
import logoPrincipal from '../assests/logos/logo.svg'; // Exemplo, pode ser o logo do seu projeto
import logoAneel from '../assests/logos/aneel.jpeg';
import logoUfpa from '../assests/logos/ufpa.png';
// Adicione mais importações conforme necessário para os outros ficheiros da sua pasta:
import logoCemazon from '../assests/logos/cemazon.jpeg';
import logoFadesp from '../assests/logos/fadesp.png';
import logoGhport from '../assests/logos/ghport.jpeg';
import logoGtnav from '../assests/logos/gtnav.avif';
import logoWeg from '../assests/logos/weg.png';


// Estilos inline (mantidos)
const styles = {
  sponsorsContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'var(--bg-dark)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    color: 'var(--text-primary)',
    padding: '20px',
    boxSizing: 'border-box',
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '30px',
  },
  logosContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    maxWidth: '800px',
  },
  logoImage: {
    maxHeight: '80px',
    maxWidth: '180px',
    objectFit: 'contain',
    filter: 'grayscale(30%) brightness(1.5)',
  },
  message: {
    marginTop: '40px',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  }
};

// Lista de patrocinadores (agora usa as imagens importadas corretamente)
const sponsors = [
  // Ajuste os nomes e quais logótipos usar para cada patrocinador
  { name: 'Logótipo Principal', logo: logoPrincipal }, 
  { name: 'ANEEL', logo: logoAneel },
  { name: 'UFPA', logo: logoUfpa },
  { name: 'CEMAZON', logo: logoCemazon },
  { name: 'FADESP', logo: logoFadesp },
  { name: 'GH Port', logo: logoGhport },
  { name: 'GTNAV', logo: logoGtnav },
  { name: 'WEG', logo: logoWeg },
];

const SponsorsScreen = ({ onFinished }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished();
    }, 4000); 

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div style={styles.sponsorsContainer}>
      <h2 style={styles.title}>Com o Apoio De:</h2>
      <div style={styles.logosContainer}>
        {sponsors.map((sponsor, index) => (
          <img 
            key={index} 
            src={sponsor.logo} 
            alt={`Logótipo ${sponsor.name}`} 
            style={styles.logoImage} 
            onError={(e) => { 
              e.target.src = 'https://placehold.co/150x70/223547/e1e1e1?text=Logo+Erro&font=roboto';
              e.target.alt = 'Logótipo com erro';
            }}
          />
        ))}
      </div>
      <p style={styles.message}>A carregar o dashboard...</p>
    </div>
  );
};

export default SponsorsScreen;
