import { useState, useEffect } from 'react';

const ASSETS = [
    {
        title: "GitHub",
        media: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
    },
    {
        title: "Antigravity",
        media: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "AI Studio",
        media: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    },
    {
        title: "Vercel",
        media: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Supabase",
        media: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    },
    {
        title: "Skills",
        media: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    },
];

const INTERVAL_MS = 1500;

export function ModelsShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % ASSETS.length);
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full bg-black text-white overflow-hidden" id="models" style={{ minHeight: '100vh' }}>
            {/* Background images — crossfade on activeIndex change */}
            {ASSETS.map((item, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={item.media}
                        alt={item.title}
                        className="w-full h-full object-cover mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20" />
                </div>
            ))}

            {/* Content overlay */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-24">

                    {/* Left: static description */}
                    <div>
                        <h2 className="text-5xl md:text-7xl font-sans tracking-tight font-medium mb-6 leading-[1.1]">
                            Use The Ultimate,<br /> Modern Stack
                        </h2>
                        <p className="text-xl text-white/70 max-w-md font-light leading-relaxed">
                            Combine cutting-edge AI agents and the best developer tools available. Turn your creative vision into a scalable, high-performance web experience in hours, not weeks.
                        </p>

                        {/* Dot indicators */}
                        <div className="flex gap-2 mt-10">
                            {ASSETS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-red-500 w-8' : 'bg-white/30 w-4'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: active tool title — fades in/out */}
                    <div className="relative flex items-center" style={{ minHeight: '10rem' }}>
                        {ASSETS.map((item, i) => (
                            <h3
                                key={i}
                                className={`absolute text-6xl md:text-8xl lg:text-[7rem] font-sans tracking-tight font-light transition-all duration-500 cursor-default select-none ${i === activeIndex
                                        ? 'text-[#ff4040] opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-3 pointer-events-none'
                                    }`}
                            >
                                {item.title}
                            </h3>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
