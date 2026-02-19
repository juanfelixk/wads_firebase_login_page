import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1>Button</h1>
      <Button variant="outline" className="bg-red-400 border-2 border-gray-700 hover:bg-red-200 cursor-pointer">Button</Button>
    </div>
  );
}