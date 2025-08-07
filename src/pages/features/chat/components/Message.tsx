import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar"

function Message({ message, pfp, name, isMine } : { message: string | undefined, pfp: string, name: string | undefined, isMine: boolean }) {
    return (
        <>
        <div className={`message-container flex gap-2 mb-4 ${ isMine && 'flex-row-reverse justify-start text-right' }`}>
            <div className="message-pfp">
                <Avatar className="rounded-full size-8">
                    <AvatarFallback>
                        <img src={pfp} alt="Placeholder" />
                    </AvatarFallback>
                    <AvatarImage src={pfp} alt="Placeholder" />
                </Avatar>
            </div>
            <div className="message-content flex flex-col gap-2">
                <div className="message-header flex gap-2">
                    <div className="message-name font-semibold">{name}</div>
                    <div className="message-date text-neutral-500">10:00</div>
                </div>
                <p className={`message-text p-2 px-4 rounded-2xl bg-neutral-400 text-black break-all max-w-[120ch] inline-block w-auto min-w-0 ${isMine && '!bg-blue-600 text-white'} w-max self-end`}>
                    {message}
                </p>
            </div>
        </div>
        </>
    )
}

export default Message