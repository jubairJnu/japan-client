import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = () => {
  return (
    <Button className="w-full" disabled>
      <Loader2 className="animate-spin" />
      Please Wait
    </Button>
  );
};

export default LoadingButton;
