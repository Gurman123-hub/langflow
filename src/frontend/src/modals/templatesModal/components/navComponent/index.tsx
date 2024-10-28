import ForwardedIconComponent from "@/components/genericIconComponent";
import { convertTestName } from "@/components/storeCardComponent/utils/convert-test-name";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { NavProps } from "../../../../types/templates/types";

export function Nav({ links, currentTab, onClick }: NavProps) {
  return (
    <div className="group flex flex-col gap-4">
      <nav className="grid">
        {links.map((link, index) => (
          <Button
            variant={link.id === currentTab ? "menu-active" : "menu"}
            size="sm"
            key={index}
            onClick={() => onClick?.(link.id)}
            className="group"
            tabIndex={1}
          >
            <ForwardedIconComponent
              name={link.icon}
              className={cn(
                "mr-2 h-4 w-4 stroke-2 text-muted-foreground",
                link.id === currentTab && "x-gradient",
              )}
            />
            <span
              data-testid={`side_nav_options_${convertTestName(link.title)}`}
              className={cn(
                "flex-1 text-left font-normal text-secondary-foreground",
                link.id === currentTab && "font-medium text-primary",
              )}
            >
              {link.title}
            </span>
          </Button>
        ))}
      </nav>
    </div>
  );
}
