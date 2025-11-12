import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, SparkleIcon } from 'lucide-react';
import { Badge } from "../ui/badge";
import Link from "next/link";

function Hero() {
  return (
    <section className="my-12 sm:my-20 w-full">
      <div className="w-full sm:w-3/4 mx-auto">
      <div className="my-8 flex items-center justify-center">
        <Badge  className="font-normal px-4 py-2 border-2 border-muted-foreground/10 " variant={'secondary'}>Unlock Productivity <Brain className="ml-0.5" /></Badge>
      </div>
        <h1 className="capitalize text-center text-3xl sm:text-5xl md:text-6xl font-extrabold text-foreground">
          your second brain for everything you learn.
        </h1>
        <p className="text-sm sm:text-lg font-normal text-muted-foreground mt-4 sm:mt-8 text-center w-full capitalize">
          collect notes, screenshots, and docs — ThinkBin makes them searchable,
          connected, and alive.
        </p>
        <div className="my-8 sm:my-12 w-full flex gap-4 items-center justify-center">
          <Button asChild>
            <Link href={"/dashboard"}>
            Get Started <ArrowRight/>
            </Link>
          </Button>
          <Button variant={'outline'} asChild>
            <a href={"#demo"}>
           See it in action<SparkleIcon /> 
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
