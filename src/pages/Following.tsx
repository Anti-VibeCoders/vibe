import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Following(){
    return (
    <>
    <div className="flex flex-col justify-center items-center w-full">
        
        <div className="flex justify-between items-center w-3/4 h-auto bg-zinc-900 rounded-lg p-4 border-neutral-500 border-1">
            <div className="flex flex-1 gap-5 items-center w-full">
                <Avatar className="w-15 h-15">
                 <AvatarImage src={"https://randomuser.me/api/portraits/men/32.jpg"} />
                  </Avatar>
                <b className="text-lg font-semibold">Juanito Perez</b>
            </div>
        <button
        className="bg-blue-500 px-4 py-2  rounded-md text-black text-sm font-semibold"
        >Siguiendo
        </button>
        </div>
    </div>
    </>
    )
}

export default Following