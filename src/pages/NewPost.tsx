import {
  Image,
  FileImage,
  SlidersHorizontal,
  Smile,
  Camera,
  MapPin,
} from "lucide-react";
import Button from "@/components/Button";
export default function NewPost() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //todavia no hecho....
  }
  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-center gap-4 w-full">
      <h2 className="text-2xl font-semibold">Nuevo Post</h2>
      <input type="text" className="w-full max-w-md outline-0 p-3" placeholder="Titulo" />
      <textarea
        className="w-full max-w-md resize-none w-full max-w-md p-3 outline-0 h-64 overflow-y-scroll rounded-md"
        placeholder="Cuentanos que piensas hoy..."
      ></textarea>
      <div className="w-full max-w-md p-3 rounded-md border-t border-gray-700 flex justify-between items-center max-w-md mx-auto">
        <div className="flex gap-4 text-sky-400 text-xl">
          <label className="cursor-pointer hover:text-sky-300">
            <input type="file" className="hidden" />
            <Image />
          </label>

          <label className="cursor-pointer hover:text-sky-300">
            <input type="file" className="hidden" />
            <FileImage />
          </label>
          <SlidersHorizontal className="cursor-pointer hover:text-sky-300" />
          <Smile className="cursor-pointer hover:text-sky-300" />
          <Camera className="cursor-pointer hover:text-sky-300" />
          <MapPin className="cursor-pointer hover:text-sky-300" />
        </div>
      </div>
      <Button
        text="Postear"
        withClass="w-20"
        type="submit"
      />
    </form>
  );
}
