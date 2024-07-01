import Link from "next/link";

interface LinkButtonProps {
  name: string;
  href: string | undefined;
}

const ELink: React.FC<LinkButtonProps> = ({ name, href }) => {
  return (
    <Link
      href={href ? href : "/"}
      passHref
      className="text-white hover:text-gray-200 underline underline-offset-2"
    >
      {name}
    </Link>
  );
};

export default ELink;
