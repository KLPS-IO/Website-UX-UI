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

  // Sort largest first
  const sorted =
    [...words].sort(
      (a, b) => b.value - a.value
    );

  const max =
    sorted[0]?.value || 1;

  const biggest =
    sorted[0];

  const others =
    sorted.slice(1);

  return (

<div className="flex flex-col items-center p-6 min-h-[260px]">

{/* BIGGEST WORD CENTER */}

<div
  className="mb-6 text-center"
  style={{

    fontSize: "52px",
    fontWeight: 700,
    color: "#5b21b6"

  }}

>

{biggest.text}

</div>

{/* OTHER WORDS */}

<div className="flex flex-wrap justify-center gap-3 max-w-4xl">

{others.map((word, i) => {

  const scale =
    word.value / max;

  const fontSize =
    14 + scale * 32;

  return (

<span
  key={i}

  title={`${word.text}: ${word.value}`}

  style={{

    fontSize: `${fontSize}px`,
    opacity:
      0.4 + scale * 0.6,

    color: "#7c3aed"

  }}

>

{word.text}

</span>

  );

})}

</div>

</div>

  );

}