import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

interface MobileNavProps {
  links: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
}

export default function MobileNav({ links, cta }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" />}>
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-card border-border">
        <nav className="flex flex-col gap-4 mt-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-foreground/70 hover:text-foreground transition-colors font-body tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href={cta.href}
            className={cn(
              buttonVariants(),
              "mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            )}
          >
            {cta.label}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
