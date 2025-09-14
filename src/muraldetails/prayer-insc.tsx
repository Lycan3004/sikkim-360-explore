import React from 'react';
import topImage from '@/assets/prayerwheel1.jpg';

const CenteredImageTextPage: React.FC = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #141a26 20%, #1e283e 80%)',
                color: '#c7f6ef',
                fontFamily: "'Montserrat', sans-serif",
                padding: '4rem 6vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={topImage}
                    alt="Top Centered Visual"
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        borderRadius: '24px',
                        boxShadow: '0 20px 48px rgba(49,255,177,0.17)',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: '3rem',
                    background: 'rgba(34, 45, 61, 0.86)',
                    borderRadius: '20px',
                    maxWidth: '2040px',
                    width: '100%',
                    boxShadow: '0 12px 30px rgba(49,255,177,0.09)',
                    padding: '2.2rem 2.5rem',
                    textAlign: 'center',
                }}
            >
                <h2
                    style={{
                        color: '#31ffb1',
                        fontWeight: 700,
                        fontSize: '2rem',
                        margin: '0 0 1.3rem',
                        letterSpacing: '1.3px',
                    }}
                >
                    Buddhist Prayer Wheel Inscriptions
                </h2>
                <p
                    style={{
                        fontSize: '1.15rem',
                        color: '#a1dad7',
                        lineHeight: 1.7,
                    }}
                >
                    The ancient practice of wheel inscriptions, though less widely documented than other forms of epigraphy, offers fascinating insights into the beliefs and customs surrounding mobility, protection, and divine influence in various cultures. These inscriptions, often found on actual chariot or wagon wheels, or sometimes on representations of wheels in art or funerary contexts, served purposes ranging from votive offerings to protective charms. They speak to a time when travel was perilous, and the integrity of a wheel was literally a matter of life or death. The texts etched onto these crucial components were not merely decorative; they were imbued with spiritual or magical intent, seeking to invoke blessings for safe passage, ensure the wheel's durability, or commemorate its journey. The materials used for these inscriptions varied as much as the cultures that created them, from carved wood to cast bronze or iron.
                    <br /><br />
                    One notable example comes from Celtic traditions, where the wheel was a powerful symbol, often associated with the sun, cyclical time, and divine authority. Among the most intriguing Celtic wheel descriptions is one believed to invoke the god Taranis, whose name means "thunderer." Inscriptions or symbols on wheels linked to Taranis often represented his thunderbolt or solar attributes, meant to protect travelers from harm, particularly storms, and to ensure a swift and safe journey. The very act of inscribing the wheel with Taranis's symbols was seen as dedicating the vehicle and its journey to the god's benevolent oversight. This practice underscored the deep connection between the mundane act of travel and the pervasive spiritual beliefs that permeated ancient daily life, demonstrating how even the most practical objects could become conduits for divine favor and protection. Such wheel inscriptions provide unique linguistic and cultural clues, revealing a world where every component of life, including the wheels that turned beneath a traveler's feet, could be sanctified and made meaningful through inscription.
                </p>
            </div>
        </div>
    );
};

export default CenteredImageTextPage;
