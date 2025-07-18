import { useState } from 'react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Laugh } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className='relactive inline-block'>
      {showPicker && (
        <div className='absolute top-40 z-10 '>
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
      >
        <Laugh className="size-6" />
      </Button>
    </div>
  );
}

export default Emoji;