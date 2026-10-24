import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'My LoL Skins - League of Legends skin tracker';
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
                    background: '#000000',
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
                        fontSize: 44,
                        color: '#C89B3C',
                        marginBottom: 20,
                        textAlign: 'center',
                    }}
                >
                    League of Legends skin tracker
                </div>
                <div
                    style={{
                        fontSize: 32,
                        color: '#94a3b8',
                        textAlign: 'center',
                    }}
                >
                    Collection • Wishlist • RP value
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
