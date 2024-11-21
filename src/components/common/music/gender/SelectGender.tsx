"use client";

import { useState, Suspense } from "react";
import Gender from "./Gender";
import FullGender from "./FullGender";

type SelectGenderProps = {
  onGenreSelect: (genre: string) => void;
};

const SelectGender = ({ onGenreSelect }: SelectGenderProps) => {
  const [isFullGenderVisible, setIsFullGenderVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const showFullGender = (genre: { gender: string }) => {
    setSelectedGenre(genre.gender);
    setIsFullGenderVisible(true);
    onGenreSelect(genre.gender);
  };

  const hideFullGender = () => {
    setIsFullGenderVisible(false);
  };

  const SkeletonGender = () => (
    <article className="grid w-full grid-cols-4 col-span-4 gap-4 px-4 py-5 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="col-span-2 bg-gray-300 aspect-video rounded-xl"
        />
      ))}
    </article>
  );

  return (
    <section className="col-span-4">
      <Suspense fallback={<SkeletonGender />}>
        <Gender showFullGender={showFullGender} />
      </Suspense>
      {isFullGenderVisible && (
        <FullGender
          hideFullGender={hideFullGender}
          selectedGenre={selectedGenre || ""}
        />
      )}
    </section>
  );
};

export default SelectGender;
