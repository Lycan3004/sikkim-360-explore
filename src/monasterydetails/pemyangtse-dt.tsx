import React, { useState, useEffect } from 'react';
import { MapPin, Cloud, Clock, Camera, AlertCircle } from 'lucide-react';
import pemyangtseImage from '@/assets/pemayangtse.webp';
import pemyangtseImage2 from '@/assets/pemayangtse2.jpg';
import pemyangtseImage3 from '@/assets/pemyangtse3.jpg';

const InfoPage: React.FC = () => {
  const [weather, setWeather] = useState<{ temperature?: number; windspeed?: number }>({});

  // Fetch weather data for Pemayangtse Monastery (latitude 27.2853, longitude 88.1833)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=27.3198&longitude=88.2400&current_weather=true`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather({  
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
  }, []);

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
          Pemyangtse Monastery
        </h1>
        <p
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#a1dad7',
            whiteSpace: 'pre-line',
            marginBottom: '1.6rem',
          }}
        >
          {`Perched on a hilltop near Pelling, Pemayangtse Monastery is one of the oldest and most prestigious monasteries in Sikkim. Its name means “Perfect Sublime Lotus”, symbolizing purity and spiritual growth. 
Founded in the 17th century by Lama Lhatsun Chenpo, it belongs to the Nyingma sect of Tibetan Buddhism, the oldest Buddhist tradition. Just 2 km from Pelling, it offers stunning views, especially in spring and summer when the Himalayas are clearly visible.
Pemayangtse was built with the vision of spreading Buddhism across Sikkim. Traditionally, only monks of pure Tibetan lineage were allowed to join here, which added to its exclusivity`}
        </p>
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
                whiteSpace: 'normal',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: '100%',
                textAlign: 'left',
                lineHeight: 1.3,
              }}
            >
              : About 110 km from Gangtok.
              <br />
              </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
              <Cloud size={40} color="#31ffb1" />
              <span
                style={{
                  fontSize: '1.05rem',
                  color: '#89cfc1',
                  whiteSpace: 'normal',
                  overflow: 'visible',
                  textOverflow: 'unset',
                  maxWidth: '100%',
                  textAlign: 'left',
                  lineHeight: 1.3,
                }}
              >
                : March – June,
                <br />
                when the weather is clear.
              </span>
            </div>
            {weather.temperature !== undefined && weather.windspeed !== undefined && (
              <div
                style={{
                  marginLeft: '88px',
                  color: '#9BE3D4',
                  fontSize: '0.95rem',
                  fontStyle: 'italic',
                }}
              >
                Current Temp: {weather.temperature}°C, Wind Speed: {weather.windspeed} km/h
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <Clock size={40} color="#31ffb1" />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#89cfc1',
                whiteSpace: 'normal',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: '100%',
                textAlign: 'left',
                lineHeight: 1.3,
              }}
            >
              : Open daily 9:00 AM – 6:00 PM.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <Camera size={40} color="#31ffb1" />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#89cfc1',
                whiteSpace: 'normal',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: '100%',
                textAlign: 'left',
                lineHeight: 1.3,
              }}
            >
              : Permitted in the outer complex,
              <br />
              restricted inside prayer halls.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <AlertCircle size={40} color="#31ffb1" />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#89cfc1',
                whiteSpace: 'normal',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: '100%',
                textAlign: 'left',
                lineHeight: 1.3,
              }}
            >
              : Visit early morning to experience the
              <br />
              prayers and views.
            </span>
          </div>
        </div>
        <p
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#a1dad7',
            whiteSpace: 'pre-line',
          }}
        >
          {`The monastery houses magnificent statues, murals, and ancient scriptures. Its most striking treasure is the seven-tiered wooden model of Sangtok Palri, the celestial palace of Guru Padmasambhava, crafted by a single monk over years of dedication. From the monastery, visitors are greeted with breathtaking views of the Kanchenjunga range and lush valleys below.
The sound of monks’ chants in the morning adds to its divine atmosphere. Nearby, tourists can also explore the Rabdentse Ruins, the second capital of Sikkim, located within walking distance. 
`}
        </p>
      </div>
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
          src={pemyangtseImage2}
          alt="Pemyangtse Monastery"
          style={{
            width: '100%',
            maxWidth: '650px',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
        <img
          src={pemyangtseImage3}
          alt="Pemyangtse Monastery"
          style={{
            width: '100%',
            maxWidth: '650px',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
        <img
          src={pemyangtseImage}
          alt="Pemyangtse Monastery"
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
