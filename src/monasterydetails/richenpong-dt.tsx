import React, { useState, useEffect } from 'react';
import { MapPin, Cloud, Clock, Camera, AlertCircle } from 'lucide-react';
import richenpongImage from '@/assets/richenpong.jpeg';
import richenpongImage2 from '@/assets/richenpong2.jpg';
import richenpongImage3 from '@/assets/richenpong3.jpg';

const InfoPage: React.FC = () => {
  const [weather, setWeather] = useState<{ temperature?: number; windspeed?: number }>({});
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=27.1592&longitude=88.2508&current_weather=true`
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
          Richenpong Monastery
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
          {`Rinchenpong Monastery, the third oldest monastery in Sikkim, is perched at an altitude of 5,500 ft and offers breathtaking views of Kanchenjunga and the surrounding Himalayan peaks. Established nearly 300 years ago, this monastery is unique for housing a rare statue of Ati Buddha seated in the Yab-Yum position, something not commonly found in other monasteries`}
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
              : About 123 km from Gangtok.
              <br />
              Richenpong village
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
                September - November
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
              : Open daily 9:00 AM – 5:00 PM.
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
              : Permitted in the outer complex restricted inside prayer halls.
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
              : Go on a walk through Richenpong village to reach the monastery.
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
          {`Located in the quaint Rinchenpong village, the monastery beautifully blends heritage, spirituality, and nature. The trail leading up to the monastery is lined with tall prayer flags fluttering in the mountain breeze, creating a peaceful and meditative atmosphere. This heritage site is a must-visit for those wanting to experience the cultural richness and scenic beauty of West Sikkim`}
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
          src={richenpongImage2}
          alt="Richenpong Monastery"
          style={{
            width: '100%',
            maxWidth: '650px',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
        <img
          src={richenpongImage3}
          alt="Richenpong Monastery"
          style={{
            width: '100%',
            maxWidth: '650px',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
          }}
        />
        <img
          src={richenpongImage}
          alt="Richenpong Monastery"
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
