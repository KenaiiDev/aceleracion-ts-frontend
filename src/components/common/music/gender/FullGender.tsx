"use client";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRef, useEffect } from "react";
import SongList from "../songs/Songs";

import type { Song } from "@/types/SongTypes";

type FullGenderProps = {
  hideFullGender: () => void;
  selectedGenre: string;
};

const FullGender = ({ hideFullGender, selectedGenre }: FullGenderProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hideFullGender();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [hideFullGender]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      hideFullGender();
    }
  };

  const filterFunction = (song: Song) => {
    return !selectedGenre || song.gender === selectedGenre;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full h-full max-w-4xl overflow-hidden bg-black rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex flex-col h-full">
          <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-violet-900">
            <div>
              <h2 className="text-xl font-bold">{selectedGenre}</h2>{" "}
              {/* Mostrar solo un género */}
            </div>
            <button
              onClick={hideFullGender}
              className="transition-colors text-neutralViolet-50 hover:text-neutralViolet-200"
              aria-label="Cerrar lista de reproducción"
            >
              <IoIosCloseCircleOutline className="text-4xl" />
            </button>
          </header>

          <div className="flex-grow pb-40 overflow-y-auto">
            <SongList filterFunction={filterFunction} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default FullGender;
