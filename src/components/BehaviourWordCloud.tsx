import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type WordData = {
  text: string;
  value: number;
};

export default function BehaviourWordCloud({
  words
}: {
  words: WordData[];
}) {

  const scatterData =
    words.map((word, i) => ({

      x: (i * 17) % 100,
      y: (i * 31) % 100,

      text: word.text,

      value: word.value

    }));

  return (

<div className="h-80">

<ResponsiveContainer>

<ScatterChart>

<XAxis
type="number"
dataKey="x"
hide
/>

<YAxis
type="number"
dataKey="y"
hide
/>

<Tooltip
formatter={(
  value: number | string,
  name: string | undefined,
  props: { payload: { text: string; value: number } }
) => [

`${props.payload.text}: ${props.payload.value}`

]}
/>

<Scatter
data={scatterData}
fill="#9333ea"
/>

</ScatterChart>

</ResponsiveContainer>

</div>

  );

}