import type { Post } from '@/common/types/post';
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, createContext, useState, useEffect, type ReactNode } from 'react'

interface ImageContextType {
    showImage: (post: Post) => void;
    hideImage: () => void;
    isVisible: boolean;
}

export const ImageContext = createContext<ImageContextType | null>(null)

export function ImageProvider({ children }: { children: ReactNode }) {
    const [showPreview, setShowPreview] = useState(false)
    const [currentPost, setCurrentPost] = useState<Post | null>()

    useEffect(() => {
        if (!showPreview) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowPreview(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            removeEventListener('keydown', handleKeyDown)
        }
    }, [showPreview])

    const showImage = (post: Post) => {
        if (!post.image) return
        setCurrentPost(post)
        setShowPreview(true)
    }

    const hideImage = () => {
        setShowPreview(false)

        setTimeout(() => setCurrentPost(null), 300)
    }

    const contextValue: ImageContextType = {
        showImage,
        hideImage,
        isVisible: showPreview
    }

    return (
        <>
            <ImageContext.Provider value={contextValue}>
                {children}
                <AnimatePresence>
                    {showPreview && currentPost?.image && (
                        <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-100 overflow-hidden"
                        onClick={hideImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        >
                            <motion.img
                            src={currentPost?.image} 
                            alt={`Post de ${currentPost.user}`} className="max-h-[90dvh] max-w-[90vw] rounded shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            />
                            <motion.button 
                            className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            >×</motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </ImageContext.Provider>
        </>
    )
}

export function useImagePreview() {
    const context = useContext(ImageContext)
    if (!context) {
        throw new Error("useImage needs to be wrapped by ImageProvider")
    }
    return context
}