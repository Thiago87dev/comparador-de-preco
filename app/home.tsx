import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import Button from "@/components/Button";
import { FontAwesome } from "@expo/vector-icons";

export default function Home() {
  const inputRef2 = useRef<TextInput | null>(null);
  const inputRef3 = useRef<TextInput | null>(null);
  const inputRef4 = useRef<TextInput | null>(null);

  const [nameProduct1, setNameProduct1] = useState("");
  const [qntProduct1, setQntProduct1] = useState("");
  const [priceProduct1, setPriceProduct1] = useState("");
  const [pricePerQnt1, setPricePerQnt1] = useState<number>(0);

  const [nameProduct2, setNameProduct2] = useState("");
  const [qntProduct2, setQntProduct2] = useState("");
  const [priceProduct2, setPriceProduct2] = useState("");
  const [pricePerQnt2, setPricePerQnt2] = useState<number>(0);

  const [typeQntPicker, setTypeQntPicker] = useState([
    { label: "Gramas", value: "g" },
    { label: "Mililitros", value: "ml" },
    { label: "Unidade", value: "u" },
  ]);
  const [openPicker, setOpenPicker] = useState(false);
  const [valuePicker, setValuePicker] = useState("g");

  const [cheaper, setCheaper] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const getTypeQntText = (code: string | null) => {
    switch (code) {
      case "g":
        return "Gramas";
      case "ml":
        return "Mililitros";
      case "u":
        return "Unidade";
      default:
        return "Digite algo";
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const intValue = parseInt(numericValue || "0", 10);
    const formatted = (intValue / 100).toFixed(2).replace(".", ",");
    return formatted;
  };

  const handleCalc = () => {
    if (!qntProduct1 || !qntProduct2 || !priceProduct1 || !priceProduct2) {
      Alert.alert("Atenção 🚨", "Preencha todos os campos obrigatórios!", [
        { text: "OK" },
      ]);
      return;
    }

    const priceWithComma1 = priceProduct1.replace(",", ".");
    const priceWithComma2 = priceProduct2.replace(",", ".");

    const qntWithComma1 = qntProduct1.replace(",", ".");
    const qntWithComma2 = qntProduct2.replace(",", ".");

    const calc1 = Number(priceWithComma1) / Number(qntWithComma1);
    const calc2 = Number(priceWithComma2) / Number(qntWithComma2);

    setPricePerQnt1(calc1);
    setPricePerQnt2(calc2);

    if (calc1 < calc2) {
      if (nameProduct1) {
        setCheaper(nameProduct1);
      } else {
        setCheaper("Produto 1");
      }
    } else if (calc2 < calc1) {
      if (nameProduct2) {
        setCheaper(nameProduct2);
      } else {
        setCheaper("Produto 2");
      }
    } else {
      setCheaper("Os produtos tem o mesmo custo");
    }

    setModalVisible(true);
  };

  const handleNewCalc = () => {
    setNameProduct1("");
    setNameProduct2("");

    setQntProduct1("");
    setQntProduct2("");

    setPriceProduct1("");
    setPriceProduct2("");
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-colorBG pt-10"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text className="font-bold text-4xl capitalize mx-auto text-colorText">
          comparador de preço
        </Text>
        <View className="w-[35%] mx-auto pt-5">
          <DropDownPicker
            listMode="SCROLLVIEW"
            open={openPicker}
            value={valuePicker}
            items={typeQntPicker}
            setOpen={setOpenPicker}
            setValue={setValuePicker}
            setItems={setTypeQntPicker}
            placeholder="teste"
            textStyle={{ fontSize: 18, fontWeight: "bold", color: "white" }}
            style={{ backgroundColor: "#3A8DFF" }}
            dropDownContainerStyle={{
              backgroundColor: "#3A8DFF",
            }}
            ArrowDownIconComponent={() => (
              <AntDesign name="caretdown" size={16} color={"white"} />
            )}
            ArrowUpIconComponent={() => (
              <AntDesign name="caretup" size={16} color={"white"} />
            )}
            TickIconComponent={() => (
              <AntDesign name="checkcircle" size={16} color={"white"} />
            )}
          />
        </View>

        <View className="gap-2 bg-colorBGCard m-5 rounded-lg p-5">
          <Text className="font-bold text-2xl text-colorTextSecundary">
            Produto 1
          </Text>
          <TextInput
            maxLength={30}
            placeholderTextColor={"#707070"}
            className="border border-colorText rounded-lg  text-colorText font-bold"
            placeholder="Nome do produto (opcional)"
            value={nameProduct1}
            onChangeText={setNameProduct1}
          />
          <View className="flex-row justify-between mt-5">
            <View className="relative flex-row items-center border border-colorText font-bold rounded-md w-[45%] px-3 py-2">
              <TextInput
                maxLength={10}
                placeholderTextColor={"#707070"}
                returnKeyType="next"
                onSubmitEditing={() => inputRef2.current?.focus()}
                className="flex-1 text-colorText text-xl font-bold px-3 py-5"
                placeholder={getTypeQntText(valuePicker)}
                value={qntProduct1}
                keyboardType="numeric"
                onChangeText={setQntProduct1}
              />
              <Text className="text-colorText">{valuePicker}</Text>
              <Text className="absolute -top-1 left-1 text-lg text-red-500">
                *
              </Text>
            </View>
            <View className="relative flex-row items-center border border-colorText font-bold rounded-md w-[45%] px-3 py-2">
              <Text className="text-colorText font-bold">R$</Text>
              <TextInput
                maxLength={10}
                placeholderTextColor={"#707070"}
                ref={inputRef2}
                returnKeyType="next"
                onSubmitEditing={() => inputRef3.current?.focus()}
                className="flex-1 text-colorText text-xl font-bold px-3 py-5"
                placeholder="0,00"
                value={priceProduct1}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const formatted = formatCurrency(text);
                  setPriceProduct1(formatted);
                }}
              />
              <Text className="absolute -top-1 left-1 text-lg text-red-500">
                *
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-2 bg-colorBGCard m-5 rounded-lg p-5">
          <Text className="font-bold text-2xl text-colorTextSecundary">
            Produto 2
          </Text>
          <TextInput
            maxLength={30}
            placeholderTextColor={"#707070"}
            className="border rounded-lg  border-colorText text-colorText font-bold"
            placeholder="Nome do produto (opcional)"
            value={nameProduct2}
            onChangeText={setNameProduct2}
          />
          <View className="relative flex-row justify-between mt-5">
            <View className="flex-row items-center border rounded-md w-[45%] px-3 py-2 border-colorText font-bold">
              <TextInput
                maxLength={10}
                placeholderTextColor={"#707070"}
                ref={inputRef3}
                returnKeyType="next"
                onSubmitEditing={() => inputRef4.current?.focus()}
                className="flex-1  text-colorText text-xl font-bold px-3 py-5"
                placeholder={getTypeQntText(valuePicker)}
                value={qntProduct2}
                keyboardType="numeric"
                onChangeText={setQntProduct2}
              />
              <Text className="text-colorText">{valuePicker}</Text>
              <Text className="absolute -top-1 left-1 text-lg text-red-500">
                *
              </Text>
            </View>
            <View className="relative flex-row items-center border rounded-md w-[45%] px-3 py-2 font-bold border-colorText">
              <Text className="text-colorText">R$</Text>
              <TextInput
                maxLength={10}
                placeholderTextColor={"#707070"}
                ref={inputRef4}
                returnKeyType="done"
                onSubmitEditing={handleCalc}
                className="flex-1 text-colorText text-xl font-bold px-3 py-5"
                placeholder="0,00"
                value={priceProduct2}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const formatted = formatCurrency(text);
                  setPriceProduct2(formatted);
                }}
              />
              <Text className="absolute -top-1 left-1 text-lg text-red-500">
                *
              </Text>
            </View>
          </View>
        </View>
        <View className="items-center flex-row gap-4 justify-center mt-5">
          <Button
            title="Comparar"
            width="w-[40%]"
            func={handleCalc}
            children={<FontAwesome name="dollar" size={24} color="white" />}
          />
          <Button
            title="Limpar"
            color="bg-red-600"
            width="w-[25%]"
            func={handleNewCalc}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="bg-colorBG gap-4 rounded-2xl p-5 w-[80%] shadow-lg">
            {cheaper === "Os produtos tem o mesmo custo" ? (
              <Text className="text-4xl font-bold text-center">{cheaper}</Text>
            ) : (
              <View className="bg-[#226c24] rounded-lg">
                <Text className="text-4xl font-bold text-colorBG text-center">
                  O Produto mais barato é:
                </Text>
                <Text className="font-bold text-center text-colorBG text-5xl ">
                  "{cheaper}"
                </Text>
              </View>
            )}

            <View className="gap-2 bg-colorBGCard  m-5 rounded-lg p-5">
              <Text className="font-bold text-2xl">
                O preço por {getTypeQntText(valuePicker)} do primeiro produto
                (com {qntProduct1} {getTypeQntText(valuePicker)}) é de R${" "}
                {new Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                }).format(pricePerQnt1)}
              </Text>
            </View>
            <View className="gap-2 bg-colorBGCard  m-5 rounded-lg p-5">
              <Text className=" font-bold text-2xl">
                O preço por {getTypeQntText(valuePicker)} do segundo produto
                (com {qntProduct2} {getTypeQntText(valuePicker)}) é de R${" "}
                {new Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                }).format(pricePerQnt2)}
              </Text>
            </View>

            <Button
              title="Voltar"
              children={
                <AntDesign name="arrowleft" size={20} color={"white"} />
              }
              func={() => setModalVisible(false)}
            />

            <Button title="Novo calculo " func={handleNewCalc} />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
