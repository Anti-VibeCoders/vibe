import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
type MessageProps = {
    message: string;
    pfp: string;
    name: string;
    isMine: boolean;
    date: string;
}
const Message: React.FC<MessageProps> = ({ message, pfp, name, isMine, date })=>{
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
                    <div className="message-date text-neutral-500">{date}</div>
                </div>
                <p className={`message-text p-2 px-4 rounded-full bg-neutral-600 dark:text-white break-all max-w-[120ch] inline-block w-auto min-w-0 ${isMine && '!bg-blue-600'}`}>
                    {message}
                </p>
            </div>
        </div>
        </>
    )
}

export default Message