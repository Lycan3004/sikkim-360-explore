import React from 'react';
import topImage from '@/assets/buddhist-manuscript.jpg';

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
                    Ancient Buddhist Manuscript
                </h2>
                <p
                    style={{
                        fontSize: '1.15rem',
                        color: '#a1dad7',
                        lineHeight: 1.7,
                    }}
                >
                    The Gandhāran Buddhist Texts are the world's oldest surviving Buddhist manuscripts, dating back to the 1st century BCE to the 3rd century CE. Their discovery in earthen pots near the ancient city of Hadda in eastern Afghanistan was a monumental event for Buddhist studies, pushing back the known history of Buddhist literature by several centuries. These fragile texts were meticulously written on birch bark scrolls in the Gāndhārī language, a Prakrit dialect, using the Kharoshthi script, which reads from right to left. The manuscripts offer an unparalleled window into the early development of Buddhism, especially its expansion along the Silk Road.
                    <br /><br />
                    They were created in the Gandhāra kingdom, a major center of Buddhist learning where Hellenistic, Persian, and Indian cultures merged, deeply influencing the region's art and thought. The collection includes a wide variety of materials, such as early versions of well-known sūtras, Jātaka tales of the Buddha's previous lives, doctrinal treatises, and historical narratives, suggesting a rich and diverse intellectual landscape. The preservation of these delicate scrolls, many of which are fragmented, is a testament to the dedication of the ancient scribes.
                    <br /><br />
                    The texts provide crucial evidence of how Buddhist doctrines were transmitted and adapted over time, as some of their contents—such as parts of the Dhammapada—differ significantly from later, more standardized versions. This has spurred a new wave of research, with scholars diligently translating and interpreting the fragments to reconstruct the literary and religious history of this pivotal era. The Gandhāran Buddhist Texts have fundamentally reshaped our understanding of the early Buddhist canon, demonstrating that early Buddhism was not a monolithic tradition but one characterized by a rich diversity of schools and textual variations. They serve as a vital link between the earliest oral traditions and the later Pali and Sanskrit canons, solidifying their status as one of the most important archaeological discoveries of the 20th century.
                </p>
            </div>
        </div>
    );
};

export default CenteredImageTextPage;
