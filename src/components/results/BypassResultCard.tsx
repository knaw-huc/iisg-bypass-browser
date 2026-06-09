import {ResultCard, type ResultCardProps} from "@knaw-huc/panoptes-react";

export interface BypassResultCardProps extends Partial<ResultCardProps> {
    id: string;
    filepath?: string;
    title: string;
    link: string;
}

const truncateFilePath = (path: string | undefined, maxLength: number = 40): string => {
    if (!path) {
        return '';
    }
    if (path.length <= maxLength) {
        return path;
    }

    const separator = path.includes('/') ? '/' : '\\';
    const parts = path.split(separator).filter(Boolean);
    const filename = parts[parts.length - 1];
    const root = parts[0];

    // Always show complete first segment and complete filename
    return `${separator}${root}${separator}…${separator}${filename}`;
}

export default function BypassResultCard(props: BypassResultCardProps) {
    const { filepath, ...rest } = props as ResultCardProps & { filepath?: string };
    const resultCardProps: ResultCardProps = {
        ...rest,
        title: props.title || truncateFilePath(filepath)
    };

    return (
        <ResultCard {...resultCardProps} link={props.link} />
    );
}