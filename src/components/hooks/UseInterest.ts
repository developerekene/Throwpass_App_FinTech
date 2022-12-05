import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/slices/store";
import { calculateInterest } from "../../swr/loan";
// import { RootState } from "../redux/store";
// import { calculateInterest } from "../swr/loan";
import { useDebounce } from "./useDebounce";

export default function useInterest(amount: number, duration: number) {
  const { auth } = useSelector((state: RootState) => state.auth);

  const [interest, setInterest] = useState(0);
  const [message, setMessage] = useState("");
  const handleChange = async () => {
    if (amount === 0 && duration === 0) return;
    const { data, error } = await calculateInterest(
      amount,
      duration,
      auth?.token
    );

    if (data && data.status) {
      setInterest(data.data.interest_amount);
      setMessage(data.message);
    }

    if (error) console.log(error);
  };

  useDebounce(handleChange, 500, [amount, duration]);
  return [interest, message];
}
