import { View, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    title:string
    width?: string
    func: () => void
    color?: string
    children?: React.ReactNode
}

const Button = ({title, width, func, color='bg-colorBtn', children}:ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={func}
      className={`${color} p-5 rounded ${width} items-center`}
    >
      <Text className="text-colorBGCard text-xl font-bold gap-10">{children} {title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
