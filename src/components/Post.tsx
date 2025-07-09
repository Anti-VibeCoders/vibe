import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Heart, MessageCircle, MessageSquareWarning, MessageSquareWarningIcon, MoreHorizontal, Share, UserLock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'


function Post() {
    const navigate = useNavigate()
    const [showPreview, setShowPreview] = useState<boolean>(false)

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

    return (
        <>
            <Card className="dark:bg-zinc-900 dark:border-zinc-800 h-max w-max max-lg:w-full">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/home/profile')}>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="bg-zinc-700">UV</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">Usuario Vibe</p>
                                    <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                                        ✓
                                    </Badge>
                                </div>
                                <p className="text-sm text-zinc-400">
                                    Usuario Vibe • Hace 2 días
                                </p>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='cursor-pointer'>
                                <Button variant="ghost" size="icon" className="text-zinc-400 cursor-pointer hover:text-white">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem className="cursor-pointer text-red-400 hover:!text-red-400" onSelect={e => e.preventDefault()}>
                                            <MessageSquareWarningIcon className="text-red-400" /> <span className="w-full">Reportar</span>
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>¿Por qué quieres reportar este post?</DialogTitle>
                                            <DialogDescription>
                                                Por favor, describe el motivo de tu reporte. Esta acción no puede ser deshecha.
                                                <Textarea className="mt-4"/>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button className="cursor-pointer bg-red-500 text-white">Reportar</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem className="cursor-pointer" onSelect={e => e.preventDefault()}>
                                            <UserLock /> <span className="w-full">Bloquear</span>
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>¿Estás seguro que quieres bloquear a este usuario?</DialogTitle>
                                            <DialogDescription>
                                                Después del bloqueo reajustaremos su Feed para que no te muestre publicaciones del usuario.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button className="cursor-pointer">Bloquear</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <DropdownMenuItem className="cursor-pointer" onSelect={e => e.preventDefault()} onClick={() =>
                                    toast("Se ha guardado la publicación", {
                                        description: new Date().toLocaleString(),
                                        action: {
                                            label: "Deshacer",
                                            onClick: () => console.log("Deshizo")
                                        }
                                    })
                                }>
                                    <Bookmark /> <span className="w-full">Guardar</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <p className="mb-4 dark:text-zinc-100">Visitando el nuevo museo de arte de RamCode</p>

                    <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                            src="https://lablab.ai/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Flablab-static-eu%2Fimages%2Fteams%2Fcode-craft-ai-x-dev-hackathon%2Fcm9xjjhp80000356vh72r54cz_imageLink_1c5vow03st.jpg&w=640&q=75"
                            alt="Post content"
                            className="w-full h-auto max-h-96 object-cover cursor-pointer"
                            onClick={() => {
                                setShowPreview(!showPreview)
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t dark:border-zinc-800">
                        <div className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-500 cursor-pointer">
                                <Heart className="h-4 w-4 mr-2" />
                                12
                            </Button>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-blue-500 cursor-pointer" onClick={() => navigate('/home/comment/')}>
                                <MessageCircle className="h-4 w-4 mr-2" />
                                13
                            </Button>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-green-500 cursor-pointer">
                                <Share className="h-4 w-4 mr-2" />
                                2
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <AnimatePresence>
                {showPreview && (
                    <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-hidden"
                        onClick={() => setShowPreview(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'ESC') {
                                setShowPreview(false)
                            }
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.img src="https://lablab.ai/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Flablab-static-eu%2Fimages%2Fteams%2Fcode-craft-ai-x-dev-hackathon%2Fcm9xjjhp80000356vh72r54cz_imageLink_1c5vow03st.jpg&w=640&q=75" className="max-h-[90dvh] max-w-[90vw] rounded shadow-lg" onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        />
                        <motion.button className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >×</motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Post