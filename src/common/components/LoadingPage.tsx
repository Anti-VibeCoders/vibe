import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function LoadingPage({ loading } : { loading: boolean }) {
    const controls = useAnimation();

    useEffect(() => {
        if (loading) {
            controls.start({
                opacity: 1,
            });
        } else {
            controls.start({
                opacity: 0,
            });
        }
    }, [loading, controls]);

    return (
        <motion.div
            className="fixed bg-transparent h-full top-0 left-0 w-full flex justify-center items-center -z-10"
            animate={controls}
        >
            <div className="p-4 rounded-md">
                <div className="flex justify-center">
                    <motion.span
                        className="w-6 h-6 my-12 mx-1 bg-neutral-400 rounded-full"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [1, 0],
                            transition: { duration: 1, repeat: 5 }
                        }}
                    />
                    <motion.span
                        className="w-6 h-6 my-12 mx-1 bg-neutral-400 rounded-full"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [1, 0],
                            transition: { duration: 1, repeat: 5, delay: 0.2 }
                        }}
                    />
                    <motion.span
                        className="w-6 h-6 my-12 mx-1 bg-neutral-400 rounded-full"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [1, 0],
                            transition: { duration: 1, repeat: 5, delay: 0.4 }
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default LoadingPage;