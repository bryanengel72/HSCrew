import { useState, useRef, useEffect } from 'react';

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

export function ModelsShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef<(HTMLHeadingElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px"
            }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative w-full bg-black text-white" id="models">
            {/* Sticky Background Media */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
                {ASSETS.map((item, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <img
                            src={item.media}
                            alt={item.title}
                            className="w-full h-full object-cover scale-105 opacity-80 mix-blend-luminosity"
                        />
                        {/* Dark gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-[#050505]/40" />
                        <div className="absolute inset-0 bg-[#050505]/20" />
                    </div>
                ))}
            </div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 -mt-[100vh]">

                {/* Left Side: Sticky Description */}
                <div className="hidden md:block">
                    <div className="sticky top-1/3">
                        <h2 className="text-5xl md:text-7xl font-sans tracking-tight font-medium mb-6 leading-[1.1]">
                            Use The Ultimate,<br /> Modern Stack
                        </h2>
                        <p className="text-xl text-white/70 max-w-md font-light leading-relaxed">
                            Combine cutting-edge AI agents and the best developer tools available. Turn your creative vision into a scalable, high-performance web experience in hours, not weeks.
                        </p>
                    </div>
                </div>

                {/* Right Side: Scrolling List */}
                <div className="py-[35vh] flex flex-col gap-6 md:gap-10 pb-[50vh]">
                    {ASSETS.map((item, i) => (
                        <h3
                            key={i}
                            ref={el => itemRefs.current[i] = el}
                            data-index={i}
                            className={`text-5xl md:text-7xl lg:text-[5.5rem] font-sans tracking-tight font-light transition-all duration-300 w-fit cursor-default ${i === activeIndex ? 'text-[#ff4040] scale-100 opacity-100' : 'text-white scale-95 opacity-50 hover:opacity-100'}`}
                        >
                            {item.title}
                        </h3>
                    ))}
                </div>
            </div>
        </section>
    );
}
