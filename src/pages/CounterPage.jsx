import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CounterPage = () => {
  const [countInput, setCountInput] = useState(0);

  const countSelector = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  const incrementCounter = () => {
    dispatch({
      type: "INCREMENT_COUNT",
    });
  };
  const decrementCounter = () => {
    dispatch({
      type: "DECREMENT_COUNT",
    });
  };
  const inputCounter = () => {
    dispatch({
      type: "INPUT_COUNT",
      payload: {
        newCount: countInput,
      },
    });
  };

  return (
    <main className="flex flex-col justify-center items-center gap-4 mx-auto px-4 mt-8 max-w-screen min-h-[80vh]">
      <p className="text-5xl font-bold">Count: {countSelector.count}</p>
      <div className="flex items-center gap-4">
        <Button onClick={decrementCounter} size={"icon"}>
          <Minus className="w-6 h-6" />
        </Button>

        <Button onClick={incrementCounter} size={"icon"}>
          <Plus className="w-6 h-6" />
        </Button>
      </div>
      <div className="flex gap-2 mt-8">
        <Input type="number" onChange={(e) => setCountInput(e.target.value)} />
        <Button onClick={inputCounter}>Submit</Button>
      </div>
    </main>
  );
};

export default CounterPage;
