import styles from "./TabsBar.module.scss";
import clsx from "clsx";

export interface TabsBarItem {
  displayName: string;
  value: string;
}

export interface TabsBarProps {
  current: string;
  items: TabsBarItem[];
  onClick?: (value: TabsBarItem) => void;
  additionalClasses?: {
    container?: string;
    item?: string;
    highlighter?: string;
    active?: string;
  };
}

export const TabsBar = ({
  current,
  items,
  onClick,
  additionalClasses,
}: TabsBarProps) => {
  return (
    <>
      <div
        className={clsx(styles.tabsBarContainer, additionalClasses?.container)}
      >
        {items.map(({ displayName, value }) => (
          <div
            key={value}
            className={clsx(styles.tabsBarItem, additionalClasses?.item, {
              [styles.cursorPointer]: !!onClick,
            })}
            onClick={() => {
              onClick?.({ value, displayName });
            }}
          >
            <span>{displayName}</span>
            <div
              className={clsx(styles.highlighter, {
                [styles.active]: value === current,
              })}
            />
          </div>
        ))}
      </div>
    </>
  );
};
