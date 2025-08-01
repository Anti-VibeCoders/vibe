import { useCallback } from "react";

interface SharedData {
    title?: string,
    text?: string,
    url: string,
}

export const useShare = () => {
    const share = useCallback(async (data: SharedData) => {
        if (navigator.share) {
            try {
                await navigator.share(data)
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('Web Share API no disponible :(')
        }
    }, [])

    return share
}