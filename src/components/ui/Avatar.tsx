interface AvatarProps {
  src?: string;
  size?: number;
  className?: string;
}

const Avatar = ({ src, size = 40, className = "" }: AvatarProps) => {
  return (
    <img
      src={src || "./default_user.png"}
      alt="Avatar"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      onError={(e) => {
        e.currentTarget.src = "./default_user.png";
      }}
    />
  );
};

export default Avatar;