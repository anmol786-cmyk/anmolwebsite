'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroImageGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {/* Image 1 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl group"
            >
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full w-full relative"
                >
                    <Image
                        src="https://anmolsweets.se/wp-content/uploads/2025/11/catering-post-mehndi-scaled-e1764317082742.jpg"
                        alt="Mehndi Ceremony Catering Setup"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </motion.div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl group mt-8"
            >
                <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="h-full w-full relative"
                >
                    <Image
                        src="https://anmolsweets.se/wp-content/uploads/2025/11/royal-catering-scaled-e1764317115815.jpg"
                        alt="Royal Catering Event Setup"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </motion.div>
            </motion.div>

            {/* Image 3 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl group"
            >
                <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="h-full w-full relative"
                >
                    <Image
                        src="https://anmolsweets.se/wp-content/uploads/2025/11/Royal-Catering-stage-1-post-e1764317297798.jpg"
                        alt="Catering Stage Setup"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </motion.div>
            </motion.div>

            {/* Image 4 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl group mt-8"
            >
                <motion.div
                    animate={{ y: [12, -12, 12] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="h-full w-full relative"
                >
                    <Image
                        src="https://anmolsweets.se/wp-content/uploads/2025/11/WhatsApp-Image-2025-08-31-at-02.32.01_4d31eee7-e1764323968299.jpg"
                        alt="Wedding Event Catering"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
