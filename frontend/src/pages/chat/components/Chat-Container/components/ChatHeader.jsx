import {RiCloseFill} from 'react-icons/ri';

const ChatHeader = () => {
  return (
    <div className="h-[12vh] border-b-2 border-[#2f303b] flx items-center justify-center px-20">
      <div className="flex justify-cente items-center gap-5">
        <div className="flex justify-center items-center gap-3 pt-4">2</div>
        <div className="flex justify-center items-center gap-5">
          <button className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300">
            <RiCloseFill className=" text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
