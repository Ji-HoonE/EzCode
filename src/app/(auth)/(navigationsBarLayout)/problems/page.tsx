"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProblemTable from "./Table";
import { useState } from "react";
import Image from "next/image";

const ProblemsList = () => {
  const categoryCodeItem = ["전체", "BFS", "DFS", "수학", "조건문"];
  const difficultyItem = ["전체", "LV1", "LV2", "LV3", "LV4", "LV5", "LV6", "LV7"];
  const [categoryCode, setCategoryCode] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <div className="flex flex-col px-10 py-18 w-full pt-[140px] gap-4">
      <section className="flex flex-col gap-10">
        <div className="flex flex-row justify-between items-center  ">
          <div className="flex gap-3">
            <Select
              onValueChange={(value) => {
                setCategoryCode(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="카테고리"></SelectValue>
              </SelectTrigger>
              <SelectContent style={{ zIndex: 999, position: "relative", backgroundColor: "#000" }}>
                <SelectGroup>
                  {categoryCodeItem.map((item) => {
                    return (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => {
                setDifficulty(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="난이도"></SelectValue>
              </SelectTrigger>
              <SelectContent style={{ zIndex: 999, position: "relative", backgroundColor: "#000" }}>
                <SelectGroup>
                  {difficultyItem.map((item) => {
                    return (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-1 bg-[#30333C] rounded-[25px] px-5 py-3">
            <input className="min-w-[400px] border-none outline-none" />
            <svg
              width="36"
              height="37"
              viewBox="0 0 36 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7751 0.734863C24.1269 0.734863 30.898 7.50521 30.8982 15.8569L30.8933 16.2476C30.809 19.5745 29.65 22.6344 27.7507 25.0933L35.4509 32.7935L31.9158 36.3286L24.0818 28.4946C21.6975 30.0649 18.8434 30.98 15.7751 30.98L15.3855 30.9751C7.21385 30.7682 0.653076 24.0784 0.653076 15.8569C0.653281 7.50534 7.42355 0.735068 15.7751 0.734863ZM15.7751 5.73486C10.185 5.73507 5.65328 10.2668 5.65308 15.8569C5.65308 21.4473 10.1848 25.9798 15.7751 25.98C21.3656 25.98 25.8982 21.4474 25.8982 15.8569C25.898 10.2666 21.3655 5.73486 15.7751 5.73486Z"
                fill="#00A141"
              />
            </svg>
          </div>
        </div>
        {(categoryCode !== "전체" || difficulty !== "전체") && (
          <div className="flex flex-row gap-8">
            {categoryCode !== "전체" && categoryCode && (
              <div className="flex flex-row gap-1 items-center">
                <span>{categoryCode}</span>
                <Image
                  src="/icons/close/closeWithBorder.svg"
                  className="cursor-pointer"
                  alt="close"
                  width={16}
                  height={16}
                  onClick={() => {
                    setCategoryCode("");
                  }}
                />
              </div>
            )}
            {difficulty !== "전체" && difficulty && (
              <div className="flex flex-row gap-1 items-center">
                <span>{difficulty}</span>
                <Image
                  src="/icons/close/closeWithBorder.svg"
                  className="cursor-pointer"
                  alt="close"
                  width={16}
                  height={16}
                  onClick={() => {
                    setDifficulty("");
                  }}
                />
              </div>
            )}
          </div>
        )}
      </section>
      <ProblemTable categoryCode={categoryCode} difficulty={difficulty} />
    </div>
  );
};

export default ProblemsList;
