import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function Error() {
    const navigate = useNavigate()
    const buttonText = "Regresar"

    return (
        <>
            <div className="error-contain flex flex-col items-center justify-center w-full min-h-dvh">
                <p className="dark:text-white font-extrabold text-[410px] text-center uppercase max-lg:text-[300px] max-md:text-[250px] max-sm:text-[150px]">404</p>
                <motion.button
                    onClick={() => navigate('/')}
                    className="bg-transparent dark:text-white border-b-2 dark:border-b-white p-3 cursor-pointer uppercase font-bold tracking-widest flex"
                    style={{ letterSpacing: "0.2em", overflow: "hidden" }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                >
                    {[...buttonText].map((char, i) => (
                        <span
                            key={i}
                            className="relative inline-block w-[1ch] h-[1.2em] overflow-hidden"
                            style={{ marginRight: char === " " ? "0.5em" : 0 }}
                        >
                            <motion.span
                                className="block absolute left-0 w-full"
                                variants={{
                                    rest: { y: 0, opacity: 1 },
                                    hover: {
                                        y: 32,
                                        opacity: 0,
                                        transition: { duration: 0.10, delay: i * 0.06 }
                                    }
                                }}
                                style={{ fontSize: "1em", lineHeight: "1.2em" }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                            <motion.span
                                className="block absolute left-0 w-full"
                                variants={{
                                    rest: { y: -32, opacity: 0 },
                                    hover: {
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.10, delay: 0.04 + i * 0.06 }
                                    }
                                }}
                                style={{ fontSize: "1em", lineHeight: "1.2em" }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        </span>
                    ))}
                </motion.button>
            </div>
        </>
    )
}

export default Error