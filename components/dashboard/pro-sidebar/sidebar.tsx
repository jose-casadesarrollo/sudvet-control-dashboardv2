"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
  ListboxSection,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection,
  Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";
import { useRouter } from "next/navigation";

export enum SidebarItemType {
  Nest = "nest",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: string;
  href?: string;
  type?: SidebarItemType.Nest;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
  // Allow passing ListboxItem classNames per item (e.g., to style title text)
  // Using a loose type to avoid tight coupling to @heroui/react internals
  classNames?: Record<string, string>;
  // Optional section-level controls when this item renders a ListboxSection
  // Useful to show a divider or hide the section heading for specific groups
  sectionClassNames?: ListboxSectionProps["classNames"];
  showDivider?: boolean;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children" | "onSelect"> & {
  items: SidebarItem[];
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  defaultSelectedKey: string;
  onNavSelect?: (key: string) => void;
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      isCompact,
      defaultSelectedKey,
  onNavSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref,
  ) => {
    const [selected, setSelected] = React.useState<React.Key>(defaultSelectedKey);
    React.useEffect(() => {
      setSelected(defaultSelectedKey);
    }, [defaultSelectedKey]);
    const router = useRouter();

    const findItemByKey = React.useCallback(
      (key: React.Key): SidebarItem | undefined => {
        const walk = (nodes: SidebarItem[]): SidebarItem | undefined => {
          for (const n of nodes) {
            if (n.key === key) return n;
            if (n.items && n.items.length) {
              const hit = walk(n.items);
              if (hit) return hit;
            }
          }
          return undefined;
        };
        return walk(items);
      },
      [items],
    );

    const sectionClasses = {
      ...sectionClassesProp,
      base: cn(sectionClassesProp?.base, "w-full", {
        "p-0 max-w-[44px]": isCompact,
      }),
      group: cn(
        sectionClassesProp?.group,
        "transition-[opacity,transform] duration-200 will-change-[opacity,transform]",
        {
          "flex flex-col gap-1": isCompact,
        },
      ),
      heading: cn(sectionClassesProp?.heading, {
        hidden: isCompact,
      }),
      divider: cn(
        sectionClassesProp?.divider as unknown as string,
        "transition-opacity duration-200 opacity-60 dark:opacity-50",
      ) as unknown as ListboxSectionProps["classNames"] extends infer T ? T extends object ? T[keyof T] : never : never,
    };

    const itemClasses = {
      ...itemClassesProp,
      base: cn(itemClassesProp?.base, {
        "w-11 h-11 gap-0 p-0": isCompact,
      }),
    };

    const renderNestItem = React.useCallback(
      (item: SidebarItem, idx?: number) => {
        const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

        if (isNestType) {
          // Is a nest type item , so we need to remove the href
          delete item.href;
        }

        // Merge item-level classNames with internal adjustments for nest items
        const { classNames: itemClassNames, ...restItem } = item as SidebarItem & { classNames?: Record<string, string> };
        const mergedClassNames = {
          ...itemClassNames,
          base: cn(
            itemClassNames?.base,
            {
              "h-auto p-0": !isCompact && isNestType,
            },
            {
              "inline-block w-11": isCompact && isNestType,
            },
          ),
        } as Record<string, string> | undefined;

        return (
          <ListboxItem
            {...restItem}
            key={item.key}
            style={{ transitionDelay: !isCompact ? `${(idx ?? 0) * 30}ms` : undefined }}
            classNames={mergedClassNames}
            endContent={isCompact || isNestType || hideEndContent ? null : item.endContent ?? null}
            startContent={(() => {
              const iconNode = item.icon ? (
                <Icon className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)} icon={item.icon} width={24} />
              ) : (
                item.startContent ?? null
              );
              return isCompact || isNestType ? (
                isNestType ? null : (
                  <Tooltip content={item.title} placement="right" delay={150}>
                    <div className="flex w-full items-center justify-center">{iconNode}</div>
                  </Tooltip>
                )
              ) : (
                iconNode
              );
            })()}
            title={isNestType ? null : item.title}
          >
            {!isCompact && isNestType ? (
              <Accordion className={"p-0"}>
                <AccordionItem
                  key={item.key}
                  aria-label={item.title}
                  classNames={{ heading: "pr-3", trigger: "p-0", content: "py-0 pl-4" }}
                  title={
                    item.icon ? (
                      <div className={"flex h-11 items-center gap-2 px-2 py-1.5"}>
                        <Icon className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)} icon={item.icon} width={24} />
                        <span className={cn(
                          "text-small text-default-500 group-data-[selected=true]:text-foreground font-medium transition-[opacity,transform,width] duration-200",
                          isCompact ? "opacity-0 -translate-x-1 w-0 overflow-hidden inline-block" : "opacity-100 translate-x-0 w-auto inline-block",
                          itemClassNames?.title,
                        )}>{item.title}</span>
                      </div>
                    ) : (
                      item.startContent ?? null
                    )
                  }
                >
                  {item.items && item.items?.length > 0 ? (
                    <Listbox className={"mt-0.5"} classNames={{ list: cn("border-l border-default-200 pl-4") }} items={item.items} variant="flat">
                      {item.items.map((child, cIdx) => renderItem(child, cIdx))}
                    </Listbox>
                  ) : (
                    renderItem(item)
                  )}
                </AccordionItem>
              </Accordion>
            ) : null}
          </ListboxItem>
        );
      },
      [isCompact, hideEndContent, iconClassName, items],
    );

    const renderItem = React.useCallback(
      (item: SidebarItem, idx?: number) => {
        const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

        if (isNestType) {
          return renderNestItem(item, idx);
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            style={{ transitionDelay: !isCompact ? `${(idx ?? 0) * 30}ms` : undefined }}
            endContent={isCompact || hideEndContent ? null : item.endContent ?? null}
            startContent={(() => {
              const iconNode = item.icon ? (
                <Icon className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)} icon={item.icon} width={24} />
              ) : (
                item.startContent ?? null
              );
              return isCompact ? (
                <Tooltip content={item.title} placement="right" delay={150}>
                  <div className="flex w-full items-center justify-center">{iconNode}</div>
                </Tooltip>
              ) : (
                iconNode
              );
            })()}
            textValue={item.title}
            title={item.title}
          >
          </ListboxItem>
        );
      },
      [isCompact, hideEndContent, iconClassName, itemClasses?.base],
    );

    return (
      <Listbox
        key={isCompact ? "compact" : "default"}
        ref={ref}
        hideSelectedIcon
        as="nav"
        className={cn("list-none", className)}
        classNames={{
          ...classNames,
          // Center items only when compact. In expanded mode, stretch to align with content
          list: cn(isCompact ? "items-center" : "items-stretch", classNames?.list),
        }}
        color="default"
        itemClasses={{
          ...itemClasses,
          base: cn(
            "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100 transition-colors duration-200 transform-gpu transition-transform hover:scale-[1.01]",
            itemClasses?.base,
          ),
          title: cn(
            "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground transition-[opacity,transform,width] duration-200 whitespace-nowrap inline-block",
            isCompact ? "opacity-0 -translate-x-1 w-0 overflow-hidden" : "opacity-100 translate-x-0 w-auto",
            itemClasses?.title,
          ),
        }}
        items={items}
        selectedKeys={[selected] as unknown as Selection}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];
          setSelected(key as React.Key);
          onNavSelect?.(key as string);
          const hit = findItemByKey(key as React.Key);
          const href = hit?.href;
          if (href && href !== "#") {
            try {
              router.push(href);
            } catch {}
          }
        }}
        {...props}
      >
        {(item) => {
          return item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items?.length > 0 ? (
            <ListboxSection
              key={item.key}
              classNames={{
                ...sectionClasses,
                ...(item.sectionClassNames ?? {}),
                // Merge heading classes so callers can hide it for specific sections
                heading: cn(sectionClasses.heading, item.sectionClassNames?.heading),
              }}
              showDivider={Boolean(isCompact || item.showDivider)}
              title={item.title}
            >
              {item.items.map(renderItem)}
            </ListboxSection>
          ) : (
            renderItem(item)
          );
        }}
      </Listbox>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
