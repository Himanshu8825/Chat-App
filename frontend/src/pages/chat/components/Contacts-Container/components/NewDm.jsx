import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { animationDefaultAnimation } from '@/lib/utils';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Lottie from 'react-lottie';

const NewDm = () => {
  const [openNewContact, setOpenNewContact] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setOpenNewContact(true)}
              className=" text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none p-3 mb-2 text-white">
            Select new contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContact} onOpenChange={setOpenNewContact}>
        <DialogContent className=" bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              //   value={searchedContacts}
              onChange={(e) => searchContacts(e.target.value)}
              placeholder="Searcgh contacts"
              className=" rounded-lg p-5 bg-[#2c2e3b] border-none"
            />
          </div>

          {searchedContacts.length <= 0 && (
            <div className=" flex-1 md:bg-[#1c1d25] md:flex flex-col  justify-center items-center hidden duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultAnimation}
              />

              <div className=" text-opacity-80 text-white flex flex-col gap-5 items-center mt-5  text-xl transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                  Hii<span className=" text-purple-500">!</span> Search new
                  <span className=" text-purple-500"> Contacts.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
