import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function Error() {
    return (
        <>
            <div className="error-contain flex flex-col items-center justify-center w-full min-h-dvh">
                <p className="dark:text-white font-extrabold text-[410px] text-center uppercase max-lg:text-[300px] max-md:text-[250px] max-sm:text-[150px]">404</p>
                <Link to="/home">
                    <motion.button
                        className="bg-transparent dark:text-white border-b-2 dark:border-b-white p-3 cursor-pointer uppercase font-bold tracking-widest flex"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                    >
                        Regresar
                    </motion.button>
                </Link>
            </div>
        </>
    )
}

export default Error