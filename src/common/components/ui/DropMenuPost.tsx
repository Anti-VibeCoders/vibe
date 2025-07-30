import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem,} from "@/common/components/ui/dropdown-menu";
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/common/components/ui/dialog"
import { Button } from "@/common/components/ui/button"
import { Bookmark, MessageSquareWarningIcon, MoreHorizontal,UserLock } from 'lucide-react'
import { Textarea } from '@/common/components/ui/textarea'
import { toast } from 'sonner'


function DropMenuPost(){
 return(
    <>
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
    </>
 )   
}

export default DropMenuPost