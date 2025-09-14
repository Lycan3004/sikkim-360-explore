import React from 'react';
import topImage from '@/assets/mural1.jpg';

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
                    Ancient Buddhist Mural
                </h2>
                <p
                    style={{
                        fontSize: '1.15rem',
                        color: '#a1dad7',
                        lineHeight: 1.7,
                    }}
                >
                    Step into any of Sikkim's revered monasteries, from the grandeur of Rumtek to the ancient calm of Pemayangtse, and you are immediately surrounded by vibrant, sacred murals. These are not just decorative paintings; they are deep spiritual texts painted directly onto the monastery walls. They serve as the visual heart of Tibetan Buddhism in the Himalayas. Created by master artists who follow the careful principles of traditional Thangka art, these large-scale works use rich, natural mineral and vegetable pigments. This gives them an otherworldly and lasting quality that has captured the attention of devotees and visitors for centuries. The imagery in these murals tells a complex and deeply symbolic story, showcasing a pantheon of enlightened beings. You can see depictions of Guru Padmasambhava (Guru Rinpoche), the saint who brought Buddhism to the region, along with calm images of Shakyamuni Buddha and compassionate Bodhisattvas.
                    <br /><br />
                    One particularly striking mural often found near the entrance is the Bhavachakra, or the Wheel of Life. It serves as a strong visual lesson on the cycle of existence (samsara), karma, and the path to liberation. Elsewhere, intricate mandalas act as celestial maps of the enlightened mind, while fearsome wrathful deities stand as fierce protectors of the Buddhist teachings. Their powerful forms are designed to defeat ignorance and obstacles on the spiritual journey. Ultimately, these murals change the physical space of the monastery into a sacred realm, a three-dimensional mandala. They serve as important tools for meditation, visualization, and teaching. They help both monks and lay followers connect with the divine and understand complex philosophical ideas. Each brushstroke reflects an act of devotion, forming a part of Sikkim's vibrant cultural heritage. As a visitor, taking the time to quietly observe these ancient artworks offers a rare and profound insight into the soul of Sikkim—a silent sermon in color and form.

                </p>
            </div>
        </div>
    );
};

export default CenteredImageTextPage;
