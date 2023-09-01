import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PropTypes {
  text: any;
  todoText: string;
  completed: boolean;
}

export function DialogDemo({ text, todoText, completed }: PropTypes) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" readOnly value={todoText} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="completed" className="text-right">
              Completed
            </Label>

            <Checkbox id="completed" checked={completed} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
