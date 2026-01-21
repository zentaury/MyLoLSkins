import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'My LoL Skins - Managed Your League of Legends Collection';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #000428, #004e92)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px'
                    }}
                >
                    {/* Simple Icon Representation (Heart/Collection) */}
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#ff0055" />
                    </svg>
                </div>
                <div
                    style={{
                        fontSize: 90,
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: 20,
                        textAlign: 'center',
                    }}
                >
                    My LoL Skins
                </div>
                <div
                    style={{
                        fontSize: 40,
                        color: '#cbd5e1',
                        textAlign: 'center',
                        maxWidth: '800px',
                    }}
                >
                    Track Collection • Wishlist • Share Stats
                </div>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image size config to also set the ImageResponse's width and height.
            ...size,
        }
    );
}
