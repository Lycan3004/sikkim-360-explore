import React from 'react';
import { MapPin, Cloud, Clock, Camera, AlertCircle } from 'lucide-react';
import rumtekImage from '@/assets/rumtek.jpg';
import rumtekImage2 from '@/assets/rumtek2.jpg';
import rumtekImage3 from '@/assets/rumtek3.jpg';

const InfoPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #141a26 20%, #1e283e 80%)',
        color: '#c7f6ef',
        fontFamily: "'Montserrat', sans-serif",
        padding: '4rem 6vw',
      }}
    >
      {/* Left text container */}
      <div
        style={{
          flexBasis: '45%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem',
          paddingRight: '3rem',
          maxHeight: 'auto',
          overflowY: 'auto',
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            fontSize: '2.8rem',
            marginBottom: '1rem',
            color: '#31ffb1',
            letterSpacing: '1.6px',
          }}
        >
          Rumtek Monastery
        </h1>

        {/* First two paragraphs */}
        <p
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#a1dad7',
            whiteSpace: 'pre-line',
            marginBottom: '1.6rem',
          }}
        >
          {`Rumtek Monastery is one of the largest and most revered monasteries in Sikkim, located atop a hill about 23 km from Gangtok. Rumtek Monastery was first built in the 16th century by the 9th Karmapa, the spiritual head of the Karma Kagyu sect of Tibetan Buddhism. it belongs to the Kargyu sect of Tibetan Buddhism, which dates back to the 12th century. After the Chinese invasion of Tibet in 1959, the 16th Karmapa, Rangjung Rigpe Dorje, fled to India and rebuilt the monastery in the 1960s. Since then, Rumtek has become the main seat of the Karmapa outside Tibet and a center of Tibetan Buddhist culture in India. Surrounded by lush green mountains, it offers not only spiritual peace but also breathtaking views.


Rumtek Monastery is also known as the Dharma Chakra Centre, a major institute of Buddhist learning.`}
        </p>

        {/* Icons stacked vertically with labels, below first two paragraphs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: '400px',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <MapPin size={40} color="#31ffb1" />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#89cfc1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 120px)',
                textAlign: 'center',
              }}
            >
              : About 23 km (1 hour drive) <div>
                from Gangtok.</div>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <Cloud size={40} color="#31ffb1" />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#89cfc1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 120px)',
                textAlign: 'center',
              }}
            >
              : October – March,<div>
                when the weather is clear.</div>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <Clock size={40} color="#31ffb1" />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#89cfc1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 120px)',
                textAlign: 'center',
              }}
            >
              : Open daily <div>
                8:00 AM – 5:00 PM.</div>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <Camera size={40} color="#31ffb1" />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#89cfc1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 140px)',
                textAlign: 'center',
              }}
            >
              : Permitted in the outer complex<div>
                restricted inside prayer halls.</div>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <AlertCircle size={40} color="#31ffb1" />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#89cfc1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 215px)',
                textAlign: 'center',
              }}
            >
              : Walk the Kora path to
              <div>
                enjoy panoramic </div>
              <div>
                Himalayan views.
              </div>
            </span>
          </div>
        </div>

        {/* Final paragraph */}
        <p
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#a1dad7',
            whiteSpace: 'pre-line',
          }}
        >
          {`The monastery preserves rare manuscripts, thangkas (scroll paintings), and ancient relics, making it one of the richest repositories of Tibetan Buddhist heritage outside Tibet. Rumtek is the official seat of the Karmapa Lama, who is considered the third-highest spiritual leader in Tibetan Buddhism after the Dalai Lama and the Panchen Lama. The monastery's architecture is considered among the finest globally. 


It is designed to spread Buddhist teachings worldwide. Rumtek also preserves a golden stupa and several sculptures belonging to the 16th Karmapa. The Golden Stupa was built to aid the reincarnation of the 16th Karmapa. The monastery comes alive during festivals, especially Losar (Tibetan New Year) and the Cham Dance Festival. Monks perform colorful masked dances accompanied by traditional music, symbolizing the victory of good over evil. These events attract devotees, tourists, and photographers, showcasing the rich culture of Tibetan Buddhism.`}
        </p>
      </div>

      {/* Right image container */}
      <div
        style={{
          flexBasis: '55%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 48px rgba(49,255,177,0.17)',
          background: '#222d3d',
        }}
      >
        <img
          src={rumtekImage2}
          alt="Rumtek Monastery"
          style={{
            width: '100%',
            maxWidth: '650px',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
        <img
          src={rumtekImage3}
          alt="Rumtek Monastery"
          style={{
            width: '100%',
            maxWidth: '650px',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
        <img
          src={rumtekImage}
          alt="Rumtek Monastery"
          style={{
            width: '100%',
            maxWidth: '650px',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default InfoPage;
