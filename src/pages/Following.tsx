import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Following(){
    return (
    <>
    <div className="flex justify-center items-center w-full">
        <div className="flex justify-between w-1/2 h-auto bg-zinc-900 rounded-lg p-5 border-neutral-500 border-1">
            <div className="flex flex-1 gap-5 items-center w-full">
                <Avatar className="w-15 h-15">
                 <AvatarImage src={"https://randomuser.me/api/portraits/men/32.jpg"} />
                  </Avatar>
                <b className="text-lg">Juanito Perez</b>
            </div>
        <button
        className=" border-neutral-500 border-1 px-2 h-auto rounded-md"
        >Siguiendo
        </button>
        </div>
    </div>
    </>
    )
}

export default Following