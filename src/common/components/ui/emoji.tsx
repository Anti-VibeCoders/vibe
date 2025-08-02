import { useState } from 'react';
import EmojiPicker, { type EmojiClickData, Theme } from 'emoji-picker-react';
import { Laugh } from 'lucide-react';
import { Button } from '@/common/components/ui/button';

interface EmojiProps {
  onEmojiSelect: (emoji: string) => void; // Callback para enviar el emoji al padre
}

function Emoji({ onEmojiSelect }: EmojiProps) {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    onEmojiSelect(emojiObject.emoji); // Envía el emoji al padre
    setShowPicker(false); // Oculta el picker
  };

  return (
      <>
      {showPicker && (
          <div className='absolute bottom-40'>
            <EmojiPicker
          width={400}
          height={350}
          theme={'auto' as Theme}
          onEmojiClick={onEmojiClick}
          
        />
          </div>
      )}
      <Button
        variant="ghost"
        onClick={() => setShowPicker(!showPicker)}
        size="icon"
        className="cursor-pointer"
      >
        <Laugh className="size-6" />
      </Button>
      </>
  );
}

export default Emoji;