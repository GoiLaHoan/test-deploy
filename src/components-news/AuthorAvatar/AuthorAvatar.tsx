export const AuthorAvatarSmall: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <img
    className="w-[30px] h-[30px] rounded-full object-cover bg-[#f7f7f7]"
    src={src ?? "/default-avatar.svg"}
    alt={alt}
  />
);
