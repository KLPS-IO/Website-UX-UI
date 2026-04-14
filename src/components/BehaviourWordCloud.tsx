import React from "react";

type WordData = {
  text: string;
  value: number;
};

export default function BehaviourWordCloud({
  words
}: {
  words: WordData[];
}) {

  if (!words.length) {

    return (

<div className="flex h-80 items-center justify-center text-sm text-gray-400">

No behaviour words yet

</div>

    );

  }

  const max =
    Math.max(
      ...words.map(w => w.value),
      1
    );

  return (

<div className="flex flex-wrap justify-center gap-3 p-4 min-h-[260px]">

{words.map((word, i) => {

  const size =
    12 +
    (word.value / max) * 36;

  const opacity =
    0.4 +
    (word.value / max) * 0.6;

  return (

<span
  key={i}
  style={{

    fontSize: `${size}px`,
    opacity,

    color: "#6b21a8",

    fontWeight:
      word.value > max * 0.6
        ? 700
        : 500

  }}

  className="transition-all"

  title={`${word.text}: ${word.value}`}

>

{word.text}

</span>

  );

})}

</div>

  );

}