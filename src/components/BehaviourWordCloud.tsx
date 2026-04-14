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

<div className="flex h-72 items-center justify-center text-sm text-gray-400">

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

<div className="flex flex-wrap justify-center gap-3 p-6 min-h-[260px]">

{words.map((word, i) => {

  const scale =
    word.value / max;

  const fontSize =
    14 + scale * 40;

  const opacity =
    0.4 + scale * 0.6;

  return (

<span
  key={i}

  title={`${word.text}: ${word.value}`}

  style={{

    fontSize: `${fontSize}px`,
    opacity,

    color: "#6b21a8",

    fontWeight:
      scale > 0.6
        ? 700
        : 500

  }}

  className="transition-all"

>

{word.text}

</span>

  );

})}

</div>

  );

}