export type ExpandableCardProps = {
    cardTitle?: string | React.ReactNode;
    cardDescription?: string | React.ReactNode;
    isExpandable?: boolean;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    className?: string;
    children?: React.ReactNode;
};
