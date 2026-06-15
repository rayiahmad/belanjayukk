import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
  Avatar,
} from "@nextui-org/react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { PiSignOutBold } from "react-icons/pi";

interface DropdownUserProps {
  session: Session;
}

export const DropdownUser: React.FC<DropdownUserProps> = ({ session }) => {
  const logout = () => signOut({ callbackUrl: "/" });

  // Ambil huruf pertama dari nama atau email
  const initial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email?.charAt(0).toUpperCase() || "?";

  return (
    <>
      <Dropdown>
        <DropdownTrigger
          aria-label="Profile Actions"
          className="cursor-pointer"
        >
          {session.user?.image ? (
            <div className="border-2 border-amber-500 rounded-full">
              <Image
                src={session.user.image}
                alt="Profile"
                width={33}
                height={33}
                className="rounded-full"
              />
            </div>
          ) : (
            <Avatar
              isBordered
              as="button"
              name={initial}
              size="sm"
              className="transition-transform text-lg text-white bg-amber-500 flex items-center justify-center"
            >
              {initial}
            </Avatar>
          )}
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownSection title="My Account" showDivider>
            <DropdownItem key="profile" className="">
              <p className="font-semibold">{session.user?.name}</p>
              <p className="text-xs">{session.user?.email}</p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem
              key="orders"
              href="/orders"
              startContent={<BsFillCartCheckFill />}
              className=""
            >
              Riwayat Orders
            </DropdownItem>
          </DropdownSection>
          <DropdownItem key="logout">
            <Button
              className="bg-gray-700 flex items-center text-white hover:bg-gray-900 transition-all duration-150"
              onClick={logout}
            >
              <PiSignOutBold size={20} /> Logout
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
